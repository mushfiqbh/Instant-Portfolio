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
    <section className="mb-12 sm:mb-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold ${theme.primary} mb-4`}>
          Skills & Technologies
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {categories.map(category => {
          const categorySkills = skills.filter(skill => skill.category === category);
          if (categorySkills.length === 0) return null;

          return (
            <div key={category} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-xl font-bold">
                    {category === 'Technical' ? '⚡' :
                     category === 'Soft Skills' ? '🤝' :
                     category === 'Languages' ? '🌐' :
                     category === 'Tools' ? '🔧' : '💡'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {category}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categorySkills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out relative"
                          style={{ width: `${skill.level}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-sm"></div>
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