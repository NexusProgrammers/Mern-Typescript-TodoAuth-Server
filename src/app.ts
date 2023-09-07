import express from "express";
import dbConnect from "./config/dbConnect";
import { config } from "dotenv";
import notFound from "./middleware/notFound";
import userRouter from "./routes/userRoute";
import todoRouter from "./routes/todoRoute";
import cors from "cors";
import morgan from "morgan";

config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(morgan("dev"));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API RUNNING");
});

dbConnect();

app.use("/api/v1/users", userRouter);

app.use("/api/v1/todos", todoRouter);

app.use(notFound);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
