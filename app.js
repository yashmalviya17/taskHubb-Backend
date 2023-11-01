// index.js
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    sequelize.authenticate().then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }).catch(()=>{
    console.error("Unable to connect to the database auth:", err);

    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Register routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/categories", categoryRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
