// Midtrans configuration for frontend

export const MIDTRANS_CONFIG = {
  // Use environment variables only - no hardcoded keys
  clientKey: process.env.REACT_APP_MIDTRANS_CLIENT_KEY,
  merchantId: process.env.REACT_APP_MIDTRANS_MERCHANT_ID,
  isProduction: process.env.REACT_APP_MIDTRANS_IS_PRODUCTION === 'true',
  
  // API endpoints
  apiEndpoint: process.env.NODE_ENV === 'production' 
    ? '/api/midtrans' 
    : 'http://localhost:5000/api/midtrans',
    
  callbackEndpoint: process.env.NODE_ENV === 'production'
    ? '/api/midtrans/callback'
    : 'http://localhost:5000/api/midtrans/callback'
};

// Helper function to initialize Midtrans Snap
export const initializeMidtransSnap = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = MIDTRANS_CONFIG.isProduction 
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js';
    
    script.setAttribute('data-client-key', MIDTRANS_CONFIG.clientKey);
    
    script.onload = () => {
      if (window.snap) {
        resolve(window.snap);
      } else {
        reject(new Error('Midtrans Snap failed to load'));
      }
    };
    
    script.onerror = () => reject(new Error('Failed to load Midtrans Snap script'));
    
    document.body.appendChild(script);
  });
};

export default MIDTRANS_CONFIG;
