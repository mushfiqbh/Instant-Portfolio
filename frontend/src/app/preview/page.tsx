"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "../../components/general/ProtectedRoute";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import Link from "next/link";

interface Experience {
  _id?: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
}

interface Project {
  _id?: string;
  title: string;
  description: string;
  liveurl: string;
  githuburl: string;
  image: string;
  techStack: string[];
  featured: boolean;
}

interface Education {
  _id?: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  grade: string;
  honors: string[];
}

interface Skill {
  _id?: string;
  name: string;
  category: string;
}

interface PortfolioData {
  _id: string;
  user: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
}

const PreviewPage = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/portfolio`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPortfolioData(data.portfolio);
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!portfolioData) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              No Portfolio Found
            </h2>
            <p className="text-gray-600 mb-6">
              Create a portfolio first to preview it.
            </p>
            <Link
              href="/builder"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Go to Builder
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link
                  href="/builder"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Builder</span>
                </Link>
                <h1 className="text-xl font-bold text-gray-900">Portfolio Preview</h1>
              </div>

              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Portfolio Preview */}
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">John Doe</h1>
                <p className="text-xl mb-6">Full Stack Developer</p>
                <p className="text-lg max-w-2xl mx-auto">
                  Passionate developer with 5+ years of experience building web applications
                  and solving complex problems with modern technologies.
                </p>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-8 space-y-12">
              {/* Experience Section */}
              {portfolioData.experience && portfolioData.experience.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience</h2>
                  <div className="space-y-6">
                    {portfolioData.experience.map((exp, index) => (
                      <div key={exp._id || index} className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                        <p className="text-gray-600 mb-3">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects Section */}
              {portfolioData.projects && portfolioData.projects.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portfolioData.projects.map((project, index) => (
                      <div key={project._id || index} className="border border-gray-200 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.map((tech: string, techIndex: number) => (
                            <span
                              key={techIndex}
                              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex space-x-4">
                          {project.liveurl && (
                            <a
                              href={project.liveurl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Live Demo
                            </a>
                          )}
                          {project.githuburl && (
                            <a
                              href={project.githuburl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-gray-800"
                            >
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education Section */}
              {portfolioData.education && portfolioData.education.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Education</h2>
                  <div className="space-y-4">
                    {portfolioData.education.map((edu, index) => (
                      <div key={edu._id || index} className="border border-gray-200 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-blue-600">{edu.school}</p>
                        <p className="text-gray-600">{edu.fieldOfStudy}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills Section */}
              {portfolioData.skills && portfolioData.skills.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Skills</h2>
                  <div className="flex flex-wrap gap-3">
                    {portfolioData.skills.map((skill, index) => (
                      <span
                        key={skill._id || index}
                        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PreviewPage;
