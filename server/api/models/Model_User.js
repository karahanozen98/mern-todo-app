import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    min: 6,
    max: 20,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 6,
    max: 20,
    required: true,
  },
  todos: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("User", userSchema, "users");
export default User;
