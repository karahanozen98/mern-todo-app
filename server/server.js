import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
  })
  .catch((err) => console.log(err));

import UserRouter from "./api/routes/UserRouter.js";
import TodoRouter from "./api/routes/TodoRouter.js";
app.use("/api/user", UserRouter);
app.use("/api/todo", TodoRouter);
