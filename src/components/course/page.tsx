'use client'

import React, { useState } from 'react';
import { FiSearch, FiFilter, FiArrowDown, FiArrowUp } from 'react-icons/fi';
import CourseCard from '@/components/course/CourseCard';

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
  },
  {
    id: 4,
    title: 'Cryptocurrency Trading Strategies',
    instructor: 'Jessica Wilson',
    organization: 'Crypto Trading School',
    price: 80,
    image: '/images/crypto-trading.jpg',
    rating: 4.6,
    students: 2341,
    duration: '4 weeks',
    chapters: 8,
    category: 'Finance',
    level: 'Advanced'
  },
  {
    id: 5,
    title: 'Blockchain Security Practices',
    instructor: 'Daniel Lee',
    organization: 'Security Institute',
    price: 65,
    image: '/images/blockchain-security.jpg',
    rating: 4.8,
    students: 876,
    duration: '7 weeks',
    chapters: 14,
    category: 'Security',
    level: 'Advanced'
  },
  {
    id: 6,
    title: 'NFT Creation and Marketing',
    instructor: 'Sophia Martinez',
    organization: 'Digital Arts Academy',
    price: 55,
    image: '/images/nft.jpg',
    rating: 4.5,
    students: 1432,
    duration: '5 weeks',
    chapters: 10,
    category: 'Art & Design',
    level: 'Beginner'
  }
];

// Filter options
const categories = ['All', 'Development', 'Design', 'Marketing']; // Example categories
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']; // Example levels
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
        <div className="bg-gray-900 rounded-xl px-6 py-10 mb-8 text-center shadow-md">
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
              <label htmlFor="sort" className="sr-only">Sort by</label>
              <select
                id="sort"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-800 text-white"
                aria-label="Sort courses"
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
                  aria-label="Filter by category"
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
                  aria-label="Filter by level"
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
          <p className="text-gray-300">
            Showing {sortedCourses.length} {sortedCourses.length === 1 ? 'course' : 'courses'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {selectedLevel !== 'All' && ` for ${selectedLevel} level`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Empty state */}
        {sortedCourses.length === 0 && (
          <div className="text-center py-12 bg-gray-900 rounded-lg shadow-md">
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