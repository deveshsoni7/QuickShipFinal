import express from "express";
import { loginUser, registerUser, updateUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.put("/update/:id", updateUser);

export default userRouter;
