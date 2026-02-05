# Midtrans Integration Setup

## 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install midtrans-client

# Install all dependencies
cd ..
npm run install-all
```

## 2. Environment Configuration

Update `server/.env` with your Midtrans credentials:

```env
# Midtrans Configuration
MIDTRANS_SERVER_KEY=SB-Mid-server-YOUR_SERVER_KEY
MIDTRANS_CLIENT_KEY=SB-Mid-client-YOUR_CLIENT_KEY
MIDTRANS_PRODUCTION=false
```

## 3. API Endpoints

The following endpoints are available:

- `POST /api/midtrans/create-transaction` - Create new transaction
- `GET /api/midtrans/status/:orderId` - Get transaction status
- `POST /api/midtrans/cancel/:orderId` - Cancel transaction
- `POST /api/midtrans/notification` - Webhook callback

## 4. Client Usage Example

```javascript
import { midtransService } from './services/midtrans';

// Create transaction
const orderData = {
  orderId: 'ORDER-123',
  grossAmount: 100000,
  customerDetails: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    phone: '+628123456789'
  },
  itemDetails: [
    {
      id: 'ITEM1',
      price: 100000,
      quantity: 1,
      name: 'Product Name'
    }
  ]
};

try {
  const transaction = await midtransService.createTransaction(orderData);
  
  // Process payment with Snap
  const result = await midtransService.processPayment(transaction.token);
  console.log('Payment result:', result);
} catch (error) {
  console.error('Payment error:', error);
}
```

## 5. Webhook Setup

Set your webhook URL in Midtrans dashboard to:
```
https://your-domain.com/api/midtrans/notification
```

## 6. Production Deployment

For production, update `server/.env`:
```env
MIDTRANS_PRODUCTION=true
MIDTRANS_SERVER_KEY=Mid-server-YOUR_PRODUCTION_SERVER_KEY
MIDTRANS_CLIENT_KEY=Mid-client-YOUR_PRODUCTION_CLIENT_KEY
```

## 7. Testing

Use Midtrans Sandbox for testing:
- Server Key: `SB-Mid-server-`
- Client Key: `SB-Mid-client-`
- Test cards available in Midtrans documentation
