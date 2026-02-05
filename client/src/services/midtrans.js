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
      // Load Midtrans Snap script if not already loaded
      if (!window.snap) {
        const script = document.createElement('script');
        script.src = process.env.NODE_ENV === 'production' 
          ? 'https://app.midtrans.com/snap/snap.js' 
          : 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', process.env.REACT_APP_MIDTRANS_CLIENT_KEY);
        
        script.onload = () => {
          if (window.snap) {
            window.snap.pay(snapToken, {
              onSuccess: (result) => {
                console.log('Payment success:', result);
                resolve(result);
              },
              onPending: (result) => {
                console.log('Payment pending:', result);
                resolve(result);
              },
              onError: (result) => {
                console.log('Payment error:', result);
                reject(new Error(result.status_message || 'Payment failed'));
              },
              onClose: () => {
                reject(new Error('Payment popup closed'));
              }
            });
          } else {
            reject(new Error('Midtrans Snap failed to load'));
          }
        };
        
        script.onerror = () => reject(new Error('Failed to load Midtrans Snap script'));
        document.body.appendChild(script);
      } else {
        window.snap.pay(snapToken, {
          onSuccess: (result) => {
            console.log('Payment success:', result);
            resolve(result);
          },
          onPending: (result) => {
            console.log('Payment pending:', result);
            resolve(result);
          },
          onError: (result) => {
            console.log('Payment error:', result);
            reject(new Error(result.status_message || 'Payment failed'));
          },
          onClose: () => {
            reject(new Error('Payment popup closed'));
          }
        });
      }
    });
  }
};
