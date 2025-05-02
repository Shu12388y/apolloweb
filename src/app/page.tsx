"use client";
import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  Check,
  ChevronRight,
  Info,
} from "lucide-react";

// Define TypeScript interfaces
interface Doctor {
  id: number;
  name: string;
  profile: string;
  specialization: string;
  experience: string;
  qualifications: string;
  biography: string;
  consultationFee: number;
  location: string;
  clinicName: string;
  rating?: string;
  patients?: string;
  timeSlots?: string;
  availableDays?: boolean;
  isOnline?: boolean;
  isHospitalVisit?: boolean;
  experienceYears?: number;
  languages?: string[];
  facility?: string;
}

interface FilterState {
  modeOfConsult: {
    hospitalVisit: boolean;
    onlineConsult: boolean;
  };
  experience: {
    [key: string]: boolean;
  };
  fees: {
    [key: string]: boolean;
  };
  language: {
    [key: string]: boolean;
  };
  facility: {
    [key: string]: boolean;
  };
}

export default function ApolloClone() {
  // Initialize filter state with TypeScript type
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    modeOfConsult: {
      hospitalVisit: false,
      onlineConsult: false,
    },
    experience: {
      "0-5": false,
      "6-10": false,
      "11-16": false,
      "17+": false,
    },
    fees: {
      "100-500": false,
      "500-1000": false,
      "1000+": false,
    },
    language: {
      english: false,
      hindi: false,
      telugu: false,
    },
    facility: {
      apolloHospital: false,
      otherClinics: false,
    },
  });
  
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/doctors");
      const data = await res.json();
      setAllDoctors(data);
      setFilteredDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      // Fallback to dummy data in case API fails
      const dummyData: Doctor[] = [
        {
          id: 1,
          name: "Dr. Suraja Nutulapati",
          profile: "https://via.placeholder.com/70",
          specialization: "General Physician/ Internal Medicine Specialist",
          experience: "10 YEARS",
          qualifications: "MBBS, MD (INTERNAL MEDICINE)",
          biography: "Specializes in general medicine and chronic disease management",
          location: "Telangana Hyderabad",
          clinicName: "Apollo 24/7 Virtual Clinic",
          consultationFee: 499,
          availableDays: false,
          isOnline: true,
          isHospitalVisit: true,
          experienceYears: 10,
          languages: ["English", "Telugu", "Hindi"],
          facility: "Apollo Hospital"
        },
        {
          id: 2,
          name: "Dr. Vasanthasree Nair",
          profile: "https://via.placeholder.com/70",
          specialization: "General Practitioner",
          experience: "15 YEARS",
          qualifications: "MBBS",
          biography: "Experienced in primary care and preventive medicine",
          location: "Kerala, Angamaly",
          clinicName: "Apollo 24/7 Virtual Clinic",
          rating: "97%",
          patients: "(375+ Patients)",
          consultationFee: 459,
          timeSlots: "20",
          availableDays: true,
          isOnline: true,
          isHospitalVisit: false,
          experienceYears: 15,
          languages: ["English", "Malayalam", "Tamil"],
          facility: "Apollo Hospital"
        },
        {
          id: 3,
          name: "Dr. Siri Nallapu",
          profile: "https://via.placeholder.com/70",
          specialization: "General Practitioner",
          experience: "5 YEARS",
          qualifications: "MBBS",
          biography: "Focuses on family medicine and women's health",
          location: "Telangana, Hyderabad",
          clinicName: "Apollo 24/7 Virtual Clinic",
          consultationFee: 399,
          timeSlots: "22",
          availableDays: true,
          isOnline: true,
          isHospitalVisit: true,
          experienceYears: 5,
          languages: ["English", "Telugu", "Hindi"],
          facility: "Apollo Hospital"
        },
        {
          id: 4,
          name: "Dr. Divya Lekha Gupta",
          profile: "https://via.placeholder.com/70",
          specialization: "General Practitioner",
          experience: "10 YEARS",
          qualifications: "MBBS, MD (PATHOLOGY)",
          biography: "Specializes in diagnostic medicine and laboratory interpretations",
          location: "Visakhapatnam",
          clinicName: "Other Clinic",
          consultationFee: 489,
          availableDays: false,
          isOnline: false,
          isHospitalVisit: true,
          experienceYears: 10,
          languages: ["English", "Hindi"],
          facility: "Other Clinics"
        }
      ];
      setAllDoctors(dummyData);
      setFilteredDoctors(dummyData);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Apply filters whenever selectedFilters changes
  useEffect(() => {
    applyFilters();
  }, [selectedFilters, allDoctors]);

  // Filter function that applies all selected filters
  const applyFilters = () => {
    let filtered = [...allDoctors];
    
    // Apply Mode of Consult filter
    if (selectedFilters.modeOfConsult.hospitalVisit || selectedFilters.modeOfConsult.onlineConsult) {
      filtered = filtered.filter(doctor => 
        (selectedFilters.modeOfConsult.hospitalVisit && doctor.isHospitalVisit) || 
        (selectedFilters.modeOfConsult.onlineConsult && doctor.isOnline)
      );
    }
    
    // Apply Experience filter
    const experienceFilters = Object.entries(selectedFilters.experience).filter(([_, isSelected]) => isSelected);
    if (experienceFilters.length > 0) {
      filtered = filtered.filter(doctor => {
        return experienceFilters.some(([range, _]) => {
          if (!doctor.experienceYears) return false;
          
          if (range === "0-5") return doctor.experienceYears >= 0 && doctor.experienceYears <= 5;
          if (range === "6-10") return doctor.experienceYears >= 6 && doctor.experienceYears <= 10;
          if (range === "11-16") return doctor.experienceYears >= 11 && doctor.experienceYears <= 16;
          if (range === "17+") return doctor.experienceYears >= 17;
          return false;
        });
      });
    }
    
    // Apply Fees filter
    const feesFilters = Object.entries(selectedFilters.fees).filter(([_, isSelected]) => isSelected);
    if (feesFilters.length > 0) {
      filtered = filtered.filter(doctor => {
        return feesFilters.some(([range, _]) => {
          if (range === "100-500") return doctor.consultationFee >= 100 && doctor.consultationFee <= 500;
          if (range === "500-1000") return doctor.consultationFee >= 500 && doctor.consultationFee <= 1000;
          if (range === "1000+") return doctor.consultationFee >= 1000;
          return false;
        });
      });
    }
    
    // Apply Language filter
    const languageFilters = Object.entries(selectedFilters.language).filter(([_, isSelected]) => isSelected);
    if (languageFilters.length > 0) {
      filtered = filtered.filter(doctor => {
        if (!doctor.languages) return false;
        return languageFilters.some(([lang, _]) => {
          const language = lang.toLowerCase();
          return doctor.languages?.some(docLang => docLang.toLowerCase() === language);
        });
      });
    }
    
    // Apply Facility filter
    const facilityFilters = Object.entries(selectedFilters.facility).filter(([_, isSelected]) => isSelected);
    if (facilityFilters.length > 0) {
      filtered = filtered.filter(doctor => {
        return facilityFilters.some(([facility, _]) => {
          if (facility === "apolloHospital") return doctor.facility === "Apollo Hospital";
          if (facility === "otherClinics") return doctor.facility === "Other Clinics";
          return false;
        });
      });
    }
    
    setFilteredDoctors(filtered);
  };

  const handleFilterChange = (category: keyof FilterState, filter: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [filter]: !prev[category][filter],
      },
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      modeOfConsult: {
        hospitalVisit: true,
        onlineConsult: true,
      },
      experience: {
        "0-5": false,
        "6-10": false,
        "11-16": false,
        "17+": false,
      },
      fees: {
        "100-500": false,
        "500-1000": false,
        "1000+": false,
      },
      language: {
        english: false,
        hindi: false,
        telugu: false,
      },
      facility: {
        apolloHospital: false,
        otherClinics: false,
      },
    });
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="shadow-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://images.apollo247.in/images/icons/apollo247.svg"
              alt="Apollo 24/7"
              className="h-10 mr-6"
            />

            <div className="flex flex-row items-center">
              <div className="flex items-center text-gray-700 mr-2">
                <MapPin className="h-7 w-7 font-bold" />
              </div>
              <div className="flex flex-col items-center text-center justify-center text-gray-800">
                <span className="text-sm">Select Location</span>
                <div className="flex flex-row items-center">
                  <span className="text-md font-bold">Select Address</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search Doctors, Specialities, Conditions etc."
              className="w-full py-2 pl-10 pr-3 border rounded-md text-sm"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>

          <button className="border border-blue-600 text-blue-600 rounded-md px-4 py-1.5 text-sm font-medium flex items-center">
            Login
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 flex items-center justify-center shadow-gray-200 shadow-md w-full">
        <div className="flex">
          <a href="#" className="px-4 py-4 text-gray-800 text-sm font-medium">
            Buy Medicines
          </a>
          <a href="#" className="px-4 py-4 text-gray-800 text-sm font-medium">
            Find Doctors
          </a>
          <a href="#" className="px-4 py-4 text-gray-800 text-sm font-medium">
            Lab Tests
          </a>
          <a href="#" className="px-4 py-4 text-gray-800 text-sm font-medium">
            Circle Membership
          </a>
          <a href="#" className="px-4 py-4 text-gray-800 text-sm font-medium">
            Health Records
          </a>
          <a href="#" className="px-4 py-4 text-gray-800 text-sm font-medium">
            Diabetes Reversal
          </a>
          <div className="px-4 py-4 text-gray-800 text-sm font-medium flex items-center">
            Buy Insurance
            <span className="ml-1 text-xs bg-green-100 text-green-800 px-1 rounded">
              New
            </span>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm">
          <a href="#" className="text-blue-600">
            Home
          </a>
          <ChevronRight className="h-3 w-3 mx-1 text-gray-500" />
          <a href="#" className="text-blue-600">
            Doctors
          </a>
          <ChevronRight className="h-3 w-3 mx-1 text-gray-500" />
          <span className="text-gray-600">General Physicians</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 flex">
        {/* Filters Sidebar */}
        <div className="w-1/4 pr-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Filters</h3>
            <button 
              className="text-blue-600 text-sm"
              onClick={clearAllFilters}
            >
              Clear All
            </button>
          </div>

          <button className="w-full border border-blue-600 text-blue-600 rounded py-2 px-4 mb-6 text-sm">
            Show Doctors Near Me
          </button>

          {/* Mode of Consult */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Mode of Consult</h4>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="hospitalVisit"
                className="mr-2 h-4 w-4 text-blue-600"
                checked={selectedFilters.modeOfConsult.hospitalVisit}
                onChange={() =>
                  handleFilterChange("modeOfConsult", "hospitalVisit")
                }
              />
              <label htmlFor="hospitalVisit" className="text-sm">
                Hospital Visit
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="onlineConsult"
                className="mr-2 h-4 w-4 text-blue-600"
                checked={selectedFilters.modeOfConsult.onlineConsult}
                onChange={() =>
                  handleFilterChange("modeOfConsult", "onlineConsult")
                }
              />
              <label htmlFor="onlineConsult" className="text-sm">
                Online Consult
              </label>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Experience (In Years)</h4>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="exp0-5"
                className="mr-2 h-4 w-4 text-blue-600"
                checked={selectedFilters.experience["0-5"]}
                onChange={() => handleFilterChange("experience", "0-5")}
              />
              <label htmlFor="exp0-5" className="text-sm">
                0-5
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="exp6-10"
                className="mr-2 h-4 w-4 text-blue-600"
                checked={selectedFilters.experience["6-10"]}
                onChange={() => handleFilterChange("experience", "6-10")}
              />
              <label htmlFor="exp6-10" className="text-sm">
                6-10
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="exp11-16"
                className="mr-2 h-4 w-4 text-blue-600"
                checked={selectedFilters.experience["11-16"]}
                onChange={() => handleFilterChange("experience", "11-16")}
              />
              <label htmlFor="exp11-16" className="text-sm">
                11-16
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="exp17+"
                className="mr-2 h-4 w-4 text-blue-600"
                checked={selectedFilters.experience["17+"]}
                onChange={() => handleFilterChange("experience", "17+")}
              />
              <label htmlFor="exp17+" className="text-sm">
                17+
              </label>
            </div>
          </div>

          {/* Fees */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Fees (In Rupees)</h4>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="fee100-500"
                className="mr-2 h-4 w-4 text-blue-600"
                checked={selectedFilters.fees["100-500"]}
                onChange={() => handleFilterChange("fees", "100-500")}
              />
              <label htmlFor="fee100-500" className="text-sm">
                100-500
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="fee500-1000"
                className="mr-2 h-4 w-4 text-blue-600"
                checked={selectedFilters.fees["500-1000"]}
                onChange={() => handleFilterChange("fees", "500-1000")}
              />
              <label htmlFor="fee500-1000" className="text-sm">
                500-1000
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="fee1000+"
                className="mr-2 h-4 w-4 text-blue-600"
                checked={selectedFilters.fees["1000+"]}
                onChange={() => handleFilterChange("fees", "1000+")}
              />
              <label htmlFor="fee1000+" className="text-sm">
                1000+
              </label>
            </div>
          </div>

          {/* Language */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Language</h4>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="english"
                className="mr-2 h-4 w-4 text-blue-600"
                checked={selectedFilters.language.english}
                onChange={() => handleFilterChange("language", "english")}
              />
              <label htmlFor="english" className="text-sm">
                English
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="hindi"
                className="mr-2 h-4 w-4 text-blue-600"
                checked={selectedFilters.language.hindi}
                onChange={() => handleFilterChange("language", "hindi")}
              />
              <label htmlFor="hindi" className="text-sm">
                Hindi
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="telugu"
                className="mr-2 h-4 w-4 text-blue-600"
                checked={selectedFilters.language.telugu}
                onChange={() => handleFilterChange("language", "telugu")}
              />
              <label htmlFor="telugu" className="text-sm">
                Telugu
              </label>
            </div>
            <button className="text-blue-600 text-sm">+10 More</button>
          </div>

          {/* Facility */}
          <div>
            <h4 className="font-medium mb-3">Facility</h4>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="apolloHospital"
                className="mr-2 h-4 w-4 text-blue-600"
                checked={selectedFilters.facility.apolloHospital}
                onChange={() => handleFilterChange("facility", "apolloHospital")}
              />
              <label htmlFor="apolloHospital" className="text-sm">
                Apollo Hospital
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="otherClinics"
                className="mr-2 h-4 w-4 text-blue-600"
                checked={selectedFilters.facility.otherClinics}
                onChange={() => handleFilterChange("facility", "otherClinics")}
              />
              <label htmlFor="otherClinics" className="text-sm">
                Other Clinics
              </label>
            </div>
          </div>
        </div>

        {/* Doctor Listings */}
        <div className="w-3/4">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">
              Consult General Physicians Online - Internal Medicine Specialists
              <div className="text-gray-600 text-sm font-normal">
                ({filteredDoctors.length} doctors)
              </div>
            </h2>

            <div className="relative">
              <select className="appearance-none border rounded-md pl-3 pr-10 py-2 text-sm">
                <option>Relevance</option>
                <option>Experience: High to Low</option>
                <option>Fees: Low to High</option>
                <option>Fees: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Doctor Listings */}
            <div className="col-span-8">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div key={doctor.id} className="border rounded-md mb-4 p-4">
                    <div className="flex">
                      <div className="mr-4">
                        <img
                          src={doctor.profile}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium flex items-center">
                              {doctor.name}
                              <Info className="ml-1 h-4 w-4 text-gray-400" />
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {doctor.specialization}
                            </p>
                            <div className="flex flex-row gap-3 items-center">
                              <p className="text-blue-600 text-md mt-1">
                                {doctor.experience}
                              </p>
                              <p className="text-blue-600 text-md mt-1">
                                {doctor.qualifications}
                              </p>
                            </div>

                            <p className="text-gray-600 text-sm">
                              {doctor.biography}
                            </p>
                          </div>

                          <div className="text-right">
                            {doctor.timeSlots && (
                              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mb-2">
                                DOCTOR OF THE HOUR
                              </span>
                            )}
                            <div className="text-lg font-bold">
                              Rs. {doctor.consultationFee}
                            </div>
                          </div>
                        </div>

                        <div className="mt-2">
                          <div className="flex flex-row gap-3">
                            <p className="text-gray-600 text-sm">
                              {doctor.location}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {doctor.clinicName}
                            </p>
                          </div>
                          {doctor.rating && (
                            <div className="flex items-center mt-1 text-xs text-green-600">
                              <div className="mr-1">
                                <Check className="h-3 w-3" />
                              </div>
                              <span>{doctor.rating}</span>
                              <span className="text-gray-600 ml-1">
                                {doctor.patients}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="mt-3">
                          <button className="w-full bg-white border border-blue-600 text-blue-600 rounded-md py-2 text-sm font-medium">
                            {doctor.availableDays ? (
                              <>
                                Consult Online
                                <div className="text-xs font-normal">
                                  Available in {doctor.timeSlots} minutes
                                </div>
                              </>
                            ) : (
                              "Consult Online"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No doctors match your filter criteria.</p>
                  <button 
                    className="mt-4 text-blue-600 hover:underline"
                    onClick={clearAllFilters}
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Need Help Banner */}
            <div className="col-span-4">
              <div className="bg-blue-900 text-white rounded-lg p-6">
                <div className="mb-4">
                  <img
                    src="https://images.apollo247.in/images/doctor-listing/consult_doctor.png?tr=q-80,f-webp,w-200,dpr-1,c-at_max"
                    alt="Doctors"
                    className="w-full h-24 object-cover rounded"
                  />
                </div>
                <h3 className="font-medium mb-2">
                  Need help consult the right doctor?
                </h3>
                <p className="text-sm mb-4">
                  Call +91-8040245807 to book instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}