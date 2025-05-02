// import Task from "../models/Task.js";

// export const createTask = async (req, res) => {
//   const { title, description, status, projectId } = req.body;
//   const task = await Task.create({ title, description, status, project: projectId });
//   res.status(201).json(task);
// };

// export const getTasks = async (req, res) => {
//   const tasks = await Task.find().populate("project");
//   res.json(tasks);
// };

// export const updateTask = async (req, res) => {
//   const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(task);
// };

// export const deleteTask = async (req, res) => {
//   await Task.findByIdAndDelete(req.params.id);
//   res.json({ message: "Task deleted" });
// };

import Task from "../models/Task.js";
import Project from "../models/Project.js";  // Ensure you import the Project model

// Create a new task
export const createTask = async (req, res) => {
  const { title, description, status, projectId } = req.body;

  // Validate input fields
  if (!title || !projectId) {
    return res.status(400).json({ message: "Title and Project ID are required" });
  }

  try {
    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Create the new task
    const task = await Task.create({
      title,
      description,
      status: status || "pending",  // Default status if not provided
      project: projectId,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("project");  // Populate the project field
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get tasks", error: error.message });
  }
};

// Update task status or other fields
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update task", error: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
};
