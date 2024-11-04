const salesModel = require('../models/salesModel');

exports.createSale = (req, res) => {
  const { customerId, productId, quantity, totalAmount } = req.body;
  salesModel.createSale(
    customerId,
    productId,
    quantity,
    totalAmount,
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      res
        .status(201)
        .json({ message: 'Sale recorded', saleId: result.insertId });
    }
  );
};

exports.getSalesByCustomer = (req, res) => {
  const customerId = req.params.customerId;
  salesModel.getSalesByCustomer(customerId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json(results);
  });
};

exports.getAllSales = (req, res) => {
  salesModel.getAllSales((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json(results);
  });
};
