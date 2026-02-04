import React, { useState, useEffect } from 'react';
import { MIDTRANS_CONFIG, initializeMidtransSnap } from '../midtransConfig';

const PaymentComponent = ({ amount = 10000, customerData = {} }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snapToken, setSnapToken] = useState('');

  const defaultCustomer = {
    first_name: 'Customer',
    last_name: 'Name',
    email: 'customer@example.com',
    phone: '08123456789',
    ...customerData
  };

  const getSnapToken = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(MIDTRANS_CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          ...defaultCustomer
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get payment token');
      }

      setSnapToken(data.token);
      
      // Initialize and open Midtrans Snap
      const snap = await initializeMidtransSnap();
      snap.pay(data.token, {
        onSuccess: (result) => {
          console.log('Payment success:', result);
          alert('Pembayaran berhasil!');
        },
        onPending: (result) => {
          console.log('Payment pending:', result);
          alert('Pembayaran pending, menunggu pembayaran.');
        },
        onError: (result) => {
          console.log('Payment error:', result);
          setError('Pembayaran gagal: ' + result.status_message);
        },
        onClose: () => {
          console.log('Customer closed the popup without finishing the payment');
        }
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h3>Payment Gateway</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Amount:</strong> Rp {amount.toLocaleString('id-ID')}</p>
        <p><strong>Customer:</strong> {defaultCustomer.first_name} {defaultCustomer.last_name}</p>
        <p><strong>Email:</strong> {defaultCustomer.email}</p>
      </div>

      {error && (
        <div style={{ 
          marginBottom: '15px', 
          padding: '10px', 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          borderRadius: '5px' 
        }}>
          {error}
        </div>
      )}

      <button
        onClick={getSnapToken}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: loading ? '#ccc' : '#22c55e',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px'
        }}
      >
        {loading ? 'Processing...' : `Pay Rp ${amount.toLocaleString('id-ID')}`}
      </button>

      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p>Powered by Midtrans</p>
        <p>Environment: {MIDTRANS_CONFIG.isProduction ? 'Production' : 'Sandbox'}</p>
      </div>
    </div>
  );
};

export default PaymentComponent;
