// Load environment variables
require('dotenv').config();

// Membuat modul database yang tidak memerlukan koneksi aktif
// untuk menjalankan aplikasi

// Membuat objek koneksi dummy yang akan digunakan jika database tidak tersedia
const dummyConnection = {
  query: (sql, params, callback) => {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }
    console.log('Database tidak aktif, operasi database tidak dapat dilakukan');
    if (callback) callback(null, []);
    return { on: () => {} };
  },
  connect: (callback) => {
    if (callback) callback(null);
  },
  end: (callback) => {
    if (callback) callback(null);
  },
  on: () => {}
};

// Coba untuk mengimpor mysql2 jika tersedia
let mysql;
let connection = null;

try {
  mysql = require('mysql2');
  
  // Mencoba membuat koneksi ke MySQL
  try {
    connection = mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root123',
      database: process.env.DB_NAME || 'cakra_digital_innovation'
    });
    
    // Menangani koneksi
    connection.connect((err) => {
      if (err) {
        console.log('Error connecting to MySQL database:', err.message);
        console.log('Aplikasi akan berjalan tanpa database');
        connection = dummyConnection;
      } else {
        console.log('Connected to MySQL Database');
      }
    });
  } catch (error) {
    console.log('Tidak dapat membuat koneksi database:', error.message);
    connection = dummyConnection;
  }
} catch (error) {
  console.log('Modul mysql tidak tersedia, aplikasi akan berjalan tanpa database');
  connection = dummyConnection;
}

// Export koneksi atau dummy jika gagal
module.exports = connection || dummyConnection;
