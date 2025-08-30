import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

    // Personal Information
    personalInfo: {
      name: { type: String, default: "" },
      email: { type: String, default: "" },
      title: { type: String, default: "" },
      slogan: { type: String, default: "" },
      bio: { type: String, default: "" },
      profileImage: { type: String, default: "" },
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
    },

    // Education array
    education: [
      {
        school: { type: String, default: "" },
        degree: { type: String, default: "" },
        fieldOfStudy: { type: String, default: "" },
        startDate: { type: Date, default: null },
        endDate: { type: Date, default: null },
        grade: { type: String, default: "" },
        honors: { type: [String], default: [] },
      },
    ],

    // Experience array
    experience: [
      {
        title: { type: String, default: "" },
        company: { type: String, default: "" },
        location: { type: String, default: "" },
        startDate: { type: Date, default: null },
        endDate: { type: Date, default: null }, // null if currently working
        description: { type: String, default: "" },
        achievements: { type: [String], default: [] },
      },
    ],

    // Projects array
    projects: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        liveurl: { type: String, default: "" },
        githuburl: { type: String, default: "" },
        imageUrl: { type: String, default: "" },
        techStack: { type: [String], default: [] },
        featured: { type: Boolean, default: false },
      },
    ],

    // Skills array
    skills: [
      {
        name: { type: String, default: "" },
        category: {
          type: String,
          default: "Technical",
        },
        level: {
          type: Number,
          default: 50,
        },
      },
    ],

    // Section management
    sectionOrder: {
      type: [String],
      default: ["about", "experience", "projects", "skills", "education", "contact"]
    },
    enabledSections: {
      type: [String],
      default: ["about", "experience", "projects", "skills", "education", "contact"]
    },
  },
  { timestamps: true }
);

const Portfolio =
  mongoose.models.portfolio || mongoose.model("portfolio", portfolioSchema);
export default Portfolio;
