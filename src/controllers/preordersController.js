const preorderModel = require('../models/preorderModel');

exports.getAllPreorders = (req, res) => {
  preorderModel.getAllPreorders((err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
};

exports.addPreorder = (req, res) => {
  const { customer_id, product_id } = req.body;
  preorderModel.addPreorder(customer_id, product_id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json(result);
  });
};

exports.updatePreorder = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  preorderModel.updatePreorder(id, status, (err, result) => {
    if (err) {
      if (err.message === 'Status tidak valid') {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Preorder tidak ditemukan' });
    }
    res.status(200).json({ message: 'Preorder updated successfully' });
  });
};

exports.deletePreorder = (req, res) => {
  const { id } = req.params;
  preorderModel.deletePreorder(id, (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Preorder deleted successfully' });
  });
};

exports.getPreorderById = (req, res) => {
  const { id } = req.params;
  preorderModel.getPreorderById(id, (err, result) => {
    if (err) {
      if (err.message === 'Preorder tidak ditemukan') {
        return res.status(404).json({ message: err.message });
      }
      return res.status(500).json(err);
    }
    res.status(200).json(result);
  });
};
