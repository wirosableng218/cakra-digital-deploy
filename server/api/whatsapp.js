const express = require('express');
const router = express.Router();
const whatsapp = require('../whatsapp-business');

// Webhook verification
router.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const result = whatsapp.verifyWebhook(mode, token, challenge);
    
    if (result) {
        res.status(200).send(result);
    } else {
        res.sendStatus(403);
    }
});

// Handle incoming messages
router.post('/webhook', async (req, res) => {
    try {
        const data = req.body;
        
        // Process incoming messages
        if (data.object === 'whatsapp_business_account') {
            for (const entry of data.entry) {
                for (const change of entry.changes) {
                    if (change.field === 'messages') {
                        const messages = change.value.messages;
                        
                        for (const message of messages) {
                            if (message.type === 'text') {
                                await handleIncomingMessage(message);
                            }
                        }
                    }
                }
            }
        }
        
        res.status(200).json({ status: 'received' });
    } catch (error) {
        console.error('WhatsApp webhook error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Handle incoming messages
async function handleIncomingMessage(message) {
    const from = message.from;
    const text = message.text.body.toLowerCase();
    
    // Auto-responses for common queries
    if (text.includes('status') || text.includes('cek')) {
        await whatsapp.sendTextMessage(from, '📋 Untuk cek status order, silakan masukkan Order ID Anda.');
    } else if (text.includes('bantuan') || text.includes('help')) {
        await whatsapp.sendTextMessage(from, '🤖 *Menu Bantuan*\n\n1. Ketik "STATUS [Order ID]" untuk cek status\n2. Ketik "BATAL [Order ID]" untuk batalkan order\n3. Ketik "INFO" untuk info produk\n\nHubungi admin untuk bantuan lebih lanjut.');
    } else if (text.includes('info')) {
        await whatsapp.sendTextMessage(from, 'ℹ️ *Info Produk*\n\nKami menyediakan berbagai layanan digital innovation. Kunjungi website kami untuk detail lengkap.');
    } else {
        await whatsapp.sendTextMessage(from, '👋 Terima kasih telah menghubungi kami. Ketik "BANTUAN" untuk menu lengkap.');
    }
}

// Send message endpoint
router.post('/send', async (req, res) => {
    try {
        const { to, message } = req.body;
        
        if (!to || !message) {
            return res.status(400).json({ error: 'Phone number and message are required' });
        }
        
        const result = await whatsapp.sendTextMessage(to, message);
        res.json(result);
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
