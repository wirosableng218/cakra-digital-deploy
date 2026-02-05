const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export const whatsappService = {
  // Send WhatsApp message
  async sendMessage(to, message) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/whatsapp/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, message }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send WhatsApp message');
      }
      
      return await response.json();
    } catch (error) {
      console.error('WhatsApp service error:', error);
      throw error;
    }
  },

  // Send order confirmation
  async sendOrderConfirmation(phoneNumber, orderData) {
    const message = `🎉 *Order Confirmed!*\n\n` +
      `Order ID: ${orderData.orderId}\n` +
      `Total: Rp ${new Intl.NumberFormat('id-ID').format(orderData.total)}\n` +
      `Payment: ${orderData.paymentMethod}\n\n` +
      `Thank you for your order! 🙏`;

    return await this.sendMessage(phoneNumber, message);
  },

  // Send payment reminder
  async sendPaymentReminder(phoneNumber, orderId, amount) {
    const message = `⏰ *Payment Reminder*\n\n` +
      `Order ID: ${orderId}\n` +
      `Amount: Rp ${new Intl.NumberFormat('id-ID').format(amount)}\n\n` +
      `Please complete your payment to continue processing.`;

    return await this.sendMessage(phoneNumber, message);
  },

  // Send shipping notification
  async sendShippingNotification(phoneNumber, orderData, trackingNumber) {
    const message = `📦 *Order Shipped!*\n\n` +
      `Order ID: ${orderData.orderId}\n` +
      `Tracking: ${trackingNumber}\n` +
      `Courier: ${orderData.courier}\n\n` +
      `Your order is on its way! 🚚`;

    return await this.sendMessage(phoneNumber, message);
  },

  // Format phone number (remove non-digits and add country code if needed)
  formatPhoneNumber(phone) {
    let formatted = phone.replace(/[^0-9]/g, '');
    
    // Add country code if not present
    if (!formatted.startsWith('62')) {
      if (formatted.startsWith('0')) {
        formatted = '62' + formatted.substring(1);
      } else {
        formatted = '62' + formatted;
      }
    }
    
    return formatted;
  }
};
