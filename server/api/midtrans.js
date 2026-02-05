const express = require('express');
const router = express.Router();
const { snap, core } = require('../midtrans');
const whatsapp = require('../whatsapp-business');

// Create transaction
router.post('/create-transaction', async (req, res) => {
    try {
        const { orderId, grossAmount, customerDetails, itemDetails } = req.body;

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: grossAmount
            },
            customer_details: customerDetails,
            item_details: itemDetails,
            enabled_payments: ['credit_card', 'gopay', 'shopeepay', 'bank_transfer']
        };

        const transaction = await snap.createTransaction(parameter);
        
        // Send WhatsApp notification for order created (disabled for testing)
        // if (customerDetails?.phone) {
        //     await whatsapp.sendTextMessage(
        //         customerDetails.phone.replace(/[^0-9]/g, ''),
        //         `📋 *Order Created*\n\nOrder ID: ${orderId}\nTotal: Rp ${new Intl.NumberFormat('id-ID').format(grossAmount)}\n\nSilakan lakukan pembayaran untuk melanjutkan.`
        //     );
        // }

        res.json(transaction);
    } catch (error) {
        console.error('Midtrans error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get transaction status
router.get('/status/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const status = await core.transaction.status(orderId);
        res.json(status);
    } catch (error) {
        console.error('Midtrans status error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Cancel transaction
router.post('/cancel/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const cancel = await core.transaction.cancel(orderId);
        res.json(cancel);
    } catch (error) {
        console.error('Midtrans cancel error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Enhanced callback handler with WhatsApp integration
router.post('/notification', async (req, res) => {
    try {
        const notification = req.body;
        
        console.log('Midtrans notification:', notification);
        
        const { order_id, transaction_status, payment_type, gross_amount } = notification;
        
        // Handle successful payments
        if (['capture', 'settlement'].includes(transaction_status)) {
            try {
                // Get customer details from database or notification
                const customerPhone = notification.customer?.phone || '62XXXXXXXXXX';
                
                // Send payment confirmation via WhatsApp
                await whatsapp.sendPaymentConfirmation(customerPhone, {
                    orderId: order_id,
                    grossAmount: gross_amount,
                    paymentType: payment_type,
                    status: transaction_status
                });
                
                console.log(`WhatsApp notification sent for order ${order_id}`);
            } catch (whatsappError) {
                console.error('WhatsApp notification failed:', whatsappError);
                // Continue even if WhatsApp fails
            }
        }
        
        // Handle failed payments
        if (['deny', 'expire', 'cancel'].includes(transaction_status)) {
            try {
                const customerPhone = notification.customer?.phone || '62XXXXXXXXXX';
                
                await whatsapp.sendOrderStatus(customerPhone, order_id, 'cancelled');
                console.log(`WhatsApp cancellation notification sent for order ${order_id}`);
            } catch (whatsappError) {
                console.error('WhatsApp notification failed:', whatsappError);
            }
        }
        
        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.error('Callback error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
