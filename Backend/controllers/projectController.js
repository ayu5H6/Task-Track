const Project=require('../models/Project');
const User=require('../models/User');

exports.createProject = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.projects.length >= 4)
      return res.status(400).json({ message: "Project limit reached" });

    const project = await Project.create({
      name: req.body.name,
      user: user._id,
    });
    user.projects.push(project._id);
    await user.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
