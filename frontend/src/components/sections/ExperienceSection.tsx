"use client"

import React from 'react';
import { Calendar } from 'lucide-react';
import { Experience } from '../../types/portfolio';

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

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences, theme }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (experiences.length === 0) return null;

  return (
    <section className="mb-8 sm:mb-12">
      <h2 className={`text-2xl sm:text-3xl font-bold ${theme.primary} mb-6 sm:mb-8 text-center`}>
        Work Experience
      </h2>
      
      <div className="space-y-6 sm:space-y-8">
        {experiences.map((experience, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
              <div className="mb-2 sm:mb-0">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                  {experience.title}
                </h3>
                <p className={`text-base sm:text-lg font-medium ${theme.secondary} mb-2`}>
                  {experience.company}
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      {formatDate(experience.startDate)} - {
                        experience.current ? 'Present' : formatDate(experience.endDate)
                      }
                    </span>
                  </div>
                  {experience.location && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-xs sm:text-sm">{experience.location}</span>
                    </>
                  )}
                </div>
              </div>
              
              {experience.current && (
                <span className={`${theme.accent} text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0`}>
                  Current
                </span>
              )}
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">
              {experience.description}
            </p>
            
            {experience.achievements.length > 0 && experience.achievements[0] && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements</h4>
                <ul className="space-y-1">
                  {experience.achievements
                    .filter(achievement => achievement.trim())
                    .map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start space-x-2">
                      <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${theme.accent} rounded-full mt-1.5 sm:mt-2 flex-shrink-0`}></span>
                      <span className="text-gray-700 text-xs sm:text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};