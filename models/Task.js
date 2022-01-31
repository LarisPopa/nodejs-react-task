const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: { type: String, required: [true, "A task must have a name"] },
  description: {
    type: String,
    required: [true, "A task must have a description"],
  },
  dueDate: { type: Date, required: [true, "A task must have a due date"] },
  status: { type: String, required: [true, "A task must have a status"] },
  tags: [{ type: String }],
  userId: { type: String },
});

module.exports = Task = mongoose.model("Task", TaskSchema);
