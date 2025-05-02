'use client'
import { useState } from 'react';
import { Search, MapPin, ChevronDown, Check, Star, ChevronRight, Info } from 'lucide-react';

export default function ApolloClone() {
  const [selectedFilters, setSelectedFilters] = useState({
    modeOfConsult: {
      hospitalVisit: true,
      onlineConsult: true
    },
    experience: {},
    fees: {},
    language: {},
    facility: {}
  });

  const handleFilterChange = (category, filter) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [filter]: !prev[category][filter]
      }
    }));
  };

  const doctors = [
    {
      id: 1,
      name: "Dr. Suraja Nutulapati",
      image: "https://via.placeholder.com/70",
      title: "General Physician/ Internal Medicine Specialist",
      experience: "10 YEARS • MBBS, MD (INTERNAL MEDICINE)",
      location: "Apollo 24/7 Virtual Clinic - Telangana Hyderabad",
      fee: "₹499",
      isHourDoctor: true,
      available: false
    },
    {
      id: 2,
      name: "Dr. Vasanthasree Nair",
      image: "https://via.placeholder.com/70",
      title: "General Practitioner",
      experience: "15 YEARS • MBBS",
      location: "Angamaly",
      location2: "Apollo 24/7 Virtual Clinic - Kerala, Angamaly",
      rating: "97%",
      patients: "(375+ Patients)",
      fee: "₹459",
      cashback: "₹69 Cashback",
      available: true,
      availableTime: "20"
    },
    {
      id: 3,
      name: "Dr. Siri Nallapu",
      image: "https://via.placeholder.com/70",
      title: "General Practitioner",
      experience: "5 YEARS • MBBS",
      location: "Hyderabad",
      location2: "Apollo 24/7 Virtual Clinic - Telangana, Hyderabad",
      fee: "₹399",
      cashback: "₹60 Cashback",
      available: true,
      availableTime: "22"
    },
    {
      id: 4,
      name: "Dr. Divya Lekha Gupta",
      image: "https://via.placeholder.com/70",
      title: "General Practitioner",
      experience: "10 YEARS • MBBS, MD (PATHOLOGY)",
      location: "Visakhapatnam",
      fee: "₹489",
      cashback: "₹73 Cashback",
      available: false
    }
  ];

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://via.placeholder.com/120x50" alt="Apollo 24/7" className="h-10 mr-6" />
            
            <div className="flex items-center text-gray-700 mr-4">
              <MapPin className="h-5 w-5 mr-1" />
              <span className="text-sm">Select Location</span>
            </div>
            
            <div className="flex items-center text-gray-800">
              <span className="text-sm mr-1">Select Address</span>
              <ChevronDown className="h-4 w-4" />
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
      <div className="container mx-auto px-4 border-b">
        <div className="flex">
          <a href="#" className="px-4 py-4 text-gray-800 text-sm font-medium">Buy Medicines</a>
          <a href="#" className="px-4 py-4 text-gray-800 text-sm font-medium">Find Doctors</a>
          <a href="#" className="px-4 py-4 text-gray-800 text-sm font-medium">Lab Tests</a>
          <a href="#" className="px-4 py-4 text-gray-800 text-sm font-medium">Circle Membership</a>
          <a href="#" className="px-4 py-4 text-gray-800 text-sm font-medium">Health Records</a>
          <a href="#" className="px-4 py-4 text-gray-800 text-sm font-medium">Diabetes Reversal</a>
          <div className="px-4 py-4 text-gray-800 text-sm font-medium flex items-center">
            Buy Insurance
            <span className="ml-1 text-xs bg-green-100 text-green-800 px-1 rounded">New</span>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm">
          <a href="#" className="text-blue-600">Home</a>
          <ChevronRight className="h-3 w-3 mx-1 text-gray-500" />
          <a href="#" className="text-blue-600">Doctors</a>
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
            <button className="text-blue-600 text-sm">Clear All</button>
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
                onChange={() => handleFilterChange('modeOfConsult', 'hospitalVisit')}
              />
              <label htmlFor="hospitalVisit" className="text-sm">Hospital Visit</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="onlineConsult" 
                className="mr-2 h-4 w-4 text-blue-600" 
                checked={selectedFilters.modeOfConsult.onlineConsult}
                onChange={() => handleFilterChange('modeOfConsult', 'onlineConsult')}
              />
              <label htmlFor="onlineConsult" className="text-sm">Online Consult</label>
            </div>
          </div>
          
          {/* Experience */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Experience (In Years)</h4>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="exp0-5" className="mr-2 h-4 w-4 text-blue-600" />
              <label htmlFor="exp0-5" className="text-sm">0-5</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="exp6-10" className="mr-2 h-4 w-4 text-blue-600" />
              <label htmlFor="exp6-10" className="text-sm">6-10</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="exp11-16" className="mr-2 h-4 w-4 text-blue-600" />
              <label htmlFor="exp11-16" className="text-sm">11-16</label>
            </div>
            <button className="text-blue-600 text-sm">+1 More</button>
          </div>
          
          {/* Fees */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Fees (In Rupees)</h4>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="fee100-500" className="mr-2 h-4 w-4 text-blue-600" />
              <label htmlFor="fee100-500" className="text-sm">100-500</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="fee500-1000" className="mr-2 h-4 w-4 text-blue-600" />
              <label htmlFor="fee500-1000" className="text-sm">500-1000</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="fee1000+" className="mr-2 h-4 w-4 text-blue-600" />
              <label htmlFor="fee1000+" className="text-sm">1000+</label>
            </div>
          </div>
          
          {/* Language */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Language</h4>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="english" className="mr-2 h-4 w-4 text-blue-600" />
              <label htmlFor="english" className="text-sm">English</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="hindi" className="mr-2 h-4 w-4 text-blue-600" />
              <label htmlFor="hindi" className="text-sm">Hindi</label>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="telugu" className="mr-2 h-4 w-4 text-blue-600" />
              <label htmlFor="telugu" className="text-sm">Telugu</label>
            </div>
            <button className="text-blue-600 text-sm">+10 More</button>
          </div>
          
          {/* Facility */}
          <div>
            <h4 className="font-medium mb-3">Facility</h4>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="apolloHospital" className="mr-2 h-4 w-4 text-blue-600" />
              <label htmlFor="apolloHospital" className="text-sm">Apollo Hospital</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="otherClinics" className="mr-2 h-4 w-4 text-blue-600" />
              <label htmlFor="otherClinics" className="text-sm">Other Clinics</label>
            </div>
          </div>
        </div>
        
        {/* Doctor Listings */}
        <div className="w-3/4">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">
              Consult General Physicians Online - Internal Medicine Specialists
              <div className="text-gray-600 text-sm font-normal">(766 doctors)</div>
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
              {doctors.map(doctor => (
                <div key={doctor.id} className="border rounded-md mb-4 p-4">
                  <div className="flex">
                    <div className="mr-4">
                      <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium flex items-center">
                            {doctor.name}
                            <Info className="ml-1 h-4 w-4 text-gray-400" />
                          </h3>
                          <p className="text-gray-600 text-sm">{doctor.title}</p>
                          <p className="text-blue-600 text-xs mt-1">{doctor.experience}</p>
                        </div>
                        
                        <div className="text-right">
                          {doctor.isHourDoctor && (
                            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mb-2">
                              DOCTOR OF THE HOUR
                            </span>
                          )}
                          <div className="text-lg font-bold">{doctor.fee}</div>
                          {doctor.cashback && (
                            <div className="text-xs text-orange-500 flex items-center justify-end">
                              <div className="h-2 w-2 rounded-full bg-orange-500 mr-1"></div>
                              {doctor.cashback}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-gray-600 text-sm">{doctor.location}</p>
                        {doctor.location2 && (
                          <p className="text-gray-600 text-sm">{doctor.location2}</p>
                        )}
                        
                        {doctor.rating && (
                          <div className="flex items-center mt-1 text-xs text-green-600">
                            <div className="mr-1">
                              <Check className="h-3 w-3" />
                            </div>
                            <span>{doctor.rating}</span>
                            <span className="text-gray-600 ml-1">{doctor.patients}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3">
                        <button className="w-full bg-white border border-blue-600 text-blue-600 rounded-md py-2 text-sm font-medium">
                          {doctor.available ? (
                            <>
                              Consult Online
                              <div className="text-xs font-normal">Available in {doctor.availableTime} minutes</div>
                            </>
                          ) : (
                            "Consult Online"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Need Help Banner */}
            <div className="col-span-4">
              <div className="bg-blue-900 text-white rounded-lg p-6">
                <div className="mb-4">
                  <img 
                    src="https://via.placeholder.com/150" 
                    alt="Doctors" 
                    className="w-full h-24 object-cover rounded"
                  />
                </div>
                <h3 className="font-medium mb-2">Need help consult the right doctor?</h3>
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