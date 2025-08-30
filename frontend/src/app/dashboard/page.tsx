"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "../../components/general/ProtectedRoute";
import { Plus, Edit, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PortfolioData } from "@/types/portfolio";

const DashboardPage = () => {
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
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
        setPortfolios([data.portfolio]); // Backend returns single portfolio
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Create Portfolio Section */}
            <div className="mb-8">
              <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                <div className="px-6 py-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Create/Edit Your Portfolio
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                      Build a stunning portfolio website in minutes. Showcase
                      your skills, projects, and experience with our easy-to-use
                      portfolio builder.
                    </p>
                    {portfolios.length === 0 ? (
                      <button
                        onClick={() => {
                          router.push("/builder");
                        }}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Create/Edit Portfolio
                      </button>
                    ) : (
                      <div className="flex justify-center space-x-4">
                        <Link
                          href="/builder"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <Edit className="w-5 h-5 mr-2" />
                          Edit Portfolio
                        </Link>
                        <Link
                          href="/preview"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <Eye className="w-5 h-5 mr-2" />
                          Preview Portfolio
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Stats */}
            {portfolios.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Edit className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Projects
                        </h3>
                        <p className="text-gray-600">
                          {portfolios[0].projects?.length || 0} projects
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <Eye className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Experience
                        </h3>
                        <p className="text-gray-600">
                          {portfolios[0].experiences?.length || 0} positions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Plus className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Skills
                        </h3>
                        <p className="text-gray-600">
                          {portfolios[0].skills?.length || 0} skills
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity or Quick Actions */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <div className="px-6 py-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link
                    href="/builder"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <Edit className="w-6 h-6 text-blue-600 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Edit Portfolio
                      </h4>
                      <p className="text-sm text-gray-600">
                        Update your portfolio content
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/preview"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                  >
                    <Eye className="w-6 h-6 text-green-600 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Preview</h4>
                      <p className="text-sm text-gray-600">
                        See how your portfolio looks
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
