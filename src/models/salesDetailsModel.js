const db = require('../config/db');

const salesDetailsModel = {
  createSaleDetail: (saleDetailData, callback) => {
    const query =
      'INSERT INTO sales_details (sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
    db.query(
      query,
      [
        saleDetailData.sale_id,
        saleDetailData.product_id,
        saleDetailData.quantity,
        saleDetailData.price,
      ],
      callback
    );
  },
  getSaleDetailsBySaleId: (saleId, callback) => {
    const query = 'SELECT * FROM sales_details WHERE sale_id = ?';
    db.query(query, [saleId], callback);
  },
};

module.exports = salesDetailsModel;
