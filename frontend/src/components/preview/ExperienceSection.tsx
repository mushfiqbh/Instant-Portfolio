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
    <section className="mb-12">
      <h2 className={`text-3xl font-bold ${theme.primary} mb-8 text-center`}>
        Work Experience
      </h2>
      
      <div className="space-y-8">
        {experiences.map((experience) => (
          <div key={experience._id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {experience.title}
                </h3>
                <p className={`text-lg font-medium ${theme.secondary} mb-2`}>
                  {experience.company}
                </p>
                <div className="flex items-center space-x-4 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {formatDate(experience.startDate)} - {
                      experience.current ? 'Present' : formatDate(experience.endDate)
                    }
                  </span>
                  {experience.location && (
                    <>
                      <span>•</span>
                      <span className="text-sm">{experience.location}</span>
                    </>
                  )}
                </div>
              </div>
              
              {experience.current && (
                <span className={`${theme.accent} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                  Current
                </span>
              )}
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
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
                      <span className={`w-2 h-2 ${theme.accent} rounded-full mt-2 flex-shrink-0`}></span>
                      <span className="text-gray-700 text-sm">{achievement}</span>
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