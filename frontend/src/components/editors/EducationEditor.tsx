import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { Education } from '../../types/portfolio';

interface EducationEditorProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
}

export const EducationEditor: React.FC<EducationEditorProps> = ({
  education,
  onUpdate
}) => {
  const addEducation = () => {
    const newEducation: Education = {
      _id: Date.now().toString(),
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      grade: '',
      honors: ['']
    };
    onUpdate([...education, newEducation]);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onUpdate(education.map(edu => 
      edu._id === id ? { ...edu, ...updates } : edu
    ));
  };

  const removeEducation = (id: string) => {
    onUpdate(education.filter(edu => edu._id !== id));
  };

  const addAchievement = (educationId: string) => {
    const edu = education.find(e => e._id === educationId);
    if (edu) {
      updateEducation(educationId, {
        honors: [...edu.honors, '']
      });
    }
  };

  const updateAchievement = (educationId: string, index: number, value: string) => {
    const edu = education.find(e => e._id === educationId);
    if (edu) {
      const newHonors = [...edu.honors];
      newHonors[index] = value;
      updateEducation(educationId, { honors: newHonors });
    }
  };

  const removeAchievement = (educationId: string, index: number) => {
    const edu = education.find(e => e._id === educationId);
    if (edu && edu.honors.length > 1) {
      const newHonors = edu.honors.filter((_, i) => i !== index);
      updateEducation(educationId, { honors: newHonors });
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Education</h2>
        <button
          onClick={addEducation}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  {edu.school || 'New Education'}
                </span>
              </div>
              <button
                onClick={() => removeEducation(edu._id)}
                className="text-red-600 hover:text-red-800 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School/Institution
                </label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu._id, { school: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu._id, { degree: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Bachelor of Science"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu._id, { fieldOfStudy: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Computer Science"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu._id, { startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu._id, { endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade (Optional)
                  </label>
                  <input
                    type="text"
                    value={edu.grade || ''}
                    onChange={(e) => updateEducation(edu._id, { grade: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="3.8"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Honors & Achievements
                  </label>
                  <button
                    onClick={() => addAchievement(edu._id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Add Honor
                  </button>
                </div>
                
                <div className="space-y-2">
                  {edu.honors.map((honor, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={honor}
                        onChange={(e) => updateAchievement(edu._id, index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Honor or achievement..."
                      />
                      {edu.honors.length > 1 && (
                        <button
                          onClick={() => removeAchievement(edu._id, index)}
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
          </div>
        ))}
      </div>
    </div>
  );
};