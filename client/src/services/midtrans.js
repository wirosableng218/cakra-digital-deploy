const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export const midtransService = {
  // Create transaction
  async createTransaction(orderData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/midtrans/create-transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Midtrans service error:', error);
      throw error;
    }
  },

  // Get transaction status
  async getTransactionStatus(orderId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/midtrans/status/${orderId}`);
      
      if (!response.ok) {
        throw new Error('Failed to get transaction status');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Midtrans status error:', error);
      throw error;
    }
  },

  // Cancel transaction
  async cancelTransaction(orderId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/midtrans/cancel/${orderId}`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to cancel transaction');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Midtrans cancel error:', error);
      throw error;
    }
  },

  // Process payment with Snap
  processPayment(snapToken) {
    return new Promise((resolve, reject) => {
      window.snap.pay(snapToken, {
        onSuccess: function(result) {
          resolve(result);
        },
        onPending: function(result) {
          resolve(result);
        },
        onError: function(result) {
          reject(result);
        },
        onClose: function() {
          reject(new Error('Payment popup closed'));
        }
      });
    });
  }
};
