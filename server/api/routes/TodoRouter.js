import { Router } from "express";
import Todo from "../models/Model_Todo.js";
import User from "../models/Model_User.js";

const router = Router();

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const todos = user.todos;

    const lastTwoDays = new Date();
    lastTwoDays.setDate(lastTwoDays.getDate() - 2);
    // get todos if it's not deleted or less than 2 days old
    const todoList = await Todo.find({
      _id: todos,
      $or: [{ isDeleted: false }, { createdAt: { $gt: lastTwoDays } }],
    });
    res.json(todoList);
  } catch (err) {
    res.status(400).json({ message: "Wrong parameters", error: err });
  }
});

// create a todo and add it's id to the related user
router.post("/add", async (req, res) => {
  try {
    const userId = req.body.userId;
    const newTodo = new Todo({ ...req.body });

    const savedTodo = await newTodo.save();
    const todoId = savedTodo._id;
    // the user who created this todo
    const user = await User.findById(userId);
    user.todos.push(todoId);
    user
      .save()
      .then(() => {
        res.json("OK");
      })
      .catch(() => {
        res
          .status(400)
          .json({ message: "Item could not be created", error: err });
      });
    User.findByIdAndUpdate(userId);
  } catch (err) {
    res.status(400).json({ message: "Wrong parameters", error: err });
  }
});

router.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  const todo = { ...req.body };
  Todo.findByIdAndUpdate(id, todo)
    .then(() => {
      res.json("OK");
    })
    .catch((err) => {
      res.status(400).json({ message: "Item could not be found", error: err });
    });
});

export default router;
