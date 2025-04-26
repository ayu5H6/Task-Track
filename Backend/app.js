const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoute");
const taskRoutes = require("./routes/taskRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;
