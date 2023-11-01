// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Task = require("./task");
const Category = require("./category");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
});

// Define associations
User.hasMany(Task);

User.hasMany(Category);

module.exports = User;
