"use client";

import React, { useState } from "react";
import { Plus, Trash2, ExternalLink, Star, Upload, Loader2 } from "lucide-react";
import { Project } from "../../types/portfolio";

interface ProjectsEditorProps {
  projects: Project[];
  onUpdate: (projects: Project[]) => void;
}

export const ProjectsEditor: React.FC<ProjectsEditorProps> = ({
  projects,
  onUpdate,
}) => {
  const [uploadingProjects, setUploadingProjects] = useState<Set<string>>(new Set());
  // Handle image upload for projects
  const handleImageUpload = async (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Add project to uploading set
    setUploadingProjects(prev => new Set(prev).add(projectId));

    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/uploads/image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        updateProject(projectId, { imageUrl: data.imageUrl });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      // Remove project from uploading set
      setUploadingProjects(prev => {
        const newSet = new Set(prev);
        newSet.delete(projectId);
        return newSet;
      });
    }
  };

  const addProject = () => {
    const newProject: Project = {
      _id: Date.now().toString(),
      title: "",
      description: "",
      liveurl: "",
      githuburl: "",
      imageUrl: "",
      techStack: [""],
      featured: false,
    };
    onUpdate([...projects, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    onUpdate(
      projects.map((project) =>
        project._id === id ? { ...project, ...updates } : project
      )
    );
  };

  const removeProject = (id: string) => {
    onUpdate(projects.filter((project) => project._id !== id));
  };

  const addTechStack = (projectId: string) => {
    const project = projects.find((p) => p._id === projectId);
    if (project) {
      updateProject(projectId, {
        techStack: [...project.techStack, ""],
      });
    }
  };

  const updateTechStack = (projectId: string, index: number, value: string) => {
    const project = projects.find((p) => p._id === projectId);
    if (project) {
      const newTechStack = [...project.techStack];
      newTechStack[index] = value;
      updateProject(projectId, { techStack: newTechStack });
    }
  };

  const removeTechStack = (projectId: string, index: number) => {
    const project = projects.find((p) => p._id === projectId);
    if (project && project.techStack.length > 1) {
      const newTechStack = project.techStack.filter((_, i) => i !== index);
      updateProject(projectId, { techStack: newTechStack });
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
        <button
          onClick={addProject}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  {project.title || "New Project"}
                </span>
                {project.featured && (
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                )}
              </div>
              <button
                onClick={() => removeProject(project._id)}
                className="text-red-600 hover:text-red-800 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) =>
                    updateProject(project._id, { title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) =>
                    updateProject(project._id, { description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your project and its impact..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={project.liveurl}
                    onChange={(e) =>
                      updateProject(project._id, { liveurl: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={project.githuburl}
                    onChange={(e) =>
                      updateProject(project._id, { githuburl: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Image
                </label>
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(project._id, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={uploadingProjects.has(project._id)}
                    />
                    {uploadingProjects.has(project._id) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="url"
                      value={project.imageUrl}
                      onChange={(e) =>
                        updateProject(project._id, { imageUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={uploadingProjects.has(project._id) ? "Uploading..." : "Or paste image URL"}
                      disabled={uploadingProjects.has(project._id) || Boolean(project.imageUrl && project.imageUrl.includes('cloudinary'))}
                    />
                    {uploadingProjects.has(project._id) && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tech Stack
                  </label>
                  <button
                    onClick={() => addTechStack(project._id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Add Tech
                  </button>
                </div>

                <div className="space-y-2">
                  {project.techStack.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) =>
                          updateTechStack(project._id, index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Technology name..."
                      />
                      {project.techStack.length > 1 && (
                        <button
                          onClick={() => removeTechStack(project._id, index)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={project.featured}
                  onChange={(e) =>
                    updateProject(project._id, { featured: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">
                  Feature this project
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
