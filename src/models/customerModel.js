const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Pastikan path ke config database benar

const Customer = db.define(
  'Customer',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'customers', // Pastikan sesuai dengan nama tabel di database
  }
);

module.exports = Customer;
