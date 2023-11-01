// models/Task.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING,
  },
});

// Define association with User model
// Task.belongsTo(User);


module.exports = Task;
