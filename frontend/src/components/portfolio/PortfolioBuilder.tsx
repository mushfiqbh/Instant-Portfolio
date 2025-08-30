import React, { useEffect } from 'react';
import { SectionManager } from './SectionManager';
import { PersonalInfoEditor } from '../editors/PersonalInfoEditor';
import { ExperienceEditor } from '../editors/ExperienceEditor';
import { ProjectsEditor } from '../editors/ProjectEditor';
import { SkillsEditor } from '../editors/SkillEditor';
import { EducationEditor } from '../editors/EducationEditor';
import { PortfolioData } from '../../types/portfolio';

interface PortfolioBuilderProps {
  portfolioData: PortfolioData;
  onUpdateData: (data: Partial<PortfolioData>) => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const PortfolioBuilder: React.FC<PortfolioBuilderProps> = ({
  portfolioData,
  onUpdateData,
  activeSection,
  onSectionChange
}) => {
  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      // Auto-save logic can be added here if needed
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [portfolioData]);

  const renderEditor = () => {
    switch (activeSection) {
      case 'about':
        return (
          <PersonalInfoEditor
            personalInfo={portfolioData.personalInfo}
            onUpdate={(personalInfo) => onUpdateData({ personalInfo })}
          />
        );
      case 'experience':
        return (
          <ExperienceEditor
            experiences={portfolioData.experiences}
            onUpdate={(experiences) => onUpdateData({ experiences })}
          />
        );
      case 'projects':
        return (
          <ProjectsEditor
            projects={portfolioData.projects}
            onUpdate={(projects) => onUpdateData({ projects })}
          />
        );
      case 'skills':
        return (
          <SkillsEditor
            skills={portfolioData.skills}
            onUpdate={(skills) => onUpdateData({ skills })}
          />
        );
      case 'education':
        return (
          <EducationEditor
            education={portfolioData.education}
            onUpdate={(education) => onUpdateData({ education })}
          />
        );
      default:
        return (
          <div className="p-6 text-center text-gray-500">
            Select a section to edit
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <SectionManager
        sectionOrder={portfolioData.sectionOrder}
        enabledSections={portfolioData.enabledSections}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        onUpdateOrder={(sectionOrder) => onUpdateData({ sectionOrder })}
        onToggleSection={(section: string) => {
          const enabledSections = portfolioData.enabledSections.includes(section)
            ? portfolioData.enabledSections.filter(s => s !== section)
            : [...portfolioData.enabledSections, section];
          onUpdateData({ enabledSections });
        }}
      />
      
      <div className="flex-1 overflow-y-auto">
        {renderEditor()}
      </div>
    </div>
  );
};