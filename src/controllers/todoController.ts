import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Todo from "../models/todoModel";
import User from "../models/userModel";

export const addTodo = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?.id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(400).json({
      success: false,
      message: "User Not Found",
    });
    return;
  }

  const { title, description, isCompleted } = req.body as {
    title?: string;
    description?: string;
    isCompleted?: boolean;
  };

  if (!title || !description) {
    res.status(401).json({
      success: false,
      message: "Please Provide Required Fields",
    });
    return;
  }

  const todo = await Todo.create({
    title,
    description,
    isCompleted,
    userId: user?._id,
  });

  user.todos.push(todo._id);

  await user.save();

  res.status(201).json({
    success: true,
    message: "Todo Added Successfully",
    todo,
  });
});

export const getTodos = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?.id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(400).json({
      success: false,
      message: "User Not Found",
    });
    return;
  }
  const todos = await Todo.find({ userId: user?._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    todos,
  });
});

export const getTodo = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?.id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(400).json({
      success: false,
      message: "User Not Found",
    });
  }

  const { id } = req.params;

  const todo = await Todo.findOne({ _id: id, userId: user?._id });

  if (!todo) {
    res.status(400).json({
      success: false,
      message: "Todo Not Found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    todo,
  });
});

export const updateTodo = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?.id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(400).json({
      success: false,
      message: "User Not Found",
    });
  }

  const { id } = req.params;

  const { title, description, isCompleted } = req.body as {
    title?: string;
    description?: string;
    isCompleted?: boolean;
  };

  const todo = await Todo.findOne({ _id: id, userId: user?._id });

  if (!todo) {
    res.status(400).json({
      success: false,
      message: "Todo Not Found",
    });
    return;
  }

  if (title !== undefined) {
    todo.title = title;
  }

  if (description !== undefined) {
    todo.description = description;
  }

  if (isCompleted !== undefined) {
    todo.isCompleted = isCompleted;
  }

  const updatedTodo = await todo.save();

  res.status(200).json({
    success: true,
    todo: updatedTodo,
  });
});

export const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?.id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(400).json({
      success: false,
      message: "User Not Found",
    });
    return;
  }

  const { id } = req.params;

  const todo = await Todo.findOne({ _id: id, userId: user?._id });

  if (!todo) {
    res.status(401).json({
      success: false,
      message: "Todo Not Found",
    });
    return;
  }

  user.todos = user.todos.filter((todoId) => todoId.toString() !== id);

  await user.save();

  await todo.deleteOne({ _id: id });

  res.status(200).json({
    success: true,
    message: "Todo Deleted Successfully",
    todo,
  });
});
