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
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link
                  href="/builder"
                  className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Back to Builder</span>
                </Link>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Portfolio Preview
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Portfolio Preview */}
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Hero Section with Profile Image */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16 px-4 sm:px-8">
              <div className="text-center">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6">
                  {portfolioData.personalInfo?.profileImage ? (
                    <Image
                      src={portfolioData.personalInfo.profileImage}
                      alt={portfolioData.personalInfo.name}
                      width={128}
                      height={128}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="text-white text-xl sm:text-2xl font-bold">
                        {portfolioData.personalInfo?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
                  {portfolioData.personalInfo?.name || "Your Name"}
                </h1>
                <p className="text-lg sm:text-xl mb-4 sm:mb-6">
                  {portfolioData.personalInfo?.title || "Your Title"}
                </p>
                <p className="text-base sm:text-lg max-w-2xl mx-auto px-4">
                  {portfolioData.personalInfo?.bio ||
                    "Your bio will appear here."}
                </p>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-8 sm:space-y-12">
              {/* Experience Section */}
              {portfolioData.experiences &&
                portfolioData.experiences.length > 0 && (
                  <ExperienceSection
                    experiences={portfolioData.experiences}
                    theme={{
                      primary: "text-blue-600",
                      secondary: "text-gray-600",
                      accent: "bg-blue-600",
                      gradient: "from-blue-600 to-purple-600",
                    }}
                  />
                )}

              {/* Projects Section */}
              {portfolioData.projects && portfolioData.projects.length > 0 && (
                <ProjectsSection
                  projects={portfolioData.projects}
                  theme={{
                    primary: "text-blue-600",
                    secondary: "text-gray-600",
                    accent: "bg-blue-600",
                    gradient: "from-blue-600 to-purple-600",
                  }}
                />
              )}

              {/* Education Section */}
              {portfolioData.education &&
                portfolioData.education.length > 0 && (
                  <EducationSection
                    education={portfolioData.education}
                    theme={{
                      primary: "text-blue-600",
                      secondary: "text-gray-600",
                      accent: "bg-blue-600",
                      gradient: "from-blue-600 to-purple-600",
                    }}
                  />
                )}

              {/* Skills Section */}
              {portfolioData.skills && portfolioData.skills.length > 0 && (
                <SkillsSection
                  skills={portfolioData.skills}
                  theme={{
                    primary: "text-blue-600",
                    secondary: "text-gray-600",
                    accent: "bg-blue-600",
                    gradient: "from-blue-600 to-purple-600",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PreviewPage;
