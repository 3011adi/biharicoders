'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

export default function ServiceProviderLogin() {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Registration form fields
  const [fullName, setFullName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [service, setService] = useState('');
  
  // Refs for animation targets
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);

  // Service categories
  const serviceCategories = [
    "Plumbing", 
    "Electrical", 
    "Carpentry", 
    "Painting",
    "Cleaning",
    "Appliance Repair",
    "Gardening",
    "HVAC",
    "Pest Control",
    "Home Security"
  ];

  // Handle login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with loading state
    setTimeout(() => {
      setIsLoading(false);
      router.push('/provider-dashboard');
    }, 1500);
  };

  // Handle registration submission
  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (registerPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with loading state
    setTimeout(() => {
      setIsLoading(false);
      alert('Registration successful! You can now access your provider dashboard.');
      router.push('/provider-dashboard');
    }, 2000);
  };

  // Toggle between login and register modes
  const toggleMode = () => {
    gsap.to(formRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      onComplete: () => {
        setIsLoginMode(!isLoginMode);
        gsap.to(formRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3
        });
      }
    });
  };

  // Initial page load animation
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
    
    tl.fromTo(headingRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.4"
    );
    
    tl.fromTo(formRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      "-=0.2"
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+')]"></div>
      </div>
      
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">LS</span>
          </div>
          <h2 className="text-white text-xl font-bold">LocalServices</h2>
        </div>
      </div>
      
      <div 
        ref={containerRef} 
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300 border border-blue-50 backdrop-blur-sm bg-opacity-95"
      >
        <h1 
          ref={headingRef}
          className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text"
        >
          {isLoginMode ? 'Service Provider Login' : 'Join as Service Provider'}
        </h1>
        
        <div ref={formRef}>
          {isLoginMode ? (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="form-field">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                    placeholder="Enter your password"
                    minLength={6}
                  />
                </div>
                <div className="flex justify-end mt-1">
                  <button type="button" className="text-xs text-blue-600 hover:underline">
                    Forgot Password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:opacity-95 transform hover:scale-[1.01] transition-all duration-300 font-medium shadow-md flex items-center justify-center ${(!email || !password) ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </button>

              
            </form>
          ) : (
            <form onSubmit={handleRegistrationSubmit} className="space-y-5">
              <div className="form-field">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              
              <div className="form-field">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              
              <div className="form-field">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Service Category
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select a service category</option>
                  {serviceCategories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-field">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                    placeholder="Create a password (min. 6 characters)"
                    minLength={6}
                  />
                </div>
              </div>
              
              <div className="form-field">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-10 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      confirmPassword && registerPassword !== confirmPassword 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    required
                    placeholder="Confirm your password"
                    minLength={6}
                  />
                </div>
                {confirmPassword && registerPassword !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>
              
              
              
              <button
                type="submit"
                disabled={isLoading || !fullName || !registerEmail || !service || !registerPassword || !confirmPassword || registerPassword !== confirmPassword}
                className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:opacity-95 transform hover:scale-[1.01] transition-all duration-300 font-medium shadow-md flex items-center justify-center ${
                  (!fullName || !registerEmail || !service || !registerPassword || !confirmPassword || registerPassword !== confirmPassword) 
                    ? 'opacity-70 cursor-not-allowed' 
                    : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  'Register'
                )}
              </button>
            </form>
          )}

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={toggleMode}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors text-sm"
            >
              {isLoginMode ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-xs">
              Looking for customer login? <Link href="/loginadmin" className="text-blue-600 hover:underline">Click here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
