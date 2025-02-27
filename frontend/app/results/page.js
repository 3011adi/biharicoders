"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from 'next/dynamic';

// Import the map component with dynamic loading (no SSR) because Leaflet requires browser APIs
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
});

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service");
  const location = searchParams.get("location");
  
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [mapView, setMapView] = useState(false);

  useEffect(() => {
    // In a real application, this would be an API call to fetch results
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        // Simulating an API request with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data based on the search parameters with coordinates
        const mockResults = [
          {
            id: 1,
            name: "Professional Services",
            service: service,
            rating: 4.8,
            reviews: 124,
            image: "https://placehold.co/100",
            price: "₹500-₹1500",
            address: `Near ${location}`,
            distance: "2.3 km",
            coordinates: [28.6139, 77.2090] // Example coordinates for Delhi
          },
          {
            id: 2,
            name: "Expert Solutions",
            service: service,
            rating: 4.6,
            reviews: 89,
            image: "https://placehold.co/100",
            price: "₹450-₹1200",
            address: `Central ${location}`,
            distance: "3.1 km",
            coordinates: [28.6229, 77.2100] // Slightly different coordinates
          },
          {
            id: 3,
            name: "Quick Fix Services",
            service: service,
            rating: 4.5,
            reviews: 56,
            image: "https://placehold.co/100",
            price: "₹400-₹1000",
            address: `South ${location}`,
            distance: "4.2 km",
            coordinates: [28.6000, 77.2300] // Another location nearby
          }
        ];
        
        setResults(mockResults);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to load results. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (service && location) {
      fetchResults();
    } else {
      setError("Missing search parameters. Please specify both service and location.");
      setIsLoading(false);
    }
  }, [service, location]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            LocalPro
          </Link>
          <Link 
            href="/search" 
            className="text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 py-2 px-4 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/50"
          >
            New Search
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {service ? `${service} services` : "Services"} in {location || "your area"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Showing local professionals ready to help
            </p>
          </div>
          
          {/* View toggle buttons */}
          {!isLoading && !error && results.length > 0 && (
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <button 
                onClick={() => setMapView(false)}
                className={`px-4 py-2 text-sm rounded-md transition ${!mapView ? 
                  'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' : 
                  'text-gray-700 dark:text-gray-300'}`}
              >
                List
              </button>
              <button 
                onClick={() => setMapView(true)}
                className={`px-4 py-2 text-sm rounded-md transition ${mapView ? 
                  'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' : 
                  'text-gray-700 dark:text-gray-300'}`}
              >
                Map
              </button>
            </div>
          )}
        </div>
        
        {/* Results Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Searching for local professionals...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
              <Link href="/search" className="text-blue-600 dark:text-blue-400 hover:underline">
                Return to search
              </Link>
            </div>
          ) : mapView ? (
            // Map View
            <div className="h-[70vh] relative">
              <MapComponent 
                providers={results} 
                center={results.length > 0 ? results[0].coordinates : [20.5937, 78.9629]} 
              />
            </div>
          ) : (
            // List View
            <div className="space-y-6">
              {results.map(provider => (
                <div key={provider.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                      {/* Replace with actual Image component for production */}
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        {provider.service[0]}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{provider.name}</h2>
                      <span className="text-blue-600 dark:text-blue-400 font-medium">{provider.price}</span>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      {provider.service} specialist • {provider.distance} away
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400">
                        {"★".repeat(Math.floor(provider.rating))}
                        {provider.rating % 1 !== 0 && "☆"}
                        {"☆".repeat(5 - Math.ceil(provider.rating))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        ({provider.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {provider.address}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Contact
                      </button>
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
