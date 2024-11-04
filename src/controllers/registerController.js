const customerModel = require('../models/customerModel');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password || !phone || !address) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  customerModel.getCustomerByEmail(email, (err, existingCustomer) => {
    if (err) return res.status(500).json(err);
    if (existingCustomer) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json(err);

      customerModel.addCustomer(
        { name, email, password: hashedPassword, phone, address },
        (err, result) => {
          if (err) return res.status(500).json(err);
          res.status(201).json({
            message: 'Customer berhasil didaftarkan',
            id: result.insertId,
          });
        }
      );
    });
  });
};
