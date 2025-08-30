import Portfolio from "../models/portfolioModel";
import { Request, Response } from "express";

// Extend Express Request type to include userId and file
interface AuthenticatedRequest extends Request {
  userId: string;
  file?: Express.Multer.File;
}

// ===================== CREATE PORTFOLIO =====================
export const createPortfolio = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.userId;
    const existingPortfolio = await Portfolio.findOne({ user: userId });

    if (existingPortfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio already exists" });
    }

    const newPortfolio = new Portfolio({ user: userId, ...req.body });
    await newPortfolio.save();

    res.status(201).json({ success: true, portfolio: newPortfolio });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating portfolio", error });
  }
};

// ===================== GET USER PORTFOLIO =====================
export const getPortfolio = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.userId;
    const portfolio = await Portfolio.findOne({ user: userId });

    if (!portfolio) {
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found" });
    }

    res.status(200).json({ success: true, portfolio });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching portfolio", error });
  }
};

// ===================== UPDATE PORTFOLIO =====================
export const updatePortfolio = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.userId;
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { user: userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedPortfolio) {
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found" });
    }

    res.status(200).json({ success: true, portfolio: updatedPortfolio });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating portfolio", error });
  }
};

// ===================== DELETE PORTFOLIO =====================
export const deletePortfolio = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.userId;
    const deletedPortfolio = await Portfolio.findOneAndDelete({ user: userId });

    if (!deletedPortfolio) {
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found" });
    }

    res.status(200).json({ success: true, message: "Portfolio deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting portfolio", error });
  }
};
