import { Router } from "express";
import {  signUpUser, signInUser } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/signup", signUpUser);

userRouter.post("/signin", signInUser);

export default userRouter;
