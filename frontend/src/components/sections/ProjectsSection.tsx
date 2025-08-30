"use client"

import React from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Star } from 'lucide-react';
import { Project } from '../../types/portfolio';

interface ThemeStyle {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  theme: ThemeStyle;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, theme }) => {
  if (projects.length === 0) return null;

  return (
    <section className="mb-8 sm:mb-12">
      <h2 className={`text-2xl sm:text-3xl font-bold ${theme.primary} mb-6 sm:mb-8 text-center`}>
        Projects
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            {project.imageUrl && (
              <div className="relative">
                <div className="w-full h-40 sm:h-48 relative">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {project.featured && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <div className={`${theme.accent} text-white p-1.5 sm:p-2 rounded-full`}>
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {project.title}
                </h3>
                {project.featured && !project.imageUrl && (
                  <Star className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.primary} fill-current`} />
                )}
              </div>
              
              <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>
              
              <div className="mb-3 sm:mb-4">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.techStack
                    .filter(tech => tech.trim())
                    .map((tech, index) => (
                    <span
                      key={index}
                      className={`px-2 sm:px-3 py-1 ${theme.accent} text-white text-xs sm:text-sm rounded-full`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                {project.liveurl && (
                  <a
                    href={project.liveurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-1 sm:space-x-2 ${theme.primary} hover:underline font-medium text-sm sm:text-base`}
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
                
                {project.githuburl && (
                  <a
                    href={project.githuburl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-1 sm:space-x-2 ${theme.primary} hover:underline font-medium text-sm sm:text-base`}
                  >
                    <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};