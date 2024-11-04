const purchaseModel = require('../models/purchaseModel');

exports.createPurchase = (req, res) => {
  const { customerId, totalAmount } = req.body;
  purchaseModel.createPurchase(customerId, totalAmount, (err, purchaseId) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.status(201).json({ message: 'Purchase created', purchaseId });
  });
};

exports.addItemToPurchase = (req, res) => {
  const { purchaseId, productId, quantity, price } = req.body;
  purchaseModel.addItemToPurchase(
    purchaseId,
    productId,
    quantity,
    price,
    (err, itemId) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.status(201).json({ message: 'Item added to purchase', itemId });
    }
  );
};

exports.getPurchase = (req, res) => {
  const { purchaseId } = req.params;
  purchaseModel.getPurchaseById(purchaseId, (err, purchase) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.status(200).json(purchase);
  });
};
