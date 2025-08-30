import React from "react";
import { GripVertical, Eye, EyeOff } from "lucide-react";

interface SectionManagerProps {
  sectionOrder: string[];
  enabledSections: string[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  onUpdateOrder: (order: string[]) => void;
  onToggleSection: (section: string) => void;
}

const sectionLabels = {
  about: "About",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  education: "Education",
};

export const SectionManager: React.FC<SectionManagerProps> = ({
  sectionOrder,
  enabledSections,
  activeSection,
  onSectionChange,
  onUpdateOrder,
  onToggleSection,
}) => {
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));

    if (dragIndex === dropIndex) return;

    const newOrder = [...sectionOrder];
    const [draggedItem] = newOrder.splice(dragIndex, 1);
    newOrder.splice(dropIndex, 0, draggedItem);

    onUpdateOrder(newOrder);
  };

  return (
    <div className="bg-white border-b border-gray-200 p-3 sm:p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Portfolio Sections
      </h3>
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2">
        {sectionOrder.map((section, index) => (
          <div
            key={section}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg border cursor-pointer transition-all duration-200 min-w-0 ${
              activeSection === section
                ? "bg-blue-50 border-blue-200"
                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
            }`}
            onClick={() => onSectionChange(section)}
          >
            <GripVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 cursor-grab flex-shrink-0" />

            <span
              className={`flex-1 text-xs sm:text-sm font-medium truncate ${
                enabledSections.includes(section)
                  ? "text-gray-900"
                  : "text-gray-400"
              }`}
            >
              {sectionLabels[section as keyof typeof sectionLabels]}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSection(section);
              }}
              className="p-1 rounded hover:bg-gray-200 transition-colors duration-200 flex-shrink-0"
            >
              {enabledSections.includes(section) ? (
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              ) : (
                <EyeOff className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
