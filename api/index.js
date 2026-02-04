const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cakra_digital'
};

let db;

async function initDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// Example API endpoint
app.get('/api/users', async (req, res) => {
  try {
    if (!db) await initDB();
    const [rows] = await db.execute('SELECT * FROM users LIMIT 10');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Example POST endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!db) await initDB();
    const [result] = await db.execute(
      'INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, NOW())',
      [name, email, message]
    );

    res.json({ 
      success: true, 
      id: result.insertId,
      message: 'Contact form submitted successfully' 
    });
  } catch (error) {
    console.error('Error submitting contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Initialize database and export handler
module.exports = async (req, res) => {
  if (!db) {
    await initDB();
  }
  app(req, res);
};
