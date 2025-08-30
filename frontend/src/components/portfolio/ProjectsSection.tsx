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
    <section className="mb-12">
      <h2 className={`text-3xl font-bold ${theme.primary} mb-8 text-center`}>
        Projects
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            {project.imageUrl && (
              <div className="relative">
                <div className="w-full h-48 relative">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <div className={`${theme.accent} text-white p-2 rounded-full`}>
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {project.title}
                </h3>
                {project.featured && !project.imageUrl && (
                  <Star className={`w-5 h-5 ${theme.primary} fill-current`} />
                )}
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.techStack
                    .filter(tech => tech.trim())
                    .map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 ${theme.accent} text-white text-sm rounded-full`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4">
                {project.liveurl && (
                  <a
                    href={project.liveurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 ${theme.primary} hover:underline font-medium`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
                
                {project.githuburl && (
                  <a
                    href={project.githuburl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 ${theme.primary} hover:underline font-medium`}
                  >
                    <Github className="w-4 h-4" />
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