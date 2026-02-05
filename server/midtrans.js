const midtransClient = require('midtrans-client');
require('dotenv').config();

// Create Core API instance
const core = new midtransClient.CoreApi({
    isProduction: process.env.MIDTRANS_PRODUCTION === 'true',
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

// Create Snap instance
const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_PRODUCTION === 'true',
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

module.exports = {
    core,
    snap
};
