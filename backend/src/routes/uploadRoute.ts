import { Router } from "express";
import { uploadImage } from "../controllers/uploadController";
import authMiddleware from "../middlewares/authMiddleware";

import multer from "multer";

const uploadRouter = Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Auth required → Upload image
uploadRouter.post(
  "/image",
  authMiddleware,
  upload.single("image"),
  uploadImage
);

export default uploadRouter;
