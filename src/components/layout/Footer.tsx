import React from "react";
import Link from "next/link";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">EduChain</span>
              <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-md">BETA</span>
            </div>
            <p className="mt-4 text-sm text-gray-300 max-w-md">
              Learn, earn, and connect on our blockchain-powered educational platform.
              Access courses with MyTokens and earn through community engagement.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <FiTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <FiGithub className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <FiLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/courses" className="text-base text-gray-300 hover:text-white">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-base text-gray-300 hover:text-white">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/tokens" className="text-base text-gray-300 hover:text-white">
                  Tokens
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/about" className="text-base text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-base text-gray-300 hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-300 hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} EduChain Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}