"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { PersonalInfo } from "../../types/portfolio";

interface PersonalInfoEditorProps {
  personalInfo: PersonalInfo;
  onUpdate: (info: PersonalInfo) => void;
}

export const PersonalInfoEditor: React.FC<PersonalInfoEditorProps> = ({
  personalInfo,
  onUpdate,
}) => {
  const [uploadingImage, setUploadingImage] = useState(false);
  // Handle file upload for profile image
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/uploads/image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.imageUrl;

        // Update personalInfo state
        handleChange("profileImage", imageUrl);

        // Also update user profile immediately
        try {
          await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              profileImage: imageUrl,
            }),
          });
        } catch (userUpdateError) {
          console.error(
            "Error updating user profile with image:",
            userUpdateError
          );
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({ ...personalInfo, [field]: value });
  };

  const handleSocialLinkChange = (
    platform: keyof PersonalInfo["socialLinks"],
    value: string
  ) => {
    onUpdate({
      ...personalInfo,
      socialLinks: {
        ...personalInfo.socialLinks,
        [platform]: value,
      },
    });
  };

  const handleContactInfoChange = (
    field: keyof PersonalInfo["contactInfo"],
    value: string
  ) => {
    onUpdate({
      ...personalInfo,
      contactInfo: {
        ...personalInfo.contactInfo,
        [field]: value,
      },
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={personalInfo.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professional Title
            </label>
            <input
              type="text"
              value={personalInfo.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={uploadingImage}
                />
                {uploadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  type="url"
                  value={personalInfo.profileImage}
                  onChange={(e) => handleChange("profileImage", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={
                    uploadingImage ? "Uploading..." : "Or paste image URL"
                  }
                  disabled={
                    uploadingImage ||
                    Boolean(
                      personalInfo.profileImage &&
                        personalInfo.profileImage.includes("cloudinary")
                    )
                  }
                />
                {uploadingImage && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={personalInfo.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell visitors about yourself, your experience, and what drives you..."
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-900 mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={personalInfo.contactInfo.phone}
              onChange={(e) => handleContactInfoChange("phone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={personalInfo.contactInfo.address}
              onChange={(e) =>
                handleContactInfoChange("address", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-900 mb-4">
          Social Links
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume URL
            </label>
            <input
              type="url"
              value={personalInfo.socialLinks.resume}
              onChange={(e) => handleSocialLinkChange("resume", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub
            </label>
            <input
              type="url"
              value={personalInfo.socialLinks.github}
              onChange={(e) => handleSocialLinkChange("github", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              type="url"
              value={personalInfo.socialLinks.linkedin}
              onChange={(e) =>
                handleSocialLinkChange("linkedin", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter
            </label>
            <input
              type="url"
              value={personalInfo.socialLinks.twitter}
              onChange={(e) =>
                handleSocialLinkChange("twitter", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facebook
            </label>
            <input
              type="url"
              value={personalInfo.socialLinks.facebook}
              onChange={(e) =>
                handleSocialLinkChange("facebook", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp
            </label>
            <input
              type="url"
              value={personalInfo.socialLinks.whatsapp}
              onChange={(e) =>
                handleSocialLinkChange("whatsapp", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
