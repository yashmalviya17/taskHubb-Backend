// models/Category.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// // Define association with User model
// Category.belongsTo(User);

module.exports = Category;
