const express = require('express');
const cors = require('cors');
const db = require('./db');
const apiRoutes = require('./routes/api');
const midtransRoutes = require('./api/midtrans');
const whatsappRoutes = require('./api/whatsapp');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/api/midtrans', midtransRoutes);
app.use('/api/whatsapp', whatsappRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
