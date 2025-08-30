import React from 'react';
import { Theme } from '../../types/portfolio';

interface ThemeSelectorProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const themes = [
  {
    id: 'professional' as Theme,
    name: 'Professional',
    description: 'Clean and corporate design',
    colors: ['bg-blue-500', 'bg-blue-600', 'bg-blue-700']
  },
  {
    id: 'creative' as Theme,
    name: 'Creative',
    description: 'Bold and artistic design',
    colors: ['bg-purple-500', 'bg-purple-600', 'bg-purple-700']
  },
  {
    id: 'elegant' as Theme,
    name: 'Elegant',
    description: 'Sophisticated and minimal',
    colors: ['bg-green-500', 'bg-green-600', 'bg-green-700']
  }
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, onThemeChange }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Theme</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map((themeOption) => (
          <button
            key={themeOption.id}
            onClick={() => onThemeChange(themeOption.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              theme === themeOption.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex space-x-1">
                {themeOption.colors.map((color, index) => (
                  <div key={index} className={`w-4 h-4 rounded-full ${color}`}></div>
                ))}
              </div>
              <h4 className="font-semibold text-gray-900">{themeOption.name}</h4>
            </div>
            <p className="text-sm text-gray-600">{themeOption.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};