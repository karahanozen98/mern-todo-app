import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  name: {
    type: String,
    min: 1,
    max: 500,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Todo = mongoose.model("Todo", todoSchema, "todos");
export default Todo;
