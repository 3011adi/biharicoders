'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle authentication/registration here
    console.log('Form submitted:', { userType, ...formData });
    
    // Redirect based on user type (this is a placeholder)
    if (isRegistering) {
      alert('Registration successful!');
    } else {
      alert('Login successful!');
    }
    
    router.push(userType === 'provider' ? '/provider-dashboard' : '/customer-dashboard');
  };

  const serviceTypes = ['Plumber', 'Carpenter', 'Electrician', 'Painter', 'Cleaner', 'Other'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isRegistering ? 'Create an Account' : 'Welcome Back'}
        </h1>
        
        {!userType ? (
          <div className="space-y-4">
            <h2 className="text-xl text-center mb-4">I am a:</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setUserType('provider')}
                className="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
              >
                Service Provider
              </button>
              <button
                onClick={() => setUserType('customer')}
                className="py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
              >
                Customer
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-sm font-medium text-gray-700 mb-2">
              Selected Role: 
              <span className="font-bold ml-2">
                {userType === 'provider' ? 'Service Provider' : 'Customer'}
              </span>
              <button 
                type="button" 
                onClick={() => setUserType('')}
                className="text-blue-500 ml-2 underline"
              >
                Change
              </button>
            </div>

            {isRegistering && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {isRegistering && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            )}

            {isRegistering && userType === 'provider' && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Service Type
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a service</option>
                  {serviceTypes.map((service) => (
                    <option key={service} value={service.toLowerCase()}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-blue-500 hover:underline"
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
