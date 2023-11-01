const Category = require("../models/category");
const User = require("../models/user");
const { verifyToken } = require("../utils/jwtUtils");

const createCategory = async (req, res) => {
  const { name } = req.body;
  const token = req.headers.authorization;
  const userId = verifyToken(token);

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const category = await Category.create({ name, UserId: userId });
    await category.setUser(user);

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCategories = async (req, res) => {
  const token = req.headers.authorization;
  const userId = verifyToken(token);

  try {
    const categories = await Category.findAll({ where: { UserId: userId } });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if the user has permission to access the category (based on token)
    const token = req.headers.authorization;
    const userId = verifyToken(token);

    if (category.UserId !== userId) {
      return res.status(403).json({ message: "Permission denied" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if the user has permission to update the category (based on token)
    const token = req.headers.authorization;
    const userId = verifyToken(token);

    if (category.UserId !== userId) {
      return res.status(403).json({ message: "Permission denied" });
    }

    category.name = name;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if the user has permission to delete the category (based on token)
    const token = req.headers.authorization;
    const userId = verifyToken(token);

    if (category.UserId !== userId) {
      return res.status(403).json({ message: "Permission denied" });
    }

    await category.destroy();
    res.status(204).end(); // 204 No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
