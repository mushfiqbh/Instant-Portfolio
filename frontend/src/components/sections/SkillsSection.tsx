"use client"

import React from 'react';
import { Skill } from '../../types/portfolio';

interface ThemeStyle {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
}

interface SkillsSectionProps {
  skills: Skill[];
  theme: ThemeStyle;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, theme }) => {
  if (skills.length === 0) return null;

  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <section className="mb-8 sm:mb-12">
      <h2 className={`text-2xl sm:text-3xl font-bold ${theme.primary} mb-6 sm:mb-8 text-center`}>
        Skills & Technologies
      </h2>
      
      <div className="space-y-6 sm:space-y-8">
        {categories.map(category => {
          const categorySkills = skills.filter(skill => skill.category === category);
          if (categorySkills.length === 0) return null;
          
          return (
            <div key={category} className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                {category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {categorySkills.map((skill, index) => (
                  <div key={index} className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm font-medium text-gray-900">
                        {skill.name}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div
                        className={`h-1.5 sm:h-2 rounded-full ${theme.accent} transition-all duration-300`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};