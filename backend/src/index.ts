import express from "express";
import type { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes Import
import userRouter from "./routes/userRoute";
import portfolioRouter from "./routes/portfolioRoute";
import { errorHandler } from "./middlewares/errorHandler";
import uploadRouter from "./routes/uploadRoute";

// Environment Variables
dotenv.config();
const PORT = process.env.PORT || 4000;

// App Setup
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// API Endpoints
app.get("/", (req, res) => {
  res.status(200).json({
    live: true,
    message: "Instant Portfolio Server is Running",
    version: "1.0.0",
  });
});
app.use("/api/users", userRouter);
app.use("/api/portfolios", portfolioRouter);
app.use("/api/uploads", uploadRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
