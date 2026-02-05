const axios = require('axios');
require('dotenv').config();

class WhatsAppBusiness {
    constructor() {
        this.phoneId = process.env.WHATSAPP_BUSINESS_PHONE_ID;
        this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
        this.apiVersion = process.env.WHATSAPP_API_VERSION || 'v18.0';
        this.baseUrl = `https://graph.facebook.com/${this.apiVersion}`;
    }

    // Send text message
    async sendTextMessage(to, message) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/${this.phoneId}/messages`,
                {
                    messaging_product: 'whatsapp',
                    to: to,
                    type: 'text',
                    text: {
                        body: message
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('WhatsApp send error:', error.response?.data || error.message);
            throw error;
        }
    }

    // Send payment confirmation
    async sendPaymentConfirmation(to, orderData) {
        const message = `🎉 *Pembayaran Berhasil!*

📋 *Detail Order:*
• Order ID: ${orderData.orderId}
• Total: Rp ${this.formatCurrency(orderData.grossAmount)}
• Metode: ${orderData.paymentType}
• Status: ${orderData.status}

Terima kasih telah berbelanja! 🙏`;

        return await this.sendTextMessage(to, message);
    }

    // Send order status update
    async sendOrderStatus(to, orderId, status) {
        const statusEmojis = {
            'pending': '⏳',
            'processing': '🔄',
            'shipped': '📦',
            'delivered': '✅',
            'cancelled': '❌'
        };

        const emoji = statusEmojis[status] || '📋';
        const message = `${emoji} *Update Status Order*

Order ID: ${orderId}
Status: ${status.toUpperCase()}

${this.getStatusMessage(status)}`;

        return await this.sendTextMessage(to, message);
    }

    // Send template message
    async sendTemplateMessage(to, templateName, languageCode = 'id') {
        try {
            const response = await axios.post(
                `${this.baseUrl}/${this.phoneId}/messages`,
                {
                    messaging_product: 'whatsapp',
                    to: to,
                    type: 'template',
                    template: {
                        name: templateName,
                        language: {
                            code: languageCode
                        }
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('WhatsApp template error:', error.response?.data || error.message);
            throw error;
        }
    }

    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID').format(amount);
    }

    // Get status message
    getStatusMessage(status) {
        const messages = {
            'pending': 'Pesanan Anda sedang diproses.',
            'processing': 'Pesanan Anda sedang disiapkan.',
            'shipped': 'Pesanan Anda telah dikirim.',
            'delivered': 'Pesanan Anda telah diterima.',
            'cancelled': 'Pesanan Anda telah dibatalkan.'
        };
        return messages[status] || 'Status pesanan diperbarui.';
    }

    // Verify webhook
    verifyWebhook(mode, token, challenge) {
        if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
            return challenge;
        }
        return null;
    }
}

module.exports = new WhatsAppBusiness();
