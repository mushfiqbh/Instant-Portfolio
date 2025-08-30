"use client"

import React from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { Experience } from '../../types/portfolio';

interface ExperienceEditorProps {
  experiences: Experience[];
  onUpdate: (experiences: Experience[]) => void;
}

export const ExperienceEditor: React.FC<ExperienceEditorProps> = ({
  experiences,
  onUpdate
}) => {
  // Removed unused editingId state

  const addExperience = () => {
    const newExperience: Experience = {
      _id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    onUpdate([...experiences, newExperience]);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onUpdate(experiences.map(exp => 
      exp._id === id ? { ...exp, ...updates } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onUpdate(experiences.filter(exp => exp._id !== id));
  };

  const addAchievement = (experienceId: string) => {
    const experience = experiences.find(exp => exp._id === experienceId);
    if (experience) {
      updateExperience(experienceId, {
        achievements: [...experience.achievements, '']
      });
    }
  };

  const updateAchievement = (experienceId: string, index: number, value: string) => {
    const experience = experiences.find(exp => exp._id === experienceId);
    if (experience) {
      const newAchievements = [...experience.achievements];
      newAchievements[index] = value;
      updateExperience(experienceId, { achievements: newAchievements });
    }
  };

  const removeAchievement = (experienceId: string, index: number) => {
    const experience = experiences.find(exp => exp._id === experienceId);
    if (experience && experience.achievements.length > 1) {
      const newAchievements = experience.achievements.filter((_, i) => i !== index);
      updateExperience(experienceId, { achievements: newAchievements });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>
        <button
          onClick={addExperience}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience._id} className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  {experience.company || 'New Experience'}
                </span>
              </div>
              <button
                onClick={() => removeExperience(experience._id)}
                className="text-red-600 hover:text-red-800 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position/Title
                </label>
                <input
                  type="text"
                  value={experience.title}
                  onChange={(e) => updateExperience(experience._id, { title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) => updateExperience(experience._id, { company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={experience.location}
                onChange={(e) => updateExperience(experience._id, { location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City, State or Remote"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience._id, { startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience._id, { endDate: e.target.value })}
                  disabled={experience.current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              
              <div className="flex items-end">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={experience.current}
                    onChange={(e) => updateExperience(experience._id, { 
                      current: e.target.checked,
                      endDate: e.target.checked ? '' : experience.endDate
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Current</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={experience.description}
                onChange={(e) => updateExperience(experience._id, { description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your role and responsibilities..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Key Achievements
                </label>
                <button
                  onClick={() => addAchievement(experience._id)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Add Achievement
                </button>
              </div>
              
              <div className="space-y-2">
                {experience.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => updateAchievement(experience._id, index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe a key achievement..."
                    />
                    {experience.achievements.length > 1 && (
                      <button
                        onClick={() => removeAchievement(experience._id, index)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};