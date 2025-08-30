import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

    // Education array
    education: [
      {
        school: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String, default: "" },
        startDate: { type: Date, required: true },
        endDate: { type: Date, default: null },
        grade: { type: String, default: "" },
        honors: { type: [String], default: [] },
      },
    ],

    // Experience array
    experience: [
      {
        title: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, default: "" },
        startDate: { type: Date, required: true },
        endDate: { type: Date, default: null }, // null if currently working
        description: { type: String, default: "" },
        achievements: { type: [String], default: [] },
      },
    ],

    // Projects array
    projects: [
      {
        title: { type: String, required: true },
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
        name: { type: String, required: true },
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
  },
  { timestamps: true }
);

const Portfolio =
  mongoose.models.portfolio || mongoose.model("portfolio", portfolioSchema);
export default Portfolio;
