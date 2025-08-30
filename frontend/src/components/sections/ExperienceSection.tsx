"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { Experience } from "../../types/portfolio";

interface ThemeStyle {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
  theme: ThemeStyle;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  theme,
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (experiences.length === 0) return null;

  return (
    <section className="mb-12 sm:mb-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold ${theme.primary} mb-4`}>
          Work Experience
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {experiences.map((experience, index) => (
          <div key={index} className="group relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500 opacity-30 group-last:hidden"></div>

            {/* Experience card */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl p-6 sm:p-8 border border-white/50 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1 mb-4 lg:mb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                        {experience.title}
                      </h3>
                      <p
                        className={`text-lg sm:text-xl font-semibold ${theme.secondary} mb-3`}
                      >
                        {experience.company}
                      </p>
                    </div>
                    {experience.current && (
                      <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-full shadow-md">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      <span className="text-sm font-medium">
                        {formatDate(experience.startDate)} -{" "}
                        {experience.current
                          ? "Present"
                          : formatDate(experience.endDate)}
                      </span>
                    </div>
                    {experience.location && (
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                        <span className="text-sm font-medium">
                          {experience.location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                  {experience.description}
                </p>
              </div>

              {experience.achievements.length > 0 &&
                experience.achievements[0] && (
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                      Key Achievements
                    </h4>
                    <ul className="space-y-3">
                      {experience.achievements
                        .filter((achievement) => achievement.trim())
                        .map((achievement, achievementIndex) => (
                          <li
                            key={achievementIndex}
                            className="flex items-start space-x-3"
                          >
                            <span className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                              {achievement}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
