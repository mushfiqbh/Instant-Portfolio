import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolioController";

const portfolioRouter = Router();

// ===================== PROTECTED ROUTES =====================
// Portfolio CRUD
portfolioRouter.post("/", authMiddleware, createPortfolio);
portfolioRouter.get("/", authMiddleware, getPortfolio);
portfolioRouter.put("/", authMiddleware, updatePortfolio);
portfolioRouter.delete("/", authMiddleware, deletePortfolio);

export default portfolioRouter;
