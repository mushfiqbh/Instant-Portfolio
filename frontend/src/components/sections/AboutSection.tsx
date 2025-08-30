"use client";

import React from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import { PersonalInfo } from "../../types/portfolio";

interface ThemeStyle {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
}

interface AboutSectionProps {
  personalInfo: PersonalInfo;
  theme: ThemeStyle;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  personalInfo,
  theme,
}) => {
  return (
    <section className="mb-16 sm:mb-20">
      <div className="text-center mb-12 sm:mb-16">
        <div className="relative w-40 h-40 mx-auto mb-8">
          {personalInfo.profileImage ? (
            <div className="relative">
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                width={160}
                height={160}
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl"></div>
            </div>
          ) : (
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-white shadow-2xl flex items-center justify-center">
                <span className="text-white text-3xl font-bold">
                  {personalInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl"></div>
            </div>
          )}
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
          {personalInfo.name}
        </h1>

        <p
          className={`text-xl sm:text-2xl font-semibold ${theme.primary} mb-6`}
        >
          {personalInfo.title}
        </p>

        <div className="max-w-3xl mx-auto mb-8">
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            {personalInfo.bio}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-6xl mx-auto px-4">
        {personalInfo.email && (
          <a
            href={`mailto:${personalInfo.email}`}
            className="group flex items-center p-2.5 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border border-white/70 hover:border-indigo-100 active:translate-y-0 active:shadow-sm"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200 group-active:scale-95">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700 font-medium group-hover:text-red-600 transition-colors duration-200 truncate ml-2 sm:ml-3">
              {personalInfo.email}
            </span>
          </a>
        )}

        {personalInfo.contactInfo.phone && (
          <a
            href={`tel:${personalInfo.contactInfo.phone}`}
            className="group flex items-center p-2.5 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border border-white/70 hover:border-indigo-100 active:translate-y-0 active:shadow-sm"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200 group-active:scale-95">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700 font-medium group-hover:text-green-600 transition-colors duration-200 truncate ml-2 sm:ml-3">
              {personalInfo.contactInfo.phone}
            </span>
          </a>
        )}

        {personalInfo.contactInfo.address && (
          <div className="group flex items-center p-2.5 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-sm border border-white/70">
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700 font-medium ml-2 sm:ml-3 truncate">
              {personalInfo.contactInfo.address}
            </span>
          </div>
        )}

        {personalInfo.socialLinks.resume && (
          <a
            href={personalInfo.socialLinks.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center p-2.5 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border border-white/70 hover:border-indigo-100 active:translate-y-0 active:shadow-sm"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200 group-active:scale-95">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700 font-medium group-hover:text-purple-600 transition-colors duration-200 ml-2 sm:ml-3">
              Resume
            </span>
          </a>
        )}

        {personalInfo.socialLinks.linkedin && (
          <a
            href={personalInfo.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center p-2.5 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border border-white/70 hover:border-indigo-100 active:translate-y-0 active:shadow-sm"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200 group-active:scale-95">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-200 ml-2 sm:ml-3">
              LinkedIn
            </span>
          </a>
        )}

        {personalInfo.socialLinks.github && (
          <a
            href={personalInfo.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center p-2.5 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border border-white/70 hover:border-indigo-100 active:translate-y-0 active:shadow-sm"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200 group-active:scale-95">
              <Github className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700 font-medium group-hover:text-gray-800 transition-colors duration-200 ml-2 sm:ml-3">
              GitHub
            </span>
          </a>
        )}

        {personalInfo.socialLinks.twitter && (
          <a
            href={personalInfo.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center p-2.5 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border border-white/70 hover:border-indigo-100 active:translate-y-0 active:shadow-sm"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-sky-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200 group-active:scale-95">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700 font-medium group-hover:text-sky-600 transition-colors duration-200 ml-2 sm:ml-3">
              Twitter
            </span>
          </a>
        )}
      </div>
    </section>
  );
};
