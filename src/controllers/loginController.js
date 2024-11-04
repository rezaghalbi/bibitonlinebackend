const customerModel = require('../models/customerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    customerModel.getCustomerByEmail(email, async (err, existingCustomer) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (!existingCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      const isMatch = await bcrypt.compare(password, existingCustomer.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ id: existingCustomer.id }, 'your_jwt_secret', {
        expiresIn: '1h',
      });
      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
