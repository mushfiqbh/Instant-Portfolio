"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "../../components/general/ProtectedRoute";
import { ArrowLeft, Mail, MapPin, Phone, Linkedin, Github, Globe, Twitter, Facebook } from "lucide-react";
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden p-4">
          {/* Animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-pink-400/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 via-cyan-400/20 to-emerald-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-r from-purple-400/10 to-pink-400/5 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>

          <div className="relative z-10 w-full max-w-lg">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/20 animate-ping opacity-75"></div>
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-white/30 border-t-white"></div>
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Loading Your Portfolio
                  </h2>
                  <p className="text-slate-600">
                    Preparing your professional showcase...
                  </p>
                </div>

                {/* Modern loading animation */}
                <div className="w-full max-w-xs">
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-progress"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!portfolioData) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden p-4">
          {/* Animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-pink-400/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 via-cyan-400/20 to-emerald-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative z-10 w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 transform transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">✨</span>
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 blur-md -z-10 animate-pulse-slow"></div>
                </div>

                <div className="text-center space-y-3">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    No Portfolio Found
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    Create your first stunning portfolio to showcase your
                    professional journey and achievements.
                  </p>
                </div>

                <Link
                  href="/builder"
                  className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Start Building</span>
                  <span className="ml-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="fixed inset-0 -z-0">
          <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-gradient-to-br from-blue-400/20 via-purple-400/10 to-pink-400/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-[40rem] h-[40rem] bg-gradient-to-tr from-indigo-400/10 via-cyan-400/10 to-emerald-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Header with glassmorphism effect */}
        <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl shadow-sm border-b border-white/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Link
                  href="/builder"
                  className="group flex items-center space-x-2 sm:space-x-3 text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-105"
                >
                  <div className="p-2 rounded-full bg-white/90 backdrop-blur-sm group-hover:bg-white transition-all duration-300 shadow-sm">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-slate-700 group-hover:text-indigo-600 transition-colors duration-300">
                    Back to Builder
                  </span>
                </Link>
                <div className="h-6 w-px bg-slate-200"></div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Portfolio Preview
                </h1>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-slate-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm text-slate-700 font-medium">
                  Live Preview
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Portfolio Preview */}
        <div className="relative z-10 max-w-5xl mx-auto py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden border border-white/30 transform transition-all duration-300 hover:shadow-2xl">
            {/* Hero Section with Profile Image */}
            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-shift"></div>
              
              {/* Hero background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                ></div>
              </div>

              <div className="relative z-10 py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12">
                <div className="text-center max-w-4xl mx-auto">
                  {/* Profile Image with enhanced styling */}
                  <div className="relative mb-8 sm:mb-10">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-110 animate-pulse-slow"></div>
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 mx-auto">
                      {portfolioData.personalInfo?.profileImage ? (
                        <div className="relative group w-full h-full">
                          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                          <div className="relative w-full h-full rounded-full border-4 border-white/30 shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500 ease-out">
                            <Image
                              src={portfolioData.personalInfo.profileImage}
                              alt={portfolioData.personalInfo.name}
                              width={176}
                              height={176}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/5 border-4 border-white/30 shadow-2xl flex items-center justify-center hover:scale-105 transition-all duration-500 ease-out group">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <span className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-lg relative z-10">
                            {portfolioData.personalInfo?.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "U"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name with enhanced typography */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent drop-shadow-lg">
                      {portfolioData.personalInfo?.name || "Your Name"}
                    </span>
                  </h1>

                  {/* Title with professional styling */}
                  <div className="mb-6 sm:mb-8">
                    <span className="inline-block px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-lg sm:text-xl lg:text-2xl font-medium border border-white/20 text-white/90 hover:bg-white/20 hover:shadow-lg transition-all duration-300">
                      {portfolioData.personalInfo?.title || "Your Title"}
                    </span>
                  </div>

                  {/* Bio with better typography */}
                  <div className="max-w-3xl mx-auto">
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-white/90 drop-shadow-sm">
                      {portfolioData.personalInfo?.bio ||
                        "Your bio will appear here. Share your story, experience, and what drives you professionally."}
                    </p>
                  </div>

                  {/* Animated scroll indicator */}
                  <div className="mt-10 sm:mt-12 flex flex-col items-center">
                    <span className="text-xs font-medium text-white/70 mb-2 tracking-wider">SCROLL TO EXPLORE</span>
                    <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/80 animate-scroll-bounce"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="relative p-6 sm:p-8 lg:p-12 space-y-14 sm:space-y-16 lg:space-y-20">
              {/* Animated section divider */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-20">
                <div className="w-full h-full bg-gradient-to-b from-indigo-400/30 via-purple-400/20 to-transparent animate-gradient-shift"></div>
              </div>
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
                        accent:
                          "bg-gradient-to-r from-indigo-500 to-purple-500",
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

              {/* Contact Info */}
              <div className="p-6 sm:p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-500 hover:border-white/50">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></span>
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Get In Touch
                  </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-slate-700">
                  <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-white/30 hover:shadow-md transition-all duration-300">
                    <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-100">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="font-medium text-sm sm:text-base">
                        {portfolioData?.personalInfo?.email || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-white/30 hover:shadow-md transition-all duration-300">
                    <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                      <Phone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Phone</p>
                      <p className="font-medium text-sm sm:text-base">
                        {portfolioData?.personalInfo?.contactInfo?.phone ||
                          "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-white/30 hover:shadow-md transition-all duration-300 sm:col-span-2 lg:col-span-1">
                    <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-100">
                      <MapPin className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Location</p>
                      <p className="font-medium text-sm sm:text-base">
                        {portfolioData?.personalInfo?.contactInfo?.address ||
                          "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 px-6">
                <h3 className="text-sm text-slate-500 mb-3">Find me on</h3>
                <div className="flex flex-wrap items-center gap-3">
                  {portfolioData?.personalInfo?.socialLinks?.resume && (
                    <a
                      href={portfolioData.personalInfo.socialLinks.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-white/50 rounded-lg border border-white/30 hover:shadow-md transition-all"
                    >
                      <Globe className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm text-slate-700">Resume</span>
                    </a>
                  )}

                  {portfolioData?.personalInfo?.socialLinks?.linkedin && (
                    <a
                      href={portfolioData.personalInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-white/50 rounded-lg border border-white/30 hover:shadow-md transition-all"
                    >
                      <Linkedin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-slate-700">LinkedIn</span>
                    </a>
                  )}

                  {portfolioData?.personalInfo?.socialLinks?.github && (
                    <a
                      href={portfolioData.personalInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-white/50 rounded-lg border border-white/30 hover:shadow-md transition-all"
                    >
                      <Github className="w-4 h-4 text-gray-800" />
                      <span className="text-sm text-slate-700">GitHub</span>
                    </a>
                  )}

                  {portfolioData?.personalInfo?.socialLinks?.twitter && (
                    <a
                      href={portfolioData.personalInfo.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-white/50 rounded-lg border border-white/30 hover:shadow-md transition-all"
                    >
                      <Twitter className="w-4 h-4 text-sky-500" />
                      <span className="text-sm text-slate-700">Twitter</span>
                    </a>
                  )}

                  {portfolioData?.personalInfo?.socialLinks?.facebook && (
                    <a
                      href={portfolioData.personalInfo.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-white/50 rounded-lg border border-white/30 hover:shadow-md transition-all"
                    >
                      <Facebook className="w-4 h-4 text-rose-600" />
                      <span className="text-sm text-slate-700">Facebook</span>
                    </a>
                  )}
                </div>
              </div>
              
              {/* Footer */}
              <div className="pt-8 border-t border-slate-200/70">
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500"></div>
                  </div>
                  <p className="text-slate-600 text-sm mb-2">
                    Built with ❤️ using <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Instant Portfolio</span>
                  </p>
                  <div className="flex justify-center space-x-4 text-xs text-slate-500">
                    <span>• Professional</span>
                    <span>• Modern</span>
                    <span>• Responsive •</span>
                  </div>
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
