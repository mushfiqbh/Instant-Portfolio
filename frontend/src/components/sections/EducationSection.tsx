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
    <section className="mb-12 sm:mb-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold ${theme.primary} mb-4`}>
          Education
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {education.map((edu, index) => (
          <div key={index} className="group relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
                <div className="mb-4 sm:mb-0 flex-1">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h3>
                      <p className={`text-lg sm:text-xl font-semibold ${theme.secondary} mb-3`}>
                        {edu.school}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="text-sm sm:text-base font-medium">
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </span>
                        </div>
                        {edu.grade && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm sm:text-base font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                              Grade: {edu.grade}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {edu.honors.length > 0 && edu.honors[0] && (
                <div className="mt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">🏆</span>
                    </div>
                    <span>Honors & Achievements</span>
                  </h4>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                    <ul className="space-y-3">
                      {edu.honors
                        .filter(honor => honor.trim())
                        .map((honor, honorIndex) => (
                        <li key={honorIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{honor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Decorative gradient line */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </section>
  );
};