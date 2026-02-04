// Midtrans API handler for Vercel Functions

const crypto = require('crypto');

// Midtrans configuration - use environment variables only
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
const MIDTRANS_MERCHANT_ID = process.env.MIDTRANS_MERCHANT_ID;
const IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === 'true';

// Midtrans API URLs
const API_URL = IS_PRODUCTION 
  ? 'https://app.midtrans.com/snap/v1/transactions'
  : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

// Create Snap Token
async function createSnapToken(req, res) {
  try {
    if (!MIDTRANS_SERVER_KEY) {
      return res.status(500).json({ error: 'Midtrans configuration missing' });
    }

    const { amount, first_name, last_name, email, phone } = req.body;

    const order_id = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const transaction_data = {
      transaction_details: {
        order_id: order_id,
        gross_amount: amount || 10000,
      },
      customer_details: {
        first_name: first_name || 'Customer',
        last_name: last_name || 'Name',
        email: email || 'customer@example.com',
        phone: phone || '08123456789',
      },
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64')}`,
      },
      body: JSON.stringify(transaction_data),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create snap token');
    }

    res.json({
      token: data.token,
      client_key: MIDTRANS_CLIENT_KEY,
      order_id: order_id,
    });

  } catch (error) {
    console.error('Midtrans error:', error);
    res.status(500).json({ error: error.message });
  }
}

// Handle Midtrans Callback
async function handleCallback(req, res) {
  try {
    if (!MIDTRANS_SERVER_KEY) {
      return res.status(500).json({ error: 'Midtrans configuration missing' });
    }

    const notification = req.body;
    
    // Verify signature
    const signature_key = crypto.createHash('sha512')
      .update(notification.order_id + notification.status_code + notification.gross_amount + MIDTRANS_SERVER_KEY)
      .digest('hex');

    if (signature_key !== notification.signature_key) {
      return res.status(403).json({ error: 'Invalid signature' });
    }

    // Process transaction status
    const { transaction_status, order_id } = notification;
    
    console.log(`Transaction ${order_id} status: ${transaction_status}`);

    // Here you can update database with payment status
    // Example: await updatePaymentStatus(order_id, transaction_status);

    res.json({ status: 'success', order_id, transaction_status });

  } catch (error) {
    console.error('Callback error:', error);
    res.status(500).json({ error: error.message });
  }
}

// Export handlers for Vercel
module.exports = async (req, res) => {
  const { method } = req;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (method === 'POST') {
    if (req.url.includes('/callback')) {
      return handleCallback(req, res);
    } else {
      return createSnapToken(req, res);
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
};
