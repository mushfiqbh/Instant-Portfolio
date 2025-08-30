"use client"

import React from 'react';
import { Calendar, Award } from 'lucide-react';
import { Education } from '../../types/portfolio';

interface ThemeStyle {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
}

interface EducationSectionProps {
  education: Education[];
  theme: ThemeStyle;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education, theme }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (education.length === 0) return null;

  return (
    <section className="mb-8 sm:mb-12">
      <h2 className={`text-2xl sm:text-3xl font-bold ${theme.primary} mb-6 sm:mb-8 text-center`}>
        Education
      </h2>
      
      <div className="space-y-4 sm:space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
              <div className="mb-2 sm:mb-0">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                  {edu.degree} in {edu.fieldOfStudy}
                </h3>
                <p className={`text-base sm:text-lg font-medium ${theme.secondary} mb-2`}>
                  {edu.school}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-gray-600">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.grade && (
                    <span className="text-xs sm:text-sm">
                      Grade: {edu.grade}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {edu.honors.length > 0 && edu.honors[0] && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center space-x-1 sm:space-x-2">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Honors & Achievements</span>
                </h4>
                <ul className="space-y-1">
                  {edu.honors
                    .filter(honor => honor.trim())
                    .map((honor, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${theme.accent} rounded-full mt-1.5 sm:mt-2 flex-shrink-0`}></span>
                      <span className="text-gray-700 text-xs sm:text-sm">{honor}</span>
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