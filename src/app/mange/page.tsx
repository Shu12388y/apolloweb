"use client";

import { useState } from "react";
import { ChevronLeft, Upload, Plus, Clock, ChevronDown } from "lucide-react";
import Link from "next/link";


export default function AddDoctorForm() {
  const [formData, setFormData] = useState({
    name: "",
    profile: "",
    gender: "",
    specialization: "",
    experience: "",
    qualifications: "",
    languages: [],
    biography: "",
    consultationFee: "",
    availableDays: [],
    timeSlots: [],
    location: "",
    clinicName: "",
    contactNumber: "",
    email: "",
  });

  const [showSpecializationDropdown, setShowSpecializationDropdown] =
    useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const specializations = [
    "General Physician",
    "Internal Medicine Specialist",
    "General Practitioner",
    "Cardiologist",
    "Dermatologist",
    "Gynecologist",
    "Pediatrician",
    "Orthopedic Surgeon",
    "Neurologist",
    "Psychiatrist",
  ];

  const languages = [
    "English",
    "Hindi",
    "Telugu",
    "Tamil",
    "Malayalam",
    "Kannada",
    "Bengali",
    "Marathi",
    "Gujarati",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const timeSlots = [
    "9:00 AM - 12:00 PM",
    "12:00 PM - 3:00 PM",
    "3:00 PM - 6:00 PM",
    "6:00 PM - 9:00 PM",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderChange = (gender) => {
    setFormData({
      ...formData,
      gender,
    });
  };

  const handleSpecializationSelect = (specialization) => {
    setFormData({
      ...formData,
      specialization,
    });
    setShowSpecializationDropdown(false);
  };

  const handleLanguageSelect = (language) => {
    const updatedLanguages = formData.languages.includes(language)
      ? formData.languages.filter((lang) => lang !== language)
      : [...formData.languages, language];

    setFormData({
      ...formData,
      languages: updatedLanguages,
    });
  };

  const handleDaySelect = (day) => {
    const updatedDays = formData.availableDays.includes(day)
      ? formData.availableDays.filter((d) => d !== day)
      : [...formData.availableDays, day];

    setFormData({
      ...formData,
      availableDays: updatedDays,
    });
  };

  const handleTimeSlotSelect = (timeSlot) => {
    const updatedTimeSlots = formData.timeSlots.includes(timeSlot)
      ? formData.timeSlots.filter((slot) => slot !== timeSlot)
      : [...formData.timeSlots, timeSlot];

    setFormData({
      ...formData,
      timeSlots: updatedTimeSlots,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting doctor data:", formData);
      const res = await fetch("/api/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      alert("Doctor information submitted successfully!");
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button className="mr-4 text-gray-600">
            <Link href="/">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            </button>
            <h1 className="text-xl font-bold text-gray-800">Add New Doctor</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Basic Information
            </h2>
          </div>

          <div className="p-6">
            {/* Profile Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image
              </label>
              <div className="flex items-start">
                <div className="mr-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <div>
                  <button
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 rounded-md text-white text-sm cursor-pointer hover:bg-blue-700"
                    onClick={() => {
                      const profileUrl = prompt("Enter the image url");
                      setFormData({
                        ...formData,
                        profile: profileUrl as string,
                      });
                    }}
                  >
                    Upload Photo
                  </button>
                  <p className="mt-2 text-xs text-gray-500">
                    Recommended size: 300x300 pixels. Max file size: 2MB
                  </p>
                </div>
              </div>
            </div>

            {/* Doctor Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Dr. Full Name"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender*
              </label>
              <div className="flex">
                <div
                  className="mr-6 flex items-center cursor-pointer"
                  onClick={() => handleGenderChange("male")}
                >
                  <div
                    className={`w-4 h-4 rounded-full border ${
                      formData.gender === "male"
                        ? "border-blue-600"
                        : "border-gray-400"
                    } flex items-center justify-center mr-2`}
                  >
                    {formData.gender === "male" && (
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                  <span>Male</span>
                </div>
                <div
                  className="mr-6 flex items-center cursor-pointer"
                  onClick={() => handleGenderChange("female")}
                >
                  <div
                    className={`w-4 h-4 rounded-full border ${
                      formData.gender === "female"
                        ? "border-blue-600"
                        : "border-gray-400"
                    } flex items-center justify-center mr-2`}
                  >
                    {formData.gender === "female" && (
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                  <span>Female</span>
                </div>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleGenderChange("other")}
                >
                  <div
                    className={`w-4 h-4 rounded-full border ${
                      formData.gender === "other"
                        ? "border-blue-600"
                        : "border-gray-400"
                    } flex items-center justify-center mr-2`}
                  >
                    {formData.gender === "other" && (
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                  <span>Other</span>
                </div>
              </div>
            </div>

            {/* Specialization */}
            <div className="mb-6 relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization*
              </label>
              <div
                className="w-full px-3 py-2 border rounded-md flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setShowSpecializationDropdown(!showSpecializationDropdown)
                }
              >
                <span
                  className={
                    formData.specialization ? "text-gray-900" : "text-gray-400"
                  }
                >
                  {formData.specialization || "Select Specialization"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>

              {showSpecializationDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  {specializations.map((specialization, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSpecializationSelect(specialization)}
                    >
                      {specialization}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Experience */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience (in years)*
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="10"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Qualifications */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualifications*
              </label>
              <input
                type="text"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleInputChange}
                placeholder="MBBS, MD (Internal Medicine)"
                className="w-full px-3 py-2 border rounded-md"
              />
              <p className="mt-1 text-xs text-gray-500">
                Example: MBBS, MD (Internal Medicine), FCPS
              </p>
            </div>

            {/* Languages */}
            <div className="mb-6 relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Languages*
              </label>
              <div
                className="w-full px-3 py-2 border rounded-md flex justify-between items-center cursor-pointer"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <span
                  className={
                    formData.languages.length > 0
                      ? "text-gray-900"
                      : "text-gray-400"
                  }
                >
                  {formData.languages.length > 0
                    ? formData.languages.join(", ")
                    : "Select Languages"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>

              {showLanguageDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  {languages.map((language, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleLanguageSelect(language)}
                    >
                      <div
                        className={`w-4 h-4 border ${
                          formData.languages.includes(language)
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-400"
                        } flex items-center justify-center mr-2`}
                      >
                        {formData.languages.includes(language) && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                      {language}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Biography */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Biography
              </label>
              <textarea
                name="biography"
                value={formData.biography}
                onChange={handleInputChange}
                rows={4}
                placeholder="Enter doctor's professional background, expertise, and achievements..."
                className="w-full px-3 py-2 border rounded-md"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Consultation Details */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Consultation Details
            </h2>
          </div>

          <div className="p-6">
            {/* Consultation Fee */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Fee (₹)*
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  name="consultationFee"
                  value={formData.consultationFee}
                  onChange={handleInputChange}
                  placeholder="499"
                  className="w-full pl-8 pr-3 py-2 border rounded-md"
                />
              </div>
            </div>

            {/* Available Days */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Days*
              </label>
              <div className="flex flex-wrap gap-2">
                {days.map((day, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`px-3 py-1 rounded-full text-sm ${
                      formData.availableDays.includes(day)
                        ? "bg-blue-100 text-blue-700 border-blue-200 border"
                        : "bg-gray-100 text-gray-700 border-gray-200 border"
                    }`}
                    onClick={() => handleDaySelect(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Slots*
              </label>
              <div className="grid grid-cols-2 gap-4">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`border rounded-md p-3 cursor-pointer ${
                      formData.timeSlots.includes(slot)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleTimeSlotSelect(slot)}
                  >
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-600" />
                      <span>{slot}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="mt-3 text-blue-600 text-sm flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Custom Time Slot
              </button>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Contact & Location Details
            </h2>
          </div>

          <div className="p-6">
            {/* Location */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location/City*
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Hyderabad"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Clinic Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinic/Hospital Name*
              </label>
              <input
                type="text"
                name="clinicName"
                value={formData.clinicName}
                onChange={handleInputChange}
                placeholder="Apollo 24/7 Virtual Clinic"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Contact Number */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number*
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="+91 9876543210"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="doctor@example.com"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </div>
  );
}
