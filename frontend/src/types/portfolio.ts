export interface PersonalInfo {
  name: string;
  email: string;
  title: string;
  slogan: string;
  bio: string;
  profileImage: string;
  socialLinks: {
    resume: string;
    github: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    whatsapp: string;
  };
  contactInfo: {
    phone: string;
    address: string;
  };
}

export interface Experience {
  _id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  liveurl: string;
  githuburl: string;
  imageUrl: string;
  techStack: string[];
  featured: boolean;
}

export interface Education {
  _id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
  honors: string[];
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  skills: Skill[];
  sectionOrder: string[];
  enabledSections: string[];
}

export type Theme = "professional" | "creative" | "elegant";
