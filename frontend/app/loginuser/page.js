'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { FiPhone, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs for animation targets
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const phoneFormRef = useRef(null);
  const otpFormRef = useRef(null);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Handle phone number input change
  const handlePhoneChange = (e) => {
    // Only allow numbers and limit to 10 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(value);
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow single digit number
    if (value && !/^\d$/.test(value)) return;
    
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    
    // Auto focus to next input
    if (value && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    }
  };

  // Handle key press for backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  // Submit phone number
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) return;
    
    setIsLoading(true);
    
    // Simulate API call with loading state
    setTimeout(() => {
      gsap.to(phoneFormRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setIsLoading(false);
          setOtpSent(true);
          startResendTimer();
          
          // Animate OTP form in
          setTimeout(() => {
            gsap.fromTo(otpFormRef.current,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5 }
            );
            // Focus on first OTP field
            otpRefs[0].current.focus();
          }, 100);
        }
      });
    }, 1500);
  };

  // Submit OTP code
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otpCode.join('').length !== 4) return;
    
    setIsLoading(true);
    
    // Simulate API call with loading state
    setTimeout(() => {
      gsap.to(otpFormRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setIsLoading(false);
          alert('Login successful!');
          router.push('/search');
        }
      });
    }, 1500);
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    
    // Simulate API call with loading state
    setTimeout(() => {
      setIsLoading(false);
      setOtpCode(['', '', '', '']);
      startResendTimer();
      alert('OTP resent successfully!');
      // Focus on first OTP field
      otpRefs[0].current.focus();
    }, 1000);
  };

  // Start resend timer
  const startResendTimer = () => {
    setResendTimer(30);
  };

  // Handle resend timer countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    
    const intervalId = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [resendTimer]);

  // Format phone display with country code
  const formattedPhone = phoneNumber ? `+91 ${phoneNumber}` : '';

  // Go back to phone input
  const goBackToPhone = () => {
    gsap.to(otpFormRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setOtpSent(false);
        setOtpCode(['', '', '', '']);
        
        // Animate phone form back in
        setTimeout(() => {
          gsap.fromTo(phoneFormRef.current,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }
          );
        }, 100);
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
    
    if (!otpSent) {
      tl.fromTo(phoneFormRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
        "-=0.2"
      );
    } else {
      tl.fromTo(otpFormRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
        "-=0.2"
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4 relative overflow-hidden">
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
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300 border border-indigo-50 backdrop-blur-sm bg-opacity-95"
      >
        <h1 
          ref={headingRef}
          className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text"
        >
          {otpSent ? 'Verify Your Phone' : 'Welcome Back'}
        </h1>
        
        {!otpSent ? (
          <form ref={phoneFormRef} onSubmit={handlePhoneSubmit} className="space-y-6">
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
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                  placeholder="Enter 10 digit number"
                />
                {phoneNumber && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-sm text-gray-400">+91</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">We'll send a verification code to this number</p>
            </div>

            <button
              type="submit"
              disabled={isLoading || phoneNumber.length !== 10}
              className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:opacity-95 transform hover:scale-[1.01] transition-all duration-300 font-medium shadow-md flex items-center justify-center ${phoneNumber.length !== 10 ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending OTP...
                </div>
              ) : (
                'Get OTP'
              )}
            </button>



            
          </form>
        ) : (
          <div ref={otpFormRef} className="space-y-6">
            <div className="text-center mb-4">
              <p className="text-gray-600">We've sent a 4-digit OTP to</p>
              <p className="font-bold text-gray-800">{formattedPhone}</p>
            </div>
            
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-4 text-center">
                  Enter verification code
                </label>
                <div className="flex justify-center gap-3">
                  {otpCode.map((digit, index) => (
                    <input
                      key={index}
                      ref={otpRefs[index]}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      maxLength={1}
                      className="w-12 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      required
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-center mb-6">
                {resendTimer > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend OTP in <span className="font-bold">{resendTimer}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors text-sm"
                  >
                    Didn't receive code? Resend
                  </button>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isLoading || otpCode.join('').length !== 4}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:opacity-95 transform hover:scale-[1.01] transition-all duration-300 font-medium shadow-md flex items-center justify-center ${otpCode.join('').length !== 4 ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </div>
                ) : (
                  'Verify & Continue'
                )}
              </button>
            </form>
            
            <div className="text-center">
              <button
                type="button"
                onClick={goBackToPhone}
                className="text-gray-500 hover:text-gray-700 hover:underline transition-colors text-sm flex items-center justify-center mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Change phone number
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}