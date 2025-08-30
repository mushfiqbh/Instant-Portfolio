"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Palette,
  Zap,
  Download,
  Eye,
  Smartphone,
  Globe,
  Star,
  CheckCircle,
  Play,
  Users,
  Award,
} from "lucide-react";
import Link from "next/link";

export const LandingPage: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Beautiful Themes",
      description:
        "Choose from professionally designed themes that make your portfolio stand out",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Preview",
      description:
        "See your changes instantly with our live preview as you build your portfolio",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Responsive",
      description:
        "Your portfolio looks perfect on every device, from mobile to desktop",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "UX Designer",
      content:
        "This tool helped me create a stunning portfolio in minutes. The themes are gorgeous!",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      name: "Marcus Rodriguez",
      role: "Full Stack Developer",
      content:
        "The drag-and-drop interface is incredibly intuitive. I love how easy it is to customize.",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      name: "Emily Watson",
      role: "Product Manager",
      content:
        "Professional results without the hassle. This is exactly what I needed for my career.",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Build Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Dream Portfolio
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create stunning, professional portfolios in minutes with our
              intuitive drag-and-drop builder. No coding required, just pure
              creativity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/dashboard"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-3"
              >
                <span>Start Building Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 px-6 py-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white">
                <Play className="w-5 h-5" />
                <span className="font-medium">Watch Demo</span>
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Export anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Shine
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our powerful yet simple tools help you create portfolios that get
              noticed by employers and clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                  currentFeature === index
                    ? "bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl"
                    : "bg-gray-50 hover:bg-white border-2 border-transparent hover:shadow-lg"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center transition-all duration-300 ${
                    currentFeature === index
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "bg-white text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                  }`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <Eye className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Live Preview</h4>
              <p className="text-sm text-gray-600">See changes instantly</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
              <Download className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Easy Export</h4>
              <p className="text-sm text-gray-600">Download your data</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <Globe className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Web Ready</h4>
              <p className="text-sm text-gray-600">Perfect for any device</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Professional</h4>
              <p className="text-sm text-gray-600">Industry-standard design</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See It In Action
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Watch how easy it is to create a professional portfolio with our
              intuitive interface.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gray-100 px-6 py-4 flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  Portfolio Builder
                </span>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Editor Panel
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-900">
                            Personal Info
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-600">
                            Experience
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Live Preview
                    </h3>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-3"></div>
                        <div className="h-4 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
                        <div className="h-3 bg-blue-300 rounded w-24 mx-auto"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600">Portfolios Created</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600">95%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-600">3</div>
              <div className="text-gray-600">Beautiful Themes</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">Always Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Loved by
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Professionals
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of professionals who have built amazing portfolios
              with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <Image
                    width={48}
                    height={48}
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Stand Out?
          </h2>

          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already built stunning
            portfolios. Start creating yours today - it is completely free!
          </p>

          <Link
            href="/dashboard"
            className="w-fit group bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-3 mx-auto"
          >
            <span>Create Your Portfolio Now</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          <div className="mt-8 flex items-center justify-center space-x-6 text-blue-100">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>10,000+ users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-current" />
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
