"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import ProtectedRoute from "../../components/general/ProtectedRoute";
import { PortfolioBuilder } from "../../components/portfolio/PortfolioBuilder";
import { PortfolioPreview } from "../../components/portfolio/PortfolioPreview";
import { ThemeSelector } from "../../components/portfolio/ThemeSelector";
import { Save, Palette, CheckCircle, AlertCircle, Clock } from "lucide-react";
import {
  Education,
  Experience,
  PortfolioData,
  Project,
  Skill,
  Theme,
} from "../../types/portfolio";

interface UserProfile {
  name: string;
  email: string;
  title: string;
  slogan: string;
  bio: string;
  profileImage: string;
  socialLinks: {
    resume: string;
    github: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    whatsapp: string;
  };
  contactInfo: {
    phone: string;
    address: string;
  };
}

const BuilderPage = () => {
  const { user } = useAuth();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null
  );
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeSection, setActiveSection] = useState("about");
  const [theme, setTheme] = useState<Theme>("professional");
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialLoad = useRef(true);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchPortfolioData();
    }
  }, [user]);

  const savePortfolioToBackend = useCallback(async () => {
    if (!portfolioData) return;

    const token = localStorage.getItem("token");

    // Transform frontend data to backend format
    const backendData = {
      personalInfo: {
        name: portfolioData.personalInfo.name,
        email: portfolioData.personalInfo.email,
        title: portfolioData.personalInfo.title,
        slogan: portfolioData.personalInfo.slogan,
        bio: portfolioData.personalInfo.bio,
        profileImage: portfolioData.personalInfo.profileImage,
        socialLinks: portfolioData.personalInfo.socialLinks,
        contactInfo: portfolioData.personalInfo.contactInfo,
      },
      education: portfolioData.education.map((edu) => ({
        school: edu.school,
        degree: edu.degree,
        fieldOfStudy: edu.fieldOfStudy,
        startDate: edu.startDate ? new Date(edu.startDate) : undefined,
        endDate: edu.endDate ? new Date(edu.endDate) : undefined,
        grade: edu.grade,
        honors: edu.honors.filter((h) => h.trim()),
      })),
      experience: portfolioData.experiences.map((exp) => ({
        title: exp.title,
        company: exp.company,
        location: exp.location,
        startDate: exp.startDate ? new Date(exp.startDate) : undefined,
        endDate: exp.current
          ? undefined
          : exp.endDate
          ? new Date(exp.endDate)
          : undefined,
        description: exp.description,
        achievements: exp.achievements.filter((a) => a.trim()),
      })),
      projects: portfolioData.projects.map((proj) => ({
        title: proj.title,
        description: proj.description,
        liveurl: proj.liveurl,
        githuburl: proj.githuburl,
        imageUrl: proj.imageUrl,
        techStack: proj.techStack.filter((t) => t.trim()),
        featured: proj.featured,
      })),
      skills: portfolioData.skills.map((skill) => ({
        name: skill.name,
        category: skill.category,
        level: skill.level,
      })),
    };

    // Update user profile (basic info and profile image)
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: portfolioData.personalInfo.name,
        title: portfolioData.personalInfo.title,
        slogan: portfolioData.personalInfo.slogan,
        bio: portfolioData.personalInfo.bio,
        profileImage: portfolioData.personalInfo.profileImage,
        socialLinks: portfolioData.personalInfo.socialLinks,
        contactInfo: portfolioData.personalInfo.contactInfo,
      }),
    });

    // Check if portfolio exists
    const checkResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/portfolios`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let portfolioResponse;
    if (checkResponse.status === 404) {
      // Create new portfolio
      portfolioResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/portfolios`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(backendData),
        }
      );
    } else {
      // Update existing portfolio
      portfolioResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/portfolios`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(backendData),
        }
      );
    }

    if (!portfolioResponse.ok) {
      throw new Error("Failed to save portfolio");
    }
  }, [portfolioData]);

  const performAutoSave = useCallback(async () => {
    if (!portfolioData) return;

    setAutoSaveStatus("saving");
    try {
      await savePortfolioToBackend();
      setAutoSaveStatus("saved");
      setLastSaved(new Date());

      // Reset status after 3 seconds
      setTimeout(() => {
        setAutoSaveStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Auto-save failed:", error);
      setAutoSaveStatus("error");

      // Reset error status after 5 seconds
      setTimeout(() => {
        setAutoSaveStatus("idle");
      }, 5000);
    }
  }, [portfolioData, savePortfolioToBackend]);

  // Auto-save with debouncing
  useEffect(() => {
    if (!portfolioData || isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set auto-save status to pending
    setAutoSaveStatus("idle");

    // Debounce auto-save for 2 seconds
    saveTimeoutRef.current = setTimeout(() => {
      performAutoSave();
    }, 2000);

    // Cleanup timeout on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [portfolioData, performAutoSave]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.userInfo);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

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

        // Transform backend data to frontend format
        const transformedData: PortfolioData = {
          personalInfo: backendPortfolio.personalInfo || {
            name: userProfile?.name || user?.name || "",
            email: userProfile?.email || user?.email || "",
            title: userProfile?.title || "Web Developer",
            slogan: userProfile?.slogan || "Your catchy slogan here",
            bio: userProfile?.bio || "",
            profileImage: userProfile?.profileImage || "",
            socialLinks: {
              resume: userProfile?.socialLinks?.resume || "",
              github: userProfile?.socialLinks?.github || "",
              linkedin: userProfile?.socialLinks?.linkedin || "",
              twitter: userProfile?.socialLinks?.twitter || "",
              facebook: userProfile?.socialLinks?.facebook || "",
              whatsapp: userProfile?.socialLinks?.whatsapp || "",
            },
            contactInfo: {
              phone: userProfile?.contactInfo?.phone || "",
              address: userProfile?.contactInfo?.address || "",
            },
          },
          experiences:
            backendPortfolio.experience?.map((exp: Experience) => ({
              id: exp._id || Date.now().toString(),
              title: exp.title || "",
              company: exp.company || "",
              location: exp.location || "",
              startDate: exp.startDate
                ? new Date(exp.startDate).toISOString().slice(0, 7)
                : "",
              endDate: exp.endDate
                ? new Date(exp.endDate).toISOString().slice(0, 7)
                : "",
              current: !exp.endDate,
              description: exp.description || "",
              achievements: exp.achievements || [""],
            })) || [],
          projects:
            backendPortfolio.projects?.map((proj: Project) => ({
              id: proj._id || Date.now().toString(),
              title: proj.title || "",
              description: proj.description || "",
              liveurl: proj.liveurl || "",
              githuburl: proj.githuburl || "",
              imageUrl: proj.imageUrl || "",
              techStack: proj.techStack || [""],
              featured: proj.featured || false,
            })) || [],
          education:
            backendPortfolio.education?.map((edu: Education) => ({
              id: edu._id || Date.now().toString(),
              school: edu.school || "",
              degree: edu.degree || "",
              fieldOfStudy: edu.fieldOfStudy || "",
              startDate: edu.startDate
                ? new Date(edu.startDate).toISOString().slice(0, 7)
                : "",
              endDate: edu.endDate
                ? new Date(edu.endDate).toISOString().slice(0, 7)
                : "",
              grade: edu.grade || "",
              honors: edu.honors || [""],
            })) || [],
          skills:
            backendPortfolio.skills?.map((skill: Skill) => ({
              id: skill._id || Date.now().toString(),
              name: skill.name || "",
              category: skill.category || "Technical",
              level: skill.level || 50,
            })) || [],
          sectionOrder: [
            "about",
            "experience",
            "projects",
            "skills",
            "education",
          ],
          enabledSections: [
            "about",
            "experience",
            "projects",
            "skills",
            "education",
          ],
        };

        setPortfolioData(transformedData);
      } else if (response.status === 404) {
        // No portfolio exists, create default one
        const defaultData: PortfolioData = {
          personalInfo: {
            name: userProfile?.name || user?.name || "",
            email: userProfile?.email || user?.email || "",
            title: userProfile?.title || "Web Developer",
            slogan: userProfile?.slogan || "Your catchy slogan here",
            bio: userProfile?.bio || "",
            profileImage: userProfile?.profileImage || "",
            socialLinks: {
              resume: userProfile?.socialLinks?.resume || "",
              github: userProfile?.socialLinks?.github || "",
              linkedin: userProfile?.socialLinks?.linkedin || "",
              twitter: userProfile?.socialLinks?.twitter || "",
              facebook: userProfile?.socialLinks?.facebook || "",
              whatsapp: userProfile?.socialLinks?.whatsapp || "",
            },
            contactInfo: {
              phone: userProfile?.contactInfo?.phone || "",
              address: userProfile?.contactInfo?.address || "",
            },
          },
          experiences: [],
          projects: [],
          education: [],
          skills: [],
          sectionOrder: [
            "about",
            "experience",
            "projects",
            "skills",
            "education",
          ],
          enabledSections: [
            "about",
            "experience",
            "projects",
            "skills",
            "education",
          ],
        };
        setPortfolioData(defaultData);
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateData = async (updates: Partial<PortfolioData>) => {
    if (!portfolioData) return;

    const updatedData = { ...portfolioData, ...updates };
    setPortfolioData(updatedData);

    // If personalInfo was updated, also update userProfile to keep them in sync
    if (updates.personalInfo && userProfile) {
      setUserProfile({ ...userProfile, ...updates.personalInfo });
    }
  };

  const savePortfolio = async () => {
    if (!portfolioData) return;

    setSaving(true);
    try {
      await savePortfolioToBackend();
      setLastSaved(new Date());
      console.log("Portfolio saved successfully");
    } catch (error) {
      console.error("Error saving portfolio:", error);
    } finally {
      setSaving(false);
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
              Error Loading Portfolio
            </h2>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Portfolio Builder
              </h1>

              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Auto-save status indicator */}
                <div className="flex items-center space-x-2 text-sm">
                  {autoSaveStatus === "saving" && (
                    <>
                      <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
                      <span className="text-yellow-600 hidden sm:inline">
                        Saving...
                      </span>
                    </>
                  )}
                  {autoSaveStatus === "saved" && (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 hidden sm:inline">
                        Saved
                      </span>
                    </>
                  )}
                  {autoSaveStatus === "error" && (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-600 hidden sm:inline">
                        Save failed
                      </span>
                    </>
                  )}
                  {lastSaved && autoSaveStatus === "idle" && (
                    <span className="text-gray-500 text-xs hidden sm:inline">
                      Last saved: {lastSaved.toLocaleTimeString()}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">Theme</span>
                </button>

                <button
                  onClick={savePortfolio}
                  disabled={saving}
                  className="flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving..." : "Save"}</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Theme Selector */}
        {showThemeSelector && (
          <div className="bg-white border-b border-gray-200 p-4">
            <ThemeSelector theme={theme} onThemeChange={setTheme} />
          </div>
        )}

        {/* Main Content */}
        {/* Main Content */}
        <div className="h-[calc(100vh-4rem)]">
          {/* Mobile: Toggle views */}
          <div className="block lg:hidden h-full">
            {showPreview ? (
              <PortfolioPreview
                portfolioData={portfolioData}
                theme={theme}
                activeSection={activeSection}
              />
            ) : (
              <PortfolioBuilder
                portfolioData={portfolioData}
                onUpdateData={handleUpdateData}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            )}
          </div>

          {/* Desktop: Side by side */}
          <div className="hidden lg:flex h-full">
            <div className="w-1/2 bg-white border-r border-gray-200 overflow-y-auto">
              <PortfolioBuilder
                portfolioData={portfolioData}
                onUpdateData={handleUpdateData}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>
            <div className="w-1/2 bg-gray-50 overflow-y-auto">
              <PortfolioPreview
                portfolioData={portfolioData}
                theme={theme}
                activeSection={activeSection}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Toggle Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-blue-200 border-t border-gray-200 flex justify-around py-2 shadow-lg">
        <button
          onClick={() => setShowPreview(false)}
          className={`flex-1 py-2 text-sm font-medium ${
            !showPreview
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Builder
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className={`flex-1 py-2 text-sm font-medium ${
            showPreview
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Preview
        </button>
      </div>
    </ProtectedRoute>
  );
};

export default BuilderPage;
