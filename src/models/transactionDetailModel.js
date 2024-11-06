const { DataTypes } = require('sequelize');
const db = require('../config/db');

const TransactionDetail = db.define(
  'TransactionDetail',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'transaction_details',
  }
);

// Hubungan dengan transaksi
TransactionDetail.associate = (models) => {
  TransactionDetail.belongsTo(models.Transaction, {
    foreignKey: 'transaction_id',
    targetKey: 'id',
  });
};

module.exports = TransactionDetail;
