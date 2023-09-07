import mongoose from "mongoose";
import { config } from "dotenv";

config();

const MONGO_URL = process?.env?.MONGO_URI;

if (!MONGO_URL) {
  throw new Error("MongoDB URI is missing in the environment variables.");
}

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default dbConnect;
