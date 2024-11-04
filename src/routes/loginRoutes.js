const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require('../models/adminModel');
const router = express.Router();
const db = require('../config/db');

router.post('/admin/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM admins WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const admin = results[0];

    if (admin.password !== password) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    res.status(200).json({ message: 'Login berhasil', admin });
  });
});

module.exports = router;
