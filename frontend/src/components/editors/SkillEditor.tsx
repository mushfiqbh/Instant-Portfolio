import React from "react";
import { Plus, Trash2, BarChart3 } from "lucide-react";
import { Skill } from "../../types/portfolio";

interface SkillsEditorProps {
  skills: Skill[];
  onUpdate: (skills: Skill[]) => void;
}

const skillCategories = [
  "Technical",
  "Frontend",
  "Backend",
  "Database",
  "Cloud",
  "Tools",
  "Other",
];

export const SkillsEditor: React.FC<SkillsEditorProps> = ({
  skills,
  onUpdate,
}) => {
  const addSkill = () => {
    const newSkill: Skill = {
      _id: Date.now().toString(),
      name: "",
      level: 50,
      category: "Technical",
    };
    onUpdate([...skills, newSkill]);
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    onUpdate(
      skills.map((skill) =>
        skill._id === id ? { ...skill, ...updates } : skill
      )
    );
  };

  const removeSkill = (id: string) => {
    onUpdate(skills.filter((skill) => skill._id !== id));
  };

  const groupedSkills = skillCategories.reduce((acc, category) => {
    acc[category] = skills.filter((skill) => skill.category === category);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
        <button
          onClick={addSkill}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="space-y-6">
        {skillCategories.map((category) => (
          <div key={category} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>{category}</span>
            </h3>

            <div className="space-y-3">
              {groupedSkills[category].map((skill) => (
                <div
                  key={skill._id}
                  className="bg-white p-3 rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Skill Name
                        </label>
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) =>
                            updateSkill(skill._id, { name: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          value={skill.category}
                          onChange={(e) =>
                            updateSkill(skill._id, { category: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {skillCategories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => removeSkill(skill._id)}
                      className="ml-4 text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proficiency Level: {skill.level}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) =>
                        updateSkill(skill._id, {
                          level: parseInt(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              ))}

              {groupedSkills[category].length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No {category.toLowerCase()} skills added yet
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
