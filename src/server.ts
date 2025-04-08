import mongoose from "mongoose";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/routes";
// import { walletRoutes } from "./routes/wallet";


const app: Application = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/akoin", router);




//DB connection

mongoose
  .connect("mongodb://localhost:27017/akoin-api(updated)")
  .then(() => {
    console.log("connected successfully");
  })
  .catch((error) => {
    console.log("connection failed", error);
  });

app.listen(PORT, () => {
  console.log(` connect DB successfully http://localhost:${PORT}`);
});
