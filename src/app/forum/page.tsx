'use client'

import React, { useState } from 'react';
import { FiMessageCircle, FiUser, FiThumbsUp, FiMessageSquare, FiFilter } from 'react-icons/fi';
import Link from 'next/link';

// Sample forum posts data
const forumPostsData = [
  {
    id: 'post-1',
    title: 'Understanding Proof of Work vs. Proof of Stake',
    content: 'Im struggling to understand the difference between Proof of Work and Proof of Stake consensus mechanisms. Can someone explain it in simple terms?',
    author: {
      id: 'user-1',
      name: 'Michael Brown',
      avatar: '/images/avatars/user1.jpg',
      role: 'Student'
    },
    course: {
      id: 1,
      title: 'Blockchain Fundamentals'
    },
    timestamp: '2023-06-15T14:23:00Z',
    likes: 12,
    replies: 8,
    views: 156
  },
  {
    id: 'post-2',
    title: 'How to Implement SHA-256 in Python?',
    content: 'Has anyone completed the "Creating a Simple Hash" lab? Im getting stuck when trying to implement the SHA-256 function.',
    author: {
      id: 'user-3',
      name: 'David Wilson',
      avatar: '/images/avatars/user3.jpg',
      role: 'Student'
    },
    course: {
      id: 1,
      title: 'Blockchain Fundamentals'
    },
    timestamp: '2023-06-17T09:45:00Z',
    likes: 3,
    replies: 2,
    views: 74
  },
  {
    id: 'post-3',
    title: 'Best Practices for Smart Contract Security',
    content: 'I wanted to share some resources I found on smart contract security best practices. What other considerations should developers keep in mind?',
    author: {
      id: 'user-4',
      name: 'Jessica Lee',
      avatar: '/images/avatars/user4.jpg',
      role: 'Student'
    },
    course: {
      id: 2,
      title: 'Smart Contract Development'
    },
    timestamp: '2023-06-19T11:30:00Z',
    likes: 15,
    replies: 6,
    views: 210
  }
];

// Filter categories
const categories = ['All Discussions', 'Course-Specific', 'General Blockchain', 'Technical Questions', 'Project Sharing'];

export default function ForumPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Discussions');

  // Filter posts based on search and category
  const filteredPosts = forumPostsData.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For demo purposes, we're not implementing real category filtering
    return matchesSearch;
  });

  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header section */}
        <div className="bg-gray-900 rounded-xl px-6 py-10 mb-8 shadow-md">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Community Forum</h1>
            <p className="text-gray-300">
              Connect with fellow learners, ask questions, share insights, and earn tokens through valuable contributions.
            </p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-900 bg-blue-400 hover:bg-blue-500">
                <FiMessageCircle className="mr-2" />
                Start a New Discussion
              </button>
            </div>
          </div>
        </div>

        {/* Search and filters */}
        <div className="bg-gray-900 rounded-lg shadow-md p-4 mb-8 border border-gray-800">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search discussions..."
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative w-full md:w-64">
              <label htmlFor="category-select" className="sr-only">Select Category</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-800 text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FiFilter className="mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Forum posts */}
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-800">
              <div className="p-4 md:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="hidden md:block">
                      {post.author.avatar ? (
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-900 text-blue-200 flex items-center justify-center">
                          {post.author.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <Link href={`/forum/${post.id}`} className="text-xl font-semibold text-white hover:text-blue-400">
                        {post.title}
                      </Link>
                      <div className="mt-1 flex items-center text-sm text-gray-400">
                        <span>Posted by </span>
                        <Link href={`/profile/${post.author.id}`} className="ml-1 font-medium text-gray-300 hover:text-blue-400">
                          {post.author.name}
                        </Link>
                        <span className="mx-1">•</span>
                        <span>{formatDate(post.timestamp)}</span>
                        {post.course && (
                          <>
                            <span className="mx-1">•</span>
                            <Link href={`/courses/${post.course.id}`} className="text-blue-400 hover:text-blue-300">
                              {post.course.title}
                            </Link>
                          </>
                        )}
                      </div>
                      <p className="mt-2 text-gray-300 line-clamp-2">{post.content}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-4">
                  <div className="flex space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <FiThumbsUp className="mr-1 h-4 w-4" />
                      <span>{post.likes} likes</span>
                    </div>
                    <div className="flex items-center">
                      <FiMessageSquare className="mr-1 h-4 w-4" />
                      <span>{post.replies} replies</span>
                    </div>
                    <div className="flex items-center">
                      <FiUser className="mr-1 h-4 w-4" />
                      <span>{post.views} views</span>
                    </div>
                  </div>
                  <div>
                    <Link href={`/forum/${post.id}`} className="inline-flex items-center px-3 py-1 border border-blue-700 text-sm font-medium rounded-md text-blue-400 bg-gray-800 hover:bg-gray-700">
                      View Discussion
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 bg-gray-900 rounded-lg shadow-md border border-gray-800">
              <h3 className="text-lg font-medium text-white mb-2">No discussions found</h3>
              <p className="text-gray-400">
                Try adjusting your search or start a new discussion
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}