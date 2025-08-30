import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
  addEducation,
  addExperience,
  addProject,
  addSkill,
} from "../controllers/portfolioController";

const portfolioRouter = Router();

// ===================== PROTECTED ROUTES =====================
// Portfolio CRUD
portfolioRouter.post("/", authMiddleware, createPortfolio); // Create portfolio
portfolioRouter.get("/", authMiddleware, getPortfolio); // Get portfolio
portfolioRouter.put("/", authMiddleware, updatePortfolio); // Update portfolio
portfolioRouter.delete("/", authMiddleware, deletePortfolio); // Delete portfolio

// Add items to arrays
portfolioRouter.post("/education", authMiddleware, addEducation);
portfolioRouter.post("/experience", authMiddleware, addExperience);
portfolioRouter.post("/project", authMiddleware, addProject);
portfolioRouter.post("/skill", authMiddleware, addSkill);

export default portfolioRouter;
