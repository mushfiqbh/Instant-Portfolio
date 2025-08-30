import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Authentication
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    // Profile Info
    title: {
      type: String,
      default: "Web Developer",
    },
    slogan: {
      type: String,
      default: "Your catchy slogan here",
    },
    bio: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
    socialLinks: {
      resume: { type: String, default: "" },
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      facebook: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
    },
    contactInfo: {
      phone: { type: String, default: "" },
      address: { type: String, default: "" },
    },

    // Optional settings
    template: {
      type: String,
      default: "default", // Template/theme selection
    },
    customDomain: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
