const db = require('../config/db');

const purchaseModel = {
  createPurchase: (customerId, totalAmount, callback) => {
    const query =
      'INSERT INTO purchases (customer_id, total_amount) VALUES (?, ?)';
    db.query(query, [customerId, totalAmount], (err, results) => {
      if (err) return callback(err);
      callback(null, results.insertId);
    });
  },
  addItemToPurchase: (purchaseId, productId, quantity, price, callback) => {
    const query =
      'INSERT INTO purchase_items (purchase_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
    db.query(
      query,
      [purchaseId, productId, quantity, price],
      (err, results) => {
        if (err) return callback(err);
        callback(null, results.insertId);
      }
    );
  },
  getPurchaseById: (purchaseId, callback) => {
    const query = 'SELECT * FROM purchases WHERE id = ?';
    db.query(query, [purchaseId], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },
};

module.exports = purchaseModel;
