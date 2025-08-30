import { Request, Response } from "express";
import uploadToCloudinary from "../utils/cloudinaryUpload";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const imageUrl = await uploadToCloudinary(
      req.file.buffer,
      "instant-portfolio-images"
    );

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Upload failed", error });
  }
};
