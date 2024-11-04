const db = require('../config/db');

const salesModel = {
  createSale: (customerId, productId, quantity, totalAmount, callback) => {
    const sql =
      'INSERT INTO sales (customer_id, product_id, quantity, total_amount) VALUES (?, ?, ?, ?)';
    db.query(sql, [customerId, productId, quantity, totalAmount], callback);
  },
  getSalesByCustomer: (customerId, callback) => {
    const sql = 'SELECT * FROM sales WHERE customer_id = ?';
    db.query(sql, [customerId], callback);
  },
  getAllSales: (callback) => {
    const sql = 'SELECT * FROM sales';
    db.query(sql, callback);
  },
};

module.exports = salesModel;
