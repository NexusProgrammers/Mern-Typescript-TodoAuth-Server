import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import validator from "validator";
import generateToken from "../utils/generateToken";

export const signUpUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400).json({
      success: false,
      message: "Email Not Available",
    });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({
      success: false,
      message: "Please Provide Valid Email",
    });
    return;
  }

  if (!name || !email || !password) {
    res.status(400).json({
      success: false,
      message: "Please Provide Required Fields",
    });
    return;
  }

  if (name.length < 2) {
    res.status(400).json({
      success: false,
      message: "Name must be 2 characters",
    });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({
      success: false,
      message: "Password must be 6 characters",
    });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: "Sign Up successfully",
    user,
    token,
  });
});

export const signInUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Please Provide Required Fields",
    });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({
      success: false,
      message: "User Not Found",
    });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({
      success: false,
      message: "Please Provide Valid Email",
    });
    return;
  }

  const passwordMatch = await user.matchPassword(password);

  if (!passwordMatch) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
    return;
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: "Sign In successfully",
    user,
    token,
  });
});
