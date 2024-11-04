const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customerModel');

// Mendapatkan semua customer
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error getting customers:', error); // Logging error
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
  }
};

// Mendapatkan customer berdasarkan ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer)
      return res.status(404).json({ message: 'Customer tidak ditemukan' });
    res.status(200).json(customer);
  } catch (error) {
    console.error('Error getting customer by ID:', error); // Logging error
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
  }
};

// Register customer baru
exports.registerCustomer = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Cek apakah email sudah terdaftar
    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer)
      return res.status(400).json({ message: 'Email sudah terdaftar' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Error registering customer:', error); // Logging error
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
  }
};

// Login customer
exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari customer berdasarkan email
    const customer = await Customer.findOne({ where: { email } });
    if (!customer)
      return res.status(404).json({ message: 'Customer tidak ditemukan' });

    // Cek password
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Password salah' });

    // Generate token
    const token = jwt.sign(
      { id: customer.id, email: customer.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Login berhasil', token, customer });
  } catch (error) {
    console.error('Error logging in customer:', error); // Logging error
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone, address } = req.body;

    // Hash password baru jika di-update
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    const updateData = {
      name,
      email,
      password: hashedPassword || undefined,
      phone,
      address,
    };

    // Update customer
    const [updatedRows] = await Customer.update(updateData, { where: { id } });
    if (updatedRows === 0)
      return res.status(404).json({ message: 'Customer tidak ditemukan' });

    res.status(200).json({ message: 'Customer berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating customer:', error); // Logging error
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
  }
};

// Hapus customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Customer.destroy({ where: { id } });
    if (deletedRows === 0)
      return res.status(404).json({ message: 'Customer tidak ditemukan' });

    res.status(200).json({ message: 'Customer berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting customer:', error); // Logging error
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
  }
};
