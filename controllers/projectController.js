import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  const userProjects = await Project.find({ user: req.user._id });
  if (userProjects.length >= 10) return res.status(400).json({ message: "Max 10 projects allowed" });

  const { title } = req.body;
  const project = await Project.create({ title, user: req.user._id });
  res.status(201).json(project);
};

export const getProjects = async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
};
// Delete a project by ID
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findOneAndDelete({ _id: id, user: req.user._id });
  
  if (!project) {
    return res.status(404).json({ message: "Project not found or unauthorized" });
  }

  res.json({ message: "Project deleted successfully" });
};