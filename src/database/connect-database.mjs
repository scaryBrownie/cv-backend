import mongoose from "mongoose";
import { dbLogger } from "../util/winston-logger.mjs";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "CV-website",
    });
    dbLogger.info("MongoDB connected 🚀");
  } catch (error) {
    dbLogger.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};
