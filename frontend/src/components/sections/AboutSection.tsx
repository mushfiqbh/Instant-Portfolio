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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {personalInfo.email && (
          <a
            href={`mailto:${personalInfo.email}`}
            className="group flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-700 font-medium group-hover:text-red-600 transition-colors duration-300">
              {personalInfo.email}
            </span>
          </a>
        )}

        {personalInfo.contactInfo.phone && (
          <a
            href={`tel:${personalInfo.contactInfo.phone}`}
            className="group flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-700 font-medium group-hover:text-green-600 transition-colors duration-300">
              {personalInfo.contactInfo.phone}
            </span>
          </a>
        )}

        {personalInfo.contactInfo.address && (
          <div className="group flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-700 font-medium">
              {personalInfo.contactInfo.address}
            </span>
          </div>
        )}

        {personalInfo.socialLinks.resume && (
          <a
            href={personalInfo.socialLinks.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-700 font-medium group-hover:text-purple-600 transition-colors duration-300">
              Resume
            </span>
          </a>
        )}

        {personalInfo.socialLinks.linkedin && (
          <a
            href={personalInfo.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">
              LinkedIn
            </span>
          </a>
        )}

        {personalInfo.socialLinks.github && (
          <a
            href={personalInfo.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Github className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-700 font-medium group-hover:text-gray-700 transition-colors duration-300">
              GitHub
            </span>
          </a>
        )}

        {personalInfo.socialLinks.twitter && (
          <a
            href={personalInfo.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-700 font-medium group-hover:text-sky-600 transition-colors duration-300">
              Twitter
            </span>
          </a>
        )}
      </div>
    </section>
  );
};
