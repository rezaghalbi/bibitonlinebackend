const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Transaction = db.define(
  'Transaction',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'transactions',
  }
);

// Hubungan dengan detail transaksi
Transaction.associate = (models) => {
  Transaction.hasMany(models.TransactionDetail, {
    foreignKey: 'transaction_id',
    sourceKey: 'id',
  });
};

module.exports = Transaction;
