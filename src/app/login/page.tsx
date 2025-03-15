'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiUser, FiLock, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      if (email === 'demo@example.com' && password === 'password') {
        // In a real implementation, this would store a token or session
        router.push('/courses');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err: unknown) {
      console.error('Login error:', err);
      if (err instanceof Error) {
        setError(err.message || 'Login failed. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate connecting to wallet and verifying
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, this would connect to MetaMask or other wallets
      // and verify the user's EduChain ID
      router.push('/courses');
    } catch (err: unknown) {
      console.error('Wallet login error:', err);
      if (err instanceof Error) {
        setError(err.message || 'Wallet connection failed. Please try again.');
      } else {
        setError('Wallet connection failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Sign in to EduChain</h2>
          <p className="mt-2 text-sm text-gray-400">
            Learn, earn, and connect with the blockchain-powered education platform
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-800">
          <div className="space-y-6">
            {/* Email/Password Login Form */}
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-700 rounded-md text-white"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

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
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-700 rounded-md text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-800"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                    Forgot your password?
                  </a>
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-900 bg-opacity-25 p-4 border border-red-800">
                  <div className="text-sm text-red-400">{error}</div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Sign in with Email'}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Wallet Connection Button */}
            <div>
              <button
                type="button"
                onClick={handleWalletLogin}
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                <Image 
                  src="/images/metamask-fox.svg" 
                  alt="MetaMask"
                  width={20}
                  height={20}
                  className="h-5 w-5 mr-2"
                />
                <span>Connect with EduChain Wallet</span>
              </button>
            </div>

            {/* Info text */}
            <div className="mt-6">
              <div className="relative">
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">
                    New to EduChain?{' '}
                    <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300">
                      Create an account
                    </Link>
                  </span>
                </div>
              </div>
            </div>

            {/* Demo account info */}
            <div className="mt-6 bg-gray-800 p-4 rounded-md text-sm text-gray-300 border border-gray-700">
              <p className="font-medium mb-1">Demo credentials:</p>
              <p>Email: demo@example.com</p>
              <p>Password: password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}