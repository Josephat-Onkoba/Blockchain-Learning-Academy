"use client";

import React, { useState } from 'react';
import { FiSearch, FiFilter, FiArrowDown, FiArrowUp } from 'react-icons/fi';
import Link from 'next/link';

// Sample courses data
const coursesData = [
  {
    id: 1,
    title: 'Blockchain Fundamentals',
    instructor: 'Prof. Sarah Chen',
    organization: 'Tech University',
    price: 50,
    image: '/images/blockchain.jpg',
    rating: 4.8,
    students: 1245,
    duration: '6 weeks',
    chapters: 12,
    category: 'Blockchain',
    level: 'Beginner'
  },
  {
    id: 2,
    title: 'Smart Contract Development',
    instructor: 'Dr. Michael Rodriguez',
    organization: 'Blockchain Academy',
    price: 75,
    image: '/images/smart-contracts.jpg',
    rating: 4.7,
    students: 982,
    duration: '8 weeks',
    chapters: 16,
    category: 'Development',
    level: 'Intermediate'
  },
  {
    id: 3,
    title: 'DeFi Principles and Applications',
    instructor: 'Alex Thompson',
    organization: 'FinTech Institute',
    price: 60,
    image: '/images/defi.jpg',
    rating: 4.9,
    students: 1567,
    duration: '5 weeks',
    chapters: 10,
    category: 'Finance',
    level: 'Intermediate'
  }
];

// Filter options
const categories = ['All', 'Blockchain', 'Development', 'Finance', 'Security', 'Art & Design'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const sortOptions = ['Most Popular', 'Highest Rated', 'Newest', 'Price: Low to High', 'Price: High to Low'];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Most Popular');
  const [showFilters, setShowFilters] = useState(false);

  // Filter courses based on search term, category, and level
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Sort filtered courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (selectedSort) {
      case 'Most Popular':
        return b.students - a.students;
      case 'Highest Rated':
        return b.rating - a.rating;
      case 'Newest':
        return 0; // We don't have date info in our mock data
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section */}
        <div className="bg-gray-900 rounded-xl px-6 py-10 mb-8 text-center shadow-md border border-gray-800">
          <h1 className="text-3xl font-bold text-white mb-4">Browse Our Courses</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover courses from accredited instructors and institutions. 
            Use MyTokens to access content and participate in discussions.
          </p>
        </div>

        {/* Search and filters */}
        <div className="bg-gray-900 rounded-lg shadow-md p-4 mb-8 border border-gray-800">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses or instructors"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort dropdown */}
            <div className="relative w-full md:w-48">
              <label htmlFor="sort" className="sr-only">Sort</label>
              <select
                id="sort"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-800 text-white"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Filter toggle button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiFilter className="mr-2" />
              Filters
              {showFilters ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />}
            </button>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-800 text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Level filter */}
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-300 mb-1">
                  Level
                </label>
                <select
                  id="level"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-800 text-white"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-gray-400">
            Showing {sortedCourses.length} {sortedCourses.length === 1 ? 'course' : 'courses'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {selectedLevel !== 'All' && ` for ${selectedLevel} level`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedCourses.map(course => (
            <div key={course.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:transform hover:scale-105 bg-gray-900 h-full border border-gray-800">
              <div className="flex-shrink-0 h-48 w-full relative">
                <div className="h-full w-full bg-gradient-to-r from-blue-900 to-blue-600 flex items-center justify-center text-white">
                  <span className="text-2xl font-bold">{course.title.substring(0, 2).toUpperCase()}</span>
                </div>
                <div className="absolute top-0 right-0 m-2 bg-blue-600 text-white px-2 py-1 text-xs font-bold rounded">
                  {course.price} MyTokens
                </div>
              </div>
              
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex-1">
                  <Link href={`/courses/${course.id}`}>
                    <h3 className="text-xl font-semibold text-white hover:text-blue-400">{course.title}</h3>
                  </Link>
                  
                  <div className="mt-2 flex items-center">
                    <p className="text-sm text-gray-300">{course.instructor}</p>
                  </div>
                  
                  <p className="text-xs text-gray-400">{course.organization}</p>
                  
                  <div className="mt-3 flex space-x-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{course.duration}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{course.chapters} chapters</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-300 ml-1">{course.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">{course.students} students</span>
                  </div>
                  
                  <div className="mt-4">
                    <Link
                      href={`/courses/${course.id}`}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {sortedCourses.length === 0 && (
          <div className="text-center py-12 bg-gray-900 rounded-lg shadow-md border border-gray-800">
            <h3 className="text-lg font-medium text-white mb-2">No courses found</h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}