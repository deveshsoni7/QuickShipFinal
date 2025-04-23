import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import RideRoute from "./routes/publishRideRoute.js";
import parcelRouter from "./routes/parcelRouter.js";
import 'dotenv/config.js';

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/user", userRouter);
app.use("/api/rides", RideRoute);
app.use("/api/parcel",parcelRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
