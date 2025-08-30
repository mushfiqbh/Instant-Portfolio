import express from "express";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware";
import {
  getUserProfile,
  loginUser,
  registerUser,
  deleteAccount,
  updateUserProfile,
} from "../controllers/userController";

const userRouter = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

userRouter.get("/", authMiddleware, getUserProfile); // Get current user's info
userRouter.post("/login", loginUser); // Authenticate a user
userRouter.post("/register", registerUser); // Register a new user
userRouter.delete("/", authMiddleware, deleteAccount); // Delete current user's account
userRouter.put("/", authMiddleware, upload.single("profileImage"), updateUserProfile); // Update current user's info

export default userRouter;
