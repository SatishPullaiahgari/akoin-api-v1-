import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/routes";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use("/akoin", router);

// ✅ Connect to DB and start server only if DB is connected
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ MONGO_URI not defined in .env file");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error);
  });
