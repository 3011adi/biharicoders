"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchPage() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

   const serviceCategories = [
      { name: "Plumbing", icon: "🔧", description: "Fix leaks, installations, repairs" },
      { name: "Carpentry", icon: "🪚", description: "Furniture repair, installations, woodwork" },
      { name: "Electrical", icon: "⚡", description: "Wiring, fixtures, electrical repairs" },
      { name: "Cleaning", icon: "🧹", description: "Home cleaning, deep cleaning services" },
      { name: "Painting", icon: "🖌️", description: "Interior & exterior painting" },
      { name: "Gardening", icon: "🌱", description: "Lawn care, landscaping, gardening" }
    ];
  // Popular service categories for suggestions
  const popularServices = [
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Cleaning",
    "Painting",
    "Gardening",
    "Appliance Repair",
    "Pest Control"
  ];

  // Get user's current location
  const getUserLocation = () => {
    // Reset any previous errors
    setLocationError("");
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    
    setIsDetectingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Get the latitude and longitude
          const { latitude, longitude } = position.coords;
          
          // Use reverse geocoding to get a human-readable address
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          
          if (!response.ok) throw new Error("Could not fetch location data");
          
          const data = await response.json();
          
          // Extract location information
          let locationName = "";
          if (data) {
            const { city, locality, principalSubdivision, countryName } = data;
            // Try to get the most specific location first
            locationName = city || locality || "";
            // Add state/province if available
            if (principalSubdivision && principalSubdivision !== locationName) {
              locationName += locationName ? `, ${principalSubdivision}` : principalSubdivision;
            }
            // If we couldn't get a specific location, use coordinates
            if (!locationName) {
              locationName = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            }
          }
          
          setLocation(locationName || "Location detected");
        } catch (error) {
          console.error("Error getting location:", error);
          setLocationError("Failed to determine your location. Please enter manually.");
          // Still set approximate coordinates as a fallback
          setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`);
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsDetectingLocation(false);
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access denied. Please enable in your browser settings or enter manually.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable. Please enter manually.");
            break;
          case error.TIMEOUT:
            setLocationError("Location request timed out. Please try again or enter manually.");
            break;
          default:
            setLocationError("An error occurred while detecting location. Please enter manually.");
        }
      },
      // Set options with timeout and high accuracy
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!service.trim()) {
      alert("Please enter a service you're looking for");
      return;
    }
    
    if (!location.trim()) {
      alert("Please enter or detect your location");
      return;
    }
    
    // For now, we'll just log the search - in a real app you would:
    console.log(`Searching for ${service} in ${location}`);
    
    // You could redirect to results page with query parameters
    router.push(`/results?service=${encodeURIComponent(service)}&location=${encodeURIComponent(location)}`);
  };

  const selectPopularService = (serviceName) => {
    setService(serviceName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            LocalPro
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
            Find Local Services Near You
          </h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Input */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  What service are you looking for?
                </label>
                <input
                  type="text"
                  id="service"
                  placeholder="e.g. Plumber, Electrician, House Cleaning..."
                  className="w-full p-3 border border-blue-200 rounded-lg 
                            bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                            transition-all"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  required
                />
              </div>
              
              {/* Popular Services Chips */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Popular Services:
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularServices.map((serviceName) => (
                    <button
                      key={serviceName}
                      type="button"
                      onClick={() => selectPopularService(serviceName)}
                      className="px-4 py-2 bg-blue-50 text-blue-600 
                                rounded-full text-sm hover:bg-blue-100 
                                transition-colors border border-blue-100"
                    >
                      {serviceName}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Location Input */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Location
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="location"
                    placeholder="Enter your city or neighborhood"
                    className="w-full p-3 border border-blue-200 rounded-l-lg 
                              bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={isDetectingLocation}
                    required
                  />
                  <button
                    type="button"
                    onClick={getUserLocation}
                    className={`px-4 flex items-center justify-center border border-l-0 
                              border-blue-200 rounded-r-lg transition-colors
                              ${isDetectingLocation 
                                ? 'bg-blue-50 cursor-wait' 
                                : 'bg-white hover:bg-blue-50'}`}
                    disabled={isDetectingLocation}
                  >
                    {isDetectingLocation ? (
                      <div className="animate-spin h-5 w-5 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    ) : (
                      <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                {locationError && (
                  <p className="mt-1 text-sm text-red-600">{locationError}</p>
                )}
              </div>
              
              {/* Search Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium 
                          rounded-lg transition-colors focus:outline-none focus:ring-4 
                          focus:ring-blue-200 shadow-lg hover:shadow-xl"
                disabled={isDetectingLocation}
              >
                Search for Local Pros
              </button>
            </form>
          </div>
          
          <div className="mt-8 text-center text-gray-600">
            <p className="text-lg">
              Looking for trusted local professionals? <br className="md:hidden" />
              LocalPro connects you with verified service providers in your area.
            </p>
          </div>

         
        </div>

         {/* Services Section */}
         <div className="mt-24 mb-24">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {serviceCategories.map((service, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl 
                            transition-all duration-300 border border-blue-50 
                            hover:border-blue-200 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-blue-800">{service.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <a 
                    href={`/services/${service.name.toLowerCase()}`} 
                    className="text-blue-600 font-medium hover:text-blue-800 
                              flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Find a {service.name}
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
      </main>
    </div>
  );
}
