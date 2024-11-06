const Transaction = require('../models/transactionModel');
const TransactionDetail = require('../models/transactionDetailModel');

exports.createTransaction = async (req, res) => {
  const { customer_id, total_amount, status, payment_method, items } = req.body;

  try {
    // Buat transaksi
    const transaction = await Transaction.create({
      customer_id,
      total_amount,
      status,
      payment_method,
    });

    // Tambahkan detail transaksi untuk setiap item
    const transactionDetails = items.map((item) => ({
      transaction_id: transaction.id, // ID transaksi yang baru dibuat
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price, // harga per item
    }));

    // Simpan detail transaksi
    await TransactionDetail.bulkCreate(transactionDetails);

    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Terjadi kesalahan pada server',
      error: error,
    });
  }
};

// Mendapatkan semua transaksi
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [TransactionDetail], // Termasuk detail transaksi
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error getting transactions:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
  }
};

// Mendapatkan transaksi berdasarkan ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      include: [TransactionDetail],
    });
    if (!transaction)
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    res.status(200).json(transaction);
  } catch (error) {
    console.error('Error getting transaction by ID:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
  }
};

// Mengupdate transaksi
exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { total_amount, status, payment_method } = req.body;

  try {
    const [updatedRows] = await Transaction.update(
      { total_amount, status, payment_method },
      { where: { id } }
    );
    if (updatedRows === 0)
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });

    res.status(200).json({ message: 'Transaksi berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
  }
};

// Menghapus transaksi
exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Transaction.destroy({ where: { id } });
    if (deletedRows === 0)
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });

    res.status(200).json({ message: 'Transaksi berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
  }
};
