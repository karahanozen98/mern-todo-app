import { Router } from "express";
import User from "../models/Model_User.js";
import Todo from "../models/Model_Todo.js";

const router = Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json({ message: "User not found", error: err });
    });
});

router.post("/create", (req, res) => {
  const newUser = new User({ ...req.body });
  newUser
    .save()
    .then(() => {
      res.json("OK");
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "User could not be created", error: err });
    });
});

export default router;
