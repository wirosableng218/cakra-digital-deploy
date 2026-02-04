const express = require('express');
const router = express.Router();

// Contoh route dasar
router.get('/test', (req, res) => {
  res.json({ message: 'API berfungsi dengan baik!' });
});

// Tambahkan route lain sesuai kebutuhan di sini
router.get('/data', (req, res) => {
  res.json([
    { id: 1, name: 'Pembuatan Website' },
    { id: 2, name: 'Instalasi Software' },
    { id: 3, name: 'Konsultasi Digital' },
  ]);
});

module.exports = router;