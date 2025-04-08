import dotenv from "dotenv";
dotenv.config(); 

import mongoose from "mongoose";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/routes";

const app: Application = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/akoin", router);

// DB connection using .env
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((error) => {
    console.log("connection failed", error);
  });

app.listen(PORT, () => {
  console.log(` connect DB successfully http://localhost:${PORT}`);
});
