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
    <section className="mb-12 sm:mb-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold ${theme.primary} mb-4`}>
          Featured Projects
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {projects.map((project, index) => (
          <div key={index} className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-white/50 transition-all duration-300 hover:scale-[1.02]">
            {project.imageUrl && (
              <div className="relative overflow-hidden">
                <div className="w-full h-48 sm:h-56 relative">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-full shadow-lg">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                  {project.title}
                </h3>
                {project.featured && !project.imageUrl && (
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                )}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed text-base">
                {project.description}
              </p>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.techStack
                    .filter(tech => tech.trim())
                    .map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-medium rounded-full border border-purple-200"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {project.liveurl && (
                  <a
                    href={project.liveurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className='text-sm'>Live Demo</span>
                  </a>
                )}

                {project.githuburl && (
                  <a
                    href={project.githuburl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 border-2 border-purple-600 text-purple-600 font-semibold py-3 px-6 rounded-xl hover:bg-purple-50 transition-all duration-200"
                  >
                    <Github className="w-4 h-4" />
                    <span className='text-sm'>Source Code</span>
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