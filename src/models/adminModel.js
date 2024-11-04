// src/models/adminModels.js
const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Admin = sequelize.define(
  'Admin',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'admins',
    timestamps: false,
  }
);

const getAdminByEmail = async (email) => {
  try {
    return await Admin.findOne({ where: { email } });
  } catch (error) {
    throw error;
  }
};

const createAdmin = async (email, hashedPassword) => {
  try {
    return await Admin.create({ email, password: hashedPassword });
  } catch (error) {
    throw error;
  }
};

module.exports = { getAdminByEmail, createAdmin };
