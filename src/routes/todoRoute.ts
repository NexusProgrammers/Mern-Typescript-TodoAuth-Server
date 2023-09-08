import { Router } from "express";
import {
  addTodo,
  deleteTodo,
  getTodo,
  getTodos,
  toggleTodoComplete,
  updateTodo,
} from "../controllers/todoController";
import protect from "../middleware/authProtect";

const todoRouter = Router();

todoRouter.use(protect);

todoRouter.get("/get-all", getTodos);

todoRouter.post("/add", addTodo);

todoRouter.get("/get/:id", getTodo);

todoRouter.put("/update/:id", updateTodo);

todoRouter.delete("/delete/:id", deleteTodo);

todoRouter.get("/complete/:id", toggleTodoComplete);

export default todoRouter;
