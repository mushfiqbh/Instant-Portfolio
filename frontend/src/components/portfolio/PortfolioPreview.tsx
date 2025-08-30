import React, { useEffect, useRef } from "react";
import { PortfolioData, Theme } from "../../types/portfolio";
import { AboutSection } from "../sections/AboutSection";
import { ExperienceSection } from "../sections/ExperienceSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { SkillsSection } from "../sections/SkillsSection";
import { EducationSection } from "../sections/EducationSection";

interface PortfolioPreviewProps {
  portfolioData: PortfolioData;
  theme: Theme;
  activeSection: string;
}

const themeClasses = {
  professional: {
    primary: "text-blue-600",
    secondary: "text-blue-500",
    accent: "bg-blue-600",
    gradient: "from-blue-600 to-blue-700",
  },
  creative: {
    primary: "text-purple-600",
    secondary: "text-purple-500",
    accent: "bg-purple-600",
    gradient: "from-purple-600 to-purple-700",
  },
  elegant: {
    primary: "text-green-600",
    secondary: "text-green-500",
    accent: "bg-green-600",
    gradient: "from-green-600 to-green-700",
  },
};

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({
  portfolioData,
  theme,
  activeSection,
}) => {
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const themeStyle = themeClasses[theme];

  useEffect(() => {
    // Scroll to active section
    if (activeSection && sectionRefs.current[activeSection]) {
      sectionRefs.current[activeSection]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeSection]);

  const renderSection = (sectionId: string) => {
    if (!portfolioData.enabledSections.includes(sectionId)) return null;

    const isActive = activeSection === sectionId;
    const sectionClass = isActive ? "ring-2 ring-blue-400 ring-offset-2" : "";

    switch (sectionId) {
      case "about":
        return (
          <div
            key={sectionId}
            ref={(el) => {
              sectionRefs.current[sectionId] = el;
            }}
            className={`transition-all duration-300 ${sectionClass}`}
          >
            <AboutSection
              personalInfo={portfolioData.personalInfo}
              theme={themeStyle}
            />
          </div>
        );
      case "experience":
        return (
          <div
            key={sectionId}
            ref={(el) => {
              sectionRefs.current[sectionId] = el;
            }}
            className={`transition-all duration-300 ${sectionClass}`}
          >
            <ExperienceSection
              experiences={portfolioData.experiences}
              theme={themeStyle}
            />
          </div>
        );
      case "projects":
        return (
          <div
            key={sectionId}
            ref={(el) => {
              sectionRefs.current[sectionId] = el;
            }}
            className={`transition-all duration-300 ${sectionClass}`}
          >
            <ProjectsSection
              projects={portfolioData.projects}
              theme={themeStyle}
            />
          </div>
        );
      case "skills":
        return (
          <div
            key={sectionId}
            ref={(el) => {
              sectionRefs.current[sectionId] = el;
            }}
            className={`transition-all duration-300 ${sectionClass}`}
          >
            <SkillsSection skills={portfolioData.skills} theme={themeStyle} />
          </div>
        );
      case "education":
        return (
          <div
            key={sectionId}
            ref={(el) => {
              sectionRefs.current[sectionId] = el;
            }}
            className={`transition-all duration-300 ${sectionClass}`}
          >
            <EducationSection
              education={portfolioData.education}
              theme={themeStyle}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 min-h-full">
      <div className="space-y-12">
        {portfolioData.sectionOrder.map((sectionId) =>
          renderSection(sectionId)
        )}
      </div>
    </div>
  );
};
