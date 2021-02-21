import { Router } from "express";
import Todo from "../models/Model_Todo.js";
import User from "../models/Model_User.js";

const router = Router();

router.post("/add", async (req, res) => {
  const userId = req.body.userId;
  const newTodo = new Todo({ ...req.body })
 
  try{
    const savedTodo = await newTodo.save();
    const todoId = savedTodo._id;
    res.send(todoId);
  }catch(err){
    res.status(400).json({message:"Item can not be created", error:err})
  }
 

//   User.findById(userId).then((user) => {
   
   
//   });
});
export default router;
