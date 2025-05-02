import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: "todo"
  },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
}, {
  timestamps: true,
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
