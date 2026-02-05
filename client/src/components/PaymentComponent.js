import React, { useState } from 'react';
import { midtransService } from '../services/midtrans';

const PaymentComponent = ({ amount = 10000, customerData = {} }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const defaultCustomer = {
    first_name: 'Customer',
    last_name: 'Name',
    email: 'customer@example.com',
    phone: '08123456789',
    ...customerData
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      const orderData = {
        orderId: `ORDER-${Date.now()}`,
        grossAmount: amount,
        customerDetails: defaultCustomer,
        itemDetails: [
          {
            id: 'ITEM1',
            price: amount,
            quantity: 1,
            name: 'Product Payment'
          }
        ]
      };

      const transaction = await midtransService.createTransaction(orderData);
      
      // Process payment with Snap
      const result = await midtransService.processPayment(transaction.token);
      
      console.log('Payment success:', result);
      alert('Pembayaran berhasil!');
      
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Terjadi kesalahan saat pembayaran');
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

      <div style={{ 
        marginBottom: '15px', 
        padding: '15px', 
        backgroundColor: '#e3f2fd', 
        color: '#1565c0', 
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <p><strong>📢 Informasi Pembayaran</strong></p>
        <p>Sistem pembayaran kami sedang dalam proses aktivasi. Untuk sementara, silakan hubungi admin untuk proses pembayaran manual.</p>
        <p><strong>WhatsApp:</strong> +62 85852345718</p>
        <p><strong>Email:</strong> cdiyunoru@gmail.com</p>
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
        onClick={handlePayment}
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
        <p>Environment: Production</p>
      </div>
    </div>
  );
};

export default PaymentComponent;
