const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const getAllPreorders = (callback) => {
  const sql = 'SELECT * FROM preorders';
  db.query(sql, (err, results) => {
    callback(err, results);
  });
};

const addPreorder = (customer_id, product_id, callback) => {
  const status = 'Dalam Masa Pemijahan';
  const sql =
    'INSERT INTO preorders (customer_id, product_id, status) VALUES (?, ?, ?)';
  db.query(sql, [customer_id, product_id, status], (err, result) => {
    callback(err, { id: result.insertId, customer_id, product_id, status });
  });
};

const updatePreorder = (id, status, callback) => {
  const validStatuses = [
    'Dalam Masa Pemijahan',
    'Siap Untuk Ditanam',
    'Preorder Sukses',
  ];

  if (!validStatuses.includes(status)) {
    return callback(new Error('Status tidak valid'));
  }

  const sql = 'UPDATE preorders SET status = ? WHERE id = ?';
  db.query(sql, [status, id], (err, result) => {
    callback(err, result);
  });
};

const deletePreorder = (id, callback) => {
  const sql = 'DELETE FROM preorders WHERE id = ?';
  db.query(sql, [id], (err) => {
    callback(err);
  });
};

const getPreorderById = (id, callback) => {
  const sql = 'SELECT * FROM preorders WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback(new Error('Preorder tidak ditemukan'));
    }
    callback(null, results[0]);
  });
};

module.exports = {
  getAllPreorders,
  addPreorder,
  updatePreorder,
  deletePreorder,
  getPreorderById,
};
