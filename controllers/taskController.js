const Task = require("../models/task");
const User = require("../models/user")
const { verifyToken } = require("../utils/jwtUtils");

const createTask = async (req, res) => {
  const { name, category, description, status } = req.body;
  const token = req.headers.authorization;
  const userId = verifyToken(token);
  console.log(userId)
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const task = await Task.create({ name, category, description, status,UserId:userId });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTasks = async (req, res) => {
  const token = req.headers.authorization;
  const userId = verifyToken(token);

  try {
    const tasks = await Task.findAll({ where: { UserId: userId } });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, category, description, status } = req.body;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the user has permission to update the task (based on token)
    const token = req.headers.authorization;
    const userId = verifyToken(token);

    if (task.UserId !== userId) {
      return res.status(403).json({ message: "Permission denied" });
    }

    task.name = name;
    task.category = category;
    task.description = description;
    task.status = status;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the user has permission to delete the task (based on token)
    const token = req.headers.authorization;
    const userId = verifyToken(token);

    if (task.UserId !== userId) {
      return res.status(403).json({ message: "Permission denied" });
    }

    await task.destroy();
    res.status(204).end(); // 204 No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the user has permission to access the task (based on token)
    const token = req.headers.authorization;
    const userId = getUserIdFromToken(token);

    if (task.UserId !== userId) {
      return res.status(403).json({ message: "Permission denied" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask, getTaskById };
