import Portfolio from "../models/portfolioModel";
import { Request, Response } from "express";

// ===================== CREATE PORTFOLIO =====================
export const createPortfolio = async (req: Request, res: Response) => {
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
export const getPortfolio = async (req: Request, res: Response) => {
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
export const updatePortfolio = async (req: Request, res: Response) => {
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
export const deletePortfolio = async (req: Request, res: Response) => {
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

// ===================== ADD EDUCATION =====================
export const addEducation = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const portfolio = await Portfolio.findOne({ user: userId });
    if (!portfolio)
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found" });

    portfolio.education.push(req.body);
    await portfolio.save();

    res.status(200).json({ success: true, education: portfolio.education });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding education", error });
  }
};

// ===================== ADD EXPERIENCE =====================
export const addExperience = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const portfolio = await Portfolio.findOne({ user: userId });
    if (!portfolio)
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found" });

    portfolio.experience.push(req.body);
    await portfolio.save();

    res.status(200).json({ success: true, experience: portfolio.experience });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding experience", error });
  }
};

// ===================== ADD PROJECT =====================
export const addProject = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const portfolio = await Portfolio.findOne({ user: userId });
    if (!portfolio)
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found" });

    portfolio.projects.push(req.body);
    await portfolio.save();

    res.status(200).json({ success: true, projects: portfolio.projects });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding project", error });
  }
};

// ===================== ADD SKILL =====================
export const addSkill = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const portfolio = await Portfolio.findOne({ user: userId });
    if (!portfolio)
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found" });

    portfolio.skills.push(req.body);
    await portfolio.save();

    res.status(200).json({ success: true, skills: portfolio.skills });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding skill", error });
  }
};
