'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiCheck, FiAlertCircle } from 'react-icons/fi';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const router = useRouter();

  // Password strength indicators
  const passwordStrength = {
    minLength: formData.password.length >= 8,
    hasLower: /[a-z]/.test(formData.password),
    hasUpper: /[A-Z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSpecial: /[!@#$%^&*]/.test(formData.password)
  };

  const passwordStrengthScore = Object.values(passwordStrength).filter(Boolean).length;

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is being edited
    if (errors[name]) {
      const { [name]: removed, ...rest } = errors;
      setErrors(rest);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (passwordStrengthScore < 3) {
      newErrors.password = 'Password is too weak';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setGeneralError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, this would register the user with an API
      // If the email is already taken, we show an error
      if (formData.email === 'existing@example.com') {
        throw new Error('Email already in use');
      }
      
      // Mock successful registration
      router.push('/login?registered=true');
    } catch (err: unknown) {
      console.error('Registration error:', err);
      if (err instanceof Error) {
        setGeneralError(err.message || 'Registration failed. Please try again.');
      } else {
        setGeneralError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle wallet connect for registration
  const handleWalletConnect = async () => {
    setIsLoading(true);
    setGeneralError('');
    
    try {
      // Simulate connecting to wallet
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, this would connect to MetaMask or other wallets
      // and register using the EduChain Open Campus ID
      router.push('/login?registered=true');
    } catch (err: unknown) {
      console.error('Wallet connection error:', err);
      if (err instanceof Error) {
        setGeneralError(err.message || 'Wallet connection failed. Please try again.');
      } else {
        setGeneralError('Wallet connection failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Join the EduChain platform and start learning today
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-800">
          <div className="space-y-6">
            {/* Email Registration Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                  Full name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`bg-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-700 rounded-md text-white ${
                      errors.fullName ? 'border-red-500' : ''
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-700 rounded-md text-white ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`bg-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-700 rounded-md text-white ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                {errors.password ? (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                ) : (
                  <div className="mt-2">
                    <div className="flex items-center mb-1">
                      <div className="w-full bg-gray-700 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full ${
                            passwordStrengthScore === 0
                              ? 'bg-gray-700'
                              : passwordStrengthScore < 3
                              ? 'bg-red-500'
                              : passwordStrengthScore < 4
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${passwordStrengthScore * 20}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-400">
                        {passwordStrengthScore === 0
                          ? 'Empty'
                          : passwordStrengthScore < 3
                          ? 'Weak'
                          : passwordStrengthScore < 4
                          ? 'Medium'
                          : 'Strong'}
                      </span>
                    </div>
                    <div className="text-xs grid grid-cols-2 gap-1">
                      <div className={`flex items-center ${passwordStrength.minLength ? 'text-green-400' : 'text-gray-400'}`}>
                        {passwordStrength.minLength ? <FiCheck size={12} className="mr-1" /> : <FiAlertCircle size={12} className="mr-1" />}
                        <span>8+ characters</span>
                      </div>
                      <div className={`flex items-center ${passwordStrength.hasLower ? 'text-green-400' : 'text-gray-400'}`}>
                        {passwordStrength.hasLower ? <FiCheck size={12} className="mr-1" /> : <FiAlertCircle size={12} className="mr-1" />}
                        <span>Lowercase</span>
                      </div>
                      <div className={`flex items-center ${passwordStrength.hasUpper ? 'text-green-400' : 'text-gray-400'}`}>
                        {passwordStrength.hasUpper ? <FiCheck size={12} className="mr-1" /> : <FiAlertCircle size={12} className="mr-1" />}
                        <span>Uppercase</span>
                      </div>
                      <div className={`flex items-center ${passwordStrength.hasNumber ? 'text-green-400' : 'text-gray-400'}`}>
                        {passwordStrength.hasNumber ? <FiCheck size={12} className="mr-1" /> : <FiAlertCircle size={12} className="mr-1" />}
                        <span>Number</span>
                      </div>
                      <div className={`flex items-center ${passwordStrength.hasSpecial ? 'text-green-400' : 'text-gray-400'}`}>
                        {passwordStrength.hasSpecial ? <FiCheck size={12} className="mr-1" /> : <FiAlertCircle size={12} className="mr-1" />}
                        <span>Special character</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  Confirm password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`bg-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-700 rounded-md text-white ${
                      errors.confirmPassword ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-700 rounded bg-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeTerms" className={`font-medium ${errors.agreeTerms ? 'text-red-400' : 'text-gray-300'}`}>
                    I agree to the{' '}
                    <a href="#" className="text-blue-400 hover:text-blue-300">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-400 hover:text-blue-300">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              {/* General Error Message */}
              {generalError && (
                <div className="rounded-md bg-red-900 bg-opacity-25 p-4 border border-red-800">
                  <div className="text-sm text-red-400">{generalError}</div>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Registering...' : 'Create Account'}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or register with</span>
              </div>
            </div>

            {/* EduChain Open Campus ID Button */}
            <div>
              <button
                type="button"
                onClick={handleWalletConnect}
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                <Image 
                  src="/images/educhain-logo.svg" 
                  alt="EduChain"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span>Continue with Open Campus ID</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="text-sm text-center">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}