import { Router } from "express";
import User from "../models/Model_User.js";
import Todo from "../models/Model_Todo.js";

const router = Router();

router.get("/:username/:password", (req, res) => {
  const { username, password } = req.params;
  User.findOne({ $and: [{ username: username }, { password: password }] })
    .select("_id username todos")
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "User not found", error: err });
    });
});

router.post("/add", (req, res) => {
  const newUser = new User({ ...req.body });
  newUser.validate().then(() => {
    newUser
      .save()
      .then(() => {
        res.json("OK");
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "User could not be created", error: err });
      })
      .catch(() => {
        res.status(400).json({ message: "Validation error", error: err });
      });
  });
});

export default router;
