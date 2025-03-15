"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiBook, FiMessageSquare, FiDollarSign, FiUser } from "react-icons/fi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses", icon: <FiBook /> },
    { name: "Forums", href: "/forum", icon: <FiMessageSquare /> },
    { name: "MyTokens", href: "/tokens", icon: <FiDollarSign /> },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-white">EduChain</span>
                <span className="ml-2 text-sm bg-blue-600 text-white px-2 py-1 rounded-md">BETA</span>
              </Link>
            </div>
            
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive(link.href)
                      ? "border-blue-500 text-white"
                      : "border-transparent text-gray-300 hover:border-gray-300 hover:text-white"
                  }`}
                >
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="hidden md:flex items-center">
            <div className="flex-shrink-0">
              <Link
                href="/login"
                className="relative inline-flex items-center mr-3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
              >
                Register
              </Link>
            </div>
          </div>
          
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive(link.href)
                    ? "bg-gray-900 border-blue-500 text-white"
                    : "border-transparent text-gray-300 hover:bg-gray-700 hover:border-gray-300 hover:text-white"
                }`}
              >
                <div className="flex items-center">
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  {link.name}
                </div>
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <FiUser className="h-10 w-10 rounded-full bg-gray-700 p-2 text-gray-300" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">Guest User</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                href="/login"
                className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}