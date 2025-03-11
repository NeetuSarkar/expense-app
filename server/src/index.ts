import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Use the MongoDB URI from environment variables
const mongoURI: string = process.env.MONGODB_URI || "";

if (!mongoURI) {
  console.error("MongoDB URI is missing in .env file");
  process.exit(1); // Exit the process if MongoDB URI is missing
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use(express.json());
app.use(cors());
app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
