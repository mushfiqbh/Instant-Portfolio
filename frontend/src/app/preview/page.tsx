"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "../../components/general/ProtectedRoute";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PortfolioData } from "@/types/portfolio";
import { ExperienceSection } from "../../components/sections/ExperienceSection";
import { ProjectsSection } from "../../components/sections/ProjectsSection";
import { EducationSection } from "../../components/sections/EducationSection";
import { SkillsSection } from "../../components/sections/SkillsSection";

const PreviewPage = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/portfolios`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const backendPortfolio = data.portfolio;

        // Transform backend data to match frontend expectations
        const transformedData: PortfolioData = {
          personalInfo: backendPortfolio.personalInfo || {
            name: "",
            email: "",
            title: "",
            slogan: "",
            bio: "",
            profileImage: "",
            socialLinks: {
              resume: "",
              github: "",
              linkedin: "",
              twitter: "",
              facebook: "",
              whatsapp: "",
            },
            contactInfo: {
              phone: "",
              address: "",
            },
          },
          experiences:
            backendPortfolio.experience || backendPortfolio.experiences || [],
          projects: backendPortfolio.projects || [],
          education: backendPortfolio.education || [],
          skills: backendPortfolio.skills || [],
          sectionOrder: [],
          enabledSections: [],
        };

        setPortfolioData(transformedData);
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative z-10 text-center">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6">
                <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Your Portfolio</h2>
              <p className="text-gray-600">Preparing your professional showcase...</p>
            </div>

            {/* Loading animation */}
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!portfolioData) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative z-10 max-w-md mx-auto text-center">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">📋</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Portfolio Found
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Create your first stunning portfolio to showcase your professional journey and achievements.
              </p>

              <Link
                href="/builder"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <span>Start Building</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Header */}
        <header className="relative z-10 bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-18">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Link
                  href="/builder"
                  className="group flex items-center space-x-2 sm:space-x-3 text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-105"
                >
                  <div className="p-2 rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition-colors duration-300">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">Back to Builder</span>
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Portfolio Preview
                </h1>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">Live Preview</span>
              </div>
            </div>
          </div>
        </header>

        {/* Portfolio Preview */}
        <div className="relative z-10 max-w-5xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden border border-white/20">
            {/* Hero Section with Profile Image */}
            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
              {/* Hero background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
              </div>

              <div className="relative z-10 py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12">
                <div className="text-center max-w-4xl mx-auto">
                  {/* Profile Image with enhanced styling */}
                  <div className="relative mb-6 sm:mb-8">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-110"></div>
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 mx-auto">
                      {portfolioData.personalInfo?.profileImage ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={portfolioData.personalInfo.profileImage}
                            alt={portfolioData.personalInfo.name}
                            width={160}
                            height={160}
                            className="w-full h-full rounded-full object-cover border-4 border-white shadow-2xl hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent"></div>
                        </div>
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/5 border-4 border-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300">
                          <span className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                            {portfolioData.personalInfo?.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase() || "U"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name with enhanced typography */}
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
                    <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      {portfolioData.personalInfo?.name || "Your Name"}
                    </span>
                  </h1>

                  {/* Title with professional styling */}
                  <div className="mb-4 sm:mb-6">
                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-lg sm:text-xl lg:text-2xl font-medium border border-white/30">
                      {portfolioData.personalInfo?.title || "Your Title"}
                    </span>
                  </div>

                  {/* Bio with better typography */}
                  <div className="max-w-3xl mx-auto">
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-blue-50 drop-shadow-sm">
                      {portfolioData.personalInfo?.bio ||
                        "Your bio will appear here. Share your story, experience, and what drives you professionally."}
                    </p>
                  </div>

                  {/* Decorative elements */}
                  <div className="mt-8 sm:mt-10 flex justify-center">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="relative p-6 sm:p-8 lg:p-12 space-y-12 sm:space-y-16 lg:space-y-20">
              {/* Section divider */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-indigo-200 to-transparent"></div>

              {/* Experience Section */}
              {portfolioData.experiences &&
                portfolioData.experiences.length > 0 && (
                  <div className="relative">
                    <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">💼</span>
                    </div>
                    <ExperienceSection
                      experiences={portfolioData.experiences}
                      theme={{
                        primary: "text-indigo-600",
                        secondary: "text-slate-600",
                        accent: "bg-gradient-to-r from-indigo-500 to-purple-500",
                        gradient: "from-indigo-500 to-purple-500",
                      }}
                    />
                  </div>
                )}

              {/* Projects Section */}
              {portfolioData.projects && portfolioData.projects.length > 0 && (
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">🚀</span>
                  </div>
                  <ProjectsSection
                    projects={portfolioData.projects}
                    theme={{
                      primary: "text-purple-600",
                      secondary: "text-slate-600",
                      accent: "bg-gradient-to-r from-purple-500 to-pink-500",
                      gradient: "from-purple-500 to-pink-500",
                    }}
                  />
                </div>
              )}

              {/* Education Section */}
              {portfolioData.education &&
                portfolioData.education.length > 0 && (
                  <div className="relative">
                    <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">🎓</span>
                    </div>
                    <EducationSection
                      education={portfolioData.education}
                      theme={{
                        primary: "text-cyan-600",
                        secondary: "text-slate-600",
                        accent: "bg-gradient-to-r from-cyan-500 to-blue-500",
                        gradient: "from-cyan-500 to-blue-500",
                      }}
                    />
                  </div>
                )}

              {/* Skills Section */}
              {portfolioData.skills && portfolioData.skills.length > 0 && (
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">⚡</span>
                  </div>
                  <SkillsSection
                    skills={portfolioData.skills}
                    theme={{
                      primary: "text-emerald-600",
                      secondary: "text-slate-600",
                      accent: "bg-gradient-to-r from-emerald-500 to-teal-500",
                      gradient: "from-emerald-500 to-teal-500",
                    }}
                  />
                </div>
              )}

              {/* Footer */}
              <div className="text-center pt-8 border-t border-gray-200">
                <p className="text-gray-600 text-sm mb-2">Built with ❤️ using Instant Portfolio</p>
                <div className="flex justify-center space-x-4 text-xs text-gray-500">
                  <span>• Professional • Modern • Responsive •</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PreviewPage;
