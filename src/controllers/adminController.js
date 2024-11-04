const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getAdminByEmail, createAdmin } = require('../models/adminModel');

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await getAdminByEmail(email);

    if (!admin) {
      return res.status(401).json({ message: 'Email atau password salah!' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email atau password salah!' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      'your_jwt_secre',
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: 'Login sukses!', token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Terjadi kesalahan saat proses login.' });
  }
};

const adminRegister = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await createAdmin(email, hashedPassword);

    return res.status(201).json({ message: 'Admin berhasil terdaftar!' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Terjadi kesalahan saat proses registrasi.' });
  }
};

module.exports = { adminLogin, adminRegister };
