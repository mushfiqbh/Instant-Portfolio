import User from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { Request, Response } from "express";

// Extend Express Request type to include userId
interface AuthenticatedRequest extends Request {
  userId: string;
  file?: Express.Multer.File;
}

interface RequestBody {
  email: string;
  password: string;
  name?: string;
  title?: string;
  slogan?: string;
  bio?: string;
  profileImage?: string;
  socialLinks?: {
    resume?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    whatsapp?: string;
  };
  contactInfo?: {
    phone?: string;
    address?: string;
  };
}

// Generate JWT token
const createToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "default_secret");

// ======================== LOGIN ========================
export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: RequestBody = req.body as RequestBody;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

// ======================== REGISTER ========================
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password }: RequestBody = req.body as RequestBody;

  try {
    if (await User.findOne({ email })) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10)
    );

    const newUser = new User({ name, email, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({ success: true, token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

// ======================== GET USER INFO ========================
export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.userId;

  try {
    const userInfo = await User.findById(userId, { password: 0 });
    if (!userInfo) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, userInfo });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

// ======================== UPDATE USER INFO ========================
export const updateUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.userId;
  const updateData: Partial<RequestBody> = req.body as Partial<RequestBody>;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: "User info updated" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating user info", error });
  }
};

// ======================== DELETE ACCOUNT ========================
export const deleteAccount = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ success: true, message: "Account deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting account", error });
  }
};
