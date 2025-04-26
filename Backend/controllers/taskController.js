const Task = require("../models/Task");
const Project = require("../models/Project");

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const task = await Task.create({
      title,
      description,
      project: project._id,
    });
    project.tasks.push(task._id);
    await project.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.status === "completed") {
      updates.completedAt = new Date();
    }
    const task = await Task.findByIdAndUpdate(req.params.taskId, updates, {
      new: true,
    });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: "Task deleted", task });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
