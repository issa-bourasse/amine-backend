import express from "express";
import mongoose from "mongoose";
import studentsRouter from "./routers/students";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());


if (!process.env.MONGO_URI) {
  throw new Error("Missing MONGO_URI in environment variables");
}
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Connected!"));

// Configure CORS - allow requests from Netlify frontend
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use("/api/students", studentsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
