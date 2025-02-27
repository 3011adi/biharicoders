'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { FiMail, FiLock, FiUser, FiPhone, FiTool, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    service: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  // Refs for animation targets
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const roleSelectionRef = useRef(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Calculate password strength if password field is modified
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;
    setPasswordStrength(strength);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with loading state
    setTimeout(() => {
      gsap.to(formRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setIsLoading(false);
          
          if (isRegistering) {
            alert('Registration successful!');
          } else {
            alert('Login successful!');
          }
          
          router.push(userType === 'provider' ? '/provider-dashboard' : '/customer-dashboard');
        }
      });
    }, 1500);
  };

  // Select user type with animation
  const selectUserType = (type) => {
    gsap.to(roleSelectionRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setUserType(type);
      }
    });
  };

  // Return to role selection with animation
  const resetUserType = () => {
    gsap.to(formRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setUserType('');
      }
    });
  };

  // Toggle between login and register with animation
  const toggleRegistrationMode = () => {
    gsap.to(formRef.current, {
      y: 10,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setIsRegistering(!isRegistering);
        gsap.fromTo(formRef.current, 
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, delay: 0.1 }
        );
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
    
    if (!userType) {
      tl.fromTo(roleSelectionRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        "-=0.2"
      );
    } else {
      tl.fromTo(formRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
        "-=0.2"
      );
    }
  }, []);

  // Animate form fields when userType changes
  useEffect(() => {
    if (userType) {
      gsap.fromTo(formRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.2 }
      );
      
      gsap.fromTo(".form-field",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, delay: 0.3 }
      );
    } else if (roleSelectionRef.current) {
      gsap.fromTo(roleSelectionRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 }
      );
    }
  }, [userType, isRegistering]);

  // Service types offered
  const serviceTypes = ['Plumber', 'Carpenter', 'Electrician', 'Painter', 'Cleaner', 'Other'];

  // Get password strength color and label
  const getPasswordStrengthInfo = () => {
    switch(passwordStrength) {
      case 0: return { color: 'bg-gray-200', label: 'Very Weak' };
      case 1: return { color: 'bg-red-500', label: 'Weak' };
      case 2: return { color: 'bg-yellow-500', label: 'Fair' };
      case 3: return { color: 'bg-blue-500', label: 'Good' };
      case 4: return { color: 'bg-green-500', label: 'Strong' };
      default: return { color: 'bg-gray-200', label: '' };
    }
  };

  const strengthInfo = getPasswordStrengthInfo();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+')]"></div>
      </div>
      
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">BC</span>
          </div>
          <h2 className="text-white text-xl font-bold">BiharCoders</h2>
        </div>
      </div>
      
      <div 
        ref={containerRef} 
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300 border border-indigo-50 backdrop-blur-sm bg-opacity-95"
      >
        <h1 
          ref={headingRef}
          className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
        >
          {isRegistering ? 'Create an Account' : 'Welcome Back'}
        </h1>
        
        {!userType ? (
          <div ref={roleSelectionRef} className="space-y-8">
            <h2 className="text-xl text-center mb-6 text-gray-700">I am a:</h2>
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => selectUserType('provider')}
                className="py-6 px-6 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center"
              >
                <FiTool className="text-3xl mb-2" />
                <span className="font-medium">Service Provider</span>
              </button>
              <button
                onClick={() => selectUserType('customer')}
                className="py-6 px-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center"
              >
                <FiUser className="text-3xl mb-2" />
                <span className="font-medium">Customer</span>
              </button>
            </div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div className="text-sm font-medium bg-indigo-50 p-3 rounded-lg mb-4 form-field flex items-center justify-between">
              <div>
                <span className="text-gray-700">Selected Role:</span>
                <span className="font-bold ml-2 text-indigo-700">
                  {userType === 'provider' ? 'Service Provider' : 'Customer'}
                </span>
              </div>
              <button 
                type="button" 
                onClick={resetUserType}
                className="text-indigo-600 hover:text-indigo-800 transition-colors text-sm bg-white py-1 px-3 rounded-md shadow-sm"
              >
                Change
              </button>
            </div>

            {isRegistering && (
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div className="form-field">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                  placeholder="email@example.com"
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                  placeholder="••••••••"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 
                    <FiEyeOff className="text-gray-400 hover:text-gray-600" /> : 
                    <FiEye className="text-gray-400 hover:text-gray-600" />
                  }
                </div>
              </div>
              
              {isRegistering && formData.password && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div className={`h-1.5 rounded-full ${strengthInfo.color}`} style={{ width: `${passwordStrength * 25}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Password strength: {strengthInfo.label}</p>
                </div>
              )}
            </div>

            {isRegistering && (
              <div className="form-field">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
            )}

            {isRegistering && userType === 'provider' && (
              <div className="form-field">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Service Type
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiTool className="text-gray-400" />
                  </div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                    required
                  >
                    <option value="">Select a service</option>
                    {serviceTypes.map((service) => (
                      <option key={service} value={service.toLowerCase()}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {!isRegistering && (
              <div className="flex items-center justify-between form-field">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${userType === 'provider' ? 'bg-gradient-to-r from-indigo-600 to-blue-500' : 'bg-gradient-to-r from-purple-600 to-pink-500'} text-white py-3 px-4 rounded-lg hover:opacity-95 transform hover:scale-[1.01] transition-all duration-300 font-medium shadow-md form-field flex items-center justify-center`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                isRegistering ? 'Create Account' : 'Sign In'
              )}
            </button>

            <div className="relative form-field">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 form-field">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all"
              >
                <FcGoogle className="text-xl mr-2" />
                Google
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all"
              >
                <FaFacebook className="text-xl mr-2 text-blue-600" />
                Facebook
              </button>
            </div>

            <div className="text-center mt-6 form-field">
              <button
                type="button"
                onClick={toggleRegistrationMode}
                className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
              >
                {isRegistering 
                  ? 'Already have an account? Login' 
                  : 'Don\'t have an account? Register'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}