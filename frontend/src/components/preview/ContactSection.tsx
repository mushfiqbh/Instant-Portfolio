"use client";

import React from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { PersonalInfo } from '../../types/portfolio';

interface ThemeStyle {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
}

interface ContactSectionProps {
  personalInfo: PersonalInfo;
  theme: ThemeStyle;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ personalInfo, theme }) => {
  return (
    <section className="mb-12">
      <h2 className={`text-3xl font-bold ${theme.primary} mb-8 text-center`}>
        Get In Touch
      </h2>
      
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-gray-600 leading-relaxed">
            I&apos;m always interested in new opportunities and collaborations. 
            Feel free to reach out if you&apos;d like to discuss a project or just say hello!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personalInfo.email && (
            <a
              href={`mailto:${personalInfo.email}`}
              className={`flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border-l-4 ${theme.accent}`}
            >
              <div className={`p-3 ${theme.accent} rounded-lg`}>
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">{personalInfo.email}</p>
              </div>
            </a>
          )}
          
          {personalInfo.contactInfo.phone && (
            <a
              href={`tel:${personalInfo.contactInfo.phone}`}
              className={`flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border-l-4 ${theme.accent}`}
            >
              <div className={`p-3 ${theme.accent} rounded-lg`}>
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">{personalInfo.contactInfo.phone}</p>
              </div>
            </a>
          )}
          
          {personalInfo.contactInfo.address && (
            <div className={`flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm border-l-4 ${theme.accent}`}>
              <div className={`p-3 ${theme.accent} rounded-lg`}>
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                <p className="text-gray-600">{personalInfo.contactInfo.address}</p>
              </div>
            </div>
          )}
          
          <div className={`flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm border-l-4 ${theme.accent}`}>
            <div className={`p-3 ${theme.accent} rounded-lg`}>
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Let&apos;s Connect</h3>
              <p className="text-gray-600">Always open to opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};