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

// ✅ Connect to DB and start server only if DB is connected
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(" MongoDB connection failed:", error);
  });
