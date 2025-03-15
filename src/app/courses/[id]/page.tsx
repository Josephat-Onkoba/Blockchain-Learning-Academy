'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { FiUser, FiClock, FiBook, FiStar, FiUsers, FiDollarSign, FiLock, FiCheckCircle, FiMessageSquare } from 'react-icons/fi';
import ForumPost from '@/components/forum/ForumPost';

// Mock course data
const courseData = {
  id: 1,
  title: 'Blockchain Fundamentals',
  instructor: 'Prof. Sarah Chen',
  organization: 'Tech University',
  price: 50,
  image: '/images/blockchain.jpg',
  rating: 4.8,
  students: 1245,
  duration: '6 weeks',
  level: 'Beginner',
  description: `This comprehensive course introduces you to the fundamental concepts of blockchain technology. Learn about decentralized systems, consensus mechanisms, cryptographic principles, and the underlying architecture of blockchain networks. This course is perfect for beginners who want to understand how blockchain works and its potential applications beyond cryptocurrencies.

  By the end of this course, you'll have a solid understanding of blockchain technology and be prepared to explore more advanced topics like smart contracts and decentralized applications.`,
  requirements: [
    'Basic understanding of computer science concepts',
    'No prior blockchain knowledge required',
    'Curiosity and willingness to learn new technological concepts'
  ],
  learningOutcomes: [
    'Understand the core principles of blockchain technology',
    'Explain how consensus mechanisms work in distributed systems',
    'Describe the role of cryptography in blockchain security',
    'Identify potential use cases for blockchain in various industries',
    'Discuss the advantages and limitations of blockchain technology'
  ],
  chapters: [
    {
      id: 1,
      title: 'Introduction to Blockchain Technology',
      duration: '45 mins',
      isCompleted: false,
      isLocked: false,
      sections: [
        { title: 'Welcome to the Course', duration: '5 mins' },
        { title: 'What is Blockchain?', duration: '15 mins' },
        { title: 'History and Evolution', duration: '15 mins' },
        { title: 'Quiz: Blockchain Basics', duration: '10 mins' }
      ]
    },
    {
      id: 2,
      title: 'Decentralization and Distributed Systems',
      duration: '60 mins',
      isCompleted: false,
      isLocked: true,
      sections: [
        { title: 'Centralized vs. Decentralized Systems', duration: '20 mins' },
        { title: 'Peer-to-Peer Networks', duration: '15 mins' },
        { title: 'Distributed Ledger Technology', duration: '15 mins' },
        { title: 'Assignment: Network Models', duration: '10 mins' }
      ]
    },
    {
      id: 3,
      title: 'Cryptography in Blockchain',
      duration: '75 mins',
      isCompleted: false,
      isLocked: true,
      sections: [
        { title: 'Cryptographic Hash Functions', duration: '20 mins' },
        { title: 'Public-Private Key Cryptography', duration: '25 mins' },
        { title: 'Digital Signatures', duration: '20 mins' },
        { title: 'Lab: Creating a Simple Hash', duration: '10 mins' }
      ]
    },
    {
      id: 4,
      title: 'Consensus Mechanisms',
      duration: '90 mins',
      isCompleted: false,
      isLocked: true,
      sections: [
        { title: 'Proof of Work', duration: '25 mins' },
        { title: 'Proof of Stake', duration: '25 mins' },
        { title: 'Alternative Consensus Mechanisms', duration: '20 mins' },
        { title: 'Quiz: Consensus Mechanisms', duration: '20 mins' }
      ]
    },
    {
      id: 5,
      title: 'Blockchain Architecture',
      duration: '60 mins',
      isCompleted: false,
      isLocked: true,
      sections: [
        { title: 'Blocks and Chains', duration: '15 mins' },
        { title: 'Transactions and Merkle Trees', duration: '20 mins' },
        { title: 'Network Nodes and Validators', duration: '15 mins' },
        { title: 'Assignment: Design a Block', duration: '10 mins' }
      ]
    }
  ],
  forumPosts: [
    {
      id: 'post-1',
      content: 'Im struggling to understand the difference between Proof of Work and Proof of Stake consensus mechanisms. Can someone explain it in simple terms?',
      author: {
        id: 'user-1',
        name: 'Michael Brown',
        avatar: '/images/avatars/user1.jpg',
        role: 'Student'
      },
      timestamp: '2023-06-15T14:23:00Z',
      likes: 12,
      replies: [
        {
          id: 'reply-1',
          content: 'Proof of Work requires miners to solve complex mathematical puzzles, consuming a lot of computational power and energy. Proof of Stake selects validators based on how many coins they hold and are willing to "stake" as collateral. PoS is much more energy-efficient than PoW.',
          author: {
            id: 'instructor-1',
            name: 'Prof. Sarah Chen',
            avatar: '/images/avatars/instructor.jpg',
            role: 'Instructor'
          },
          timestamp: '2023-06-15T15:30:00Z',
          likes: 8
        },
        {
          id: 'reply-2',
          content: 'Think of PoW as a competition where the person who can do the most work (solving puzzles) gets to add the next block. PoS is more like a lottery where your chances of winning increase based on how much youve invested in the system.',
          author: {
            id: 'user-2',
            name: 'Jessica Lee',
            avatar: '/images/avatars/user2.jpg',
            role: 'Student'
          },
          timestamp: '2023-06-15T16:05:00Z',
          likes: 5
        }
      ]
    },
    {
      id: 'post-2',
      content: 'Has anyone completed the "Creating a Simple Hash" lab? Im getting stuck when trying to implement the SHA-256 function.',
      author: {
        id: 'user-3',
        name: 'David Wilson',
        avatar: '/images/avatars/user3.jpg',
        role: 'Student'
      },
      timestamp: '2023-06-17T09:45:00Z',
      likes: 3,
      replies: []
    }
  ]
};

export default function CourseView() {
  const [activeTab, setActiveTab] = useState('overview');
  const [forumPosts, setForumPosts] = useState(courseData.forumPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  
  // Function to handle enrolling in the course (purchasing access)
  const handleEnroll = () => {
    // In a real implementation, this would make a call to the blockchain
    // to transfer MyTokens from the user to the course creator
    setIsEnrolled(true);
  };
  
  // Function to add a new forum post
  const handleNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPostContent.trim() === '') return;
    
    const newPost = {
      id: `post-${Date.now()}`,
      content: newPostContent,
      author: {
        id: 'current-user',
        name: 'You',
        avatar: '/images/avatars/default.jpg',
        role: 'Student'
      },
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };
    
    setForumPosts([newPost, ...forumPosts]);
    setNewPostContent('');
  };
  
  // Function to handle replies to posts
  const handleReply = (postId: string, newReply: { id: string; content: string; author: { id: string; name: string; avatar: string; role: string }; timestamp: string; likes: number }) => {
    setForumPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [...(post.replies || []), newReply]
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="bg-black min-h-screen pb-12">
      {/* Course header */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:max-w-3xl">
              <h1 className="text-3xl font-bold">{courseData.title}</h1>
              <div className="mt-2 flex items-center">
                <FiUser className="mr-1" />
                <span className="mr-4">{courseData.instructor}</span>
                <span className="text-gray-300">
                  {courseData.organization}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <FiStar className="mr-1 text-yellow-400" />
                  <span>{courseData.rating} rating</span>
                </div>
                <div className="flex items-center">
                  <FiUsers className="mr-1" />
                  <span>{courseData.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center">
                  <FiClock className="mr-1" />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center">
                  <FiBook className="mr-1" />
                  <span>{courseData.level}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 lg:mt-0">
              <div className="bg-gray-900 rounded-lg shadow-md p-6 text-white border border-gray-800">
                <div className="text-2xl font-bold mb-4 text-blue-400">
                  {courseData.price} <span className="text-sm font-normal">MyTokens</span>
                </div>
                {!isEnrolled ? (
                  <button
                    onClick={handleEnroll}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
                  >
                    <FiDollarSign className="mr-2" />
                    Enroll Now
                  </button>
                ) : (
                  <button
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 cursor-default"
                  >
                    <FiCheckCircle className="mr-2" />
                    Enrolled
                  </button>
                )}
                <div className="mt-4 text-sm text-gray-400 text-center">
                  Access to all chapters and forum discussions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation tabs */}
      <div className="bg-gray-900 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex -mb-px space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
              }`}
            >
              Course Content
            </button>
            <button
              onClick={() => setActiveTab('forum')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'forum'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
              }`}
            >
              Discussion Forum
            </button>
          </nav>
        </div>
      </div>
      
      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8 border border-gray-800">
                <h2 className="text-xl font-bold mb-4 text-white">About This Course</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300">{courseData.description}</p>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8 border border-gray-800">
                <h2 className="text-xl font-bold mb-4 text-white">What Youll Learn</h2>
                <ul className="space-y-2">
                  {courseData.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
                <h2 className="text-xl font-bold mb-4 text-white">Requirements</h2>
                <ul className="space-y-2 list-disc pl-5 text-gray-300">
                  {courseData.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8 border border-gray-800">
                <h2 className="text-xl font-bold mb-4 text-white">Instructor</h2>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-900 text-blue-200 flex items-center justify-center mr-4">
                    {courseData.instructor.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{courseData.instructor}</h3>
                    <p className="text-sm text-gray-400">{courseData.organization}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  Expert in blockchain technology with over 10 years of experience in distributed systems and cryptography.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
                <h2 className="text-xl font-bold mb-4 text-white">Token Economy</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FiDollarSign className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-white">Course Access</h3>
                      <p className="text-sm text-gray-300">
                        {courseData.price} MyTokens to access the full course
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FiMessageSquare className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-white">Forum Participation</h3>
                      <p className="text-sm text-gray-300">
                        1 MyToken per post or comment, earn tokens when others engage with your content
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Content tab */}
        {activeTab === 'content' && (
          <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-800">
            <div className="border-b border-gray-800 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Course Content</h2>
              <p className="text-sm text-gray-400">
                {courseData.chapters.length} chapters • {courseData.duration} total length
              </p>
            </div>
            
            <div className="divide-y divide-gray-800">
              {courseData.chapters.map((chapter, index) => (
                <div key={chapter.id} className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white flex items-center">
                        {chapter.isLocked && !isEnrolled ? (
                          <FiLock className="text-gray-500 mr-2" />
                        ) : chapter.isCompleted ? (
                          <FiCheckCircle className="text-green-500 mr-2" />
                        ) : (
                          <span className="text-gray-500 mr-2">{index + 1}.</span>
                        )}
                        {chapter.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {chapter.duration} • {chapter.sections.length} sections
                      </p>
                    </div>
                    
                    {isEnrolled || index === 0 ? (
                      <Link
                        href={`/courses/${courseData.id}/chapters/${chapter.id}`}
                        className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Start
                      </Link>
                    ) : (
                      <span className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-gray-400 bg-gray-800">
                        Locked
                      </span>
                    )}
                  </div>
                  
                  {/* Show chapter sections on hover/click (simplified for now) */}
                  <div className="mt-2 pl-6 border-l-2 border-gray-800">
                    {chapter.sections.slice(0, 2).map((section, idx) => (
                      <div key={idx} className="py-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">{section.title}</span>
                          <span className="text-gray-500">{section.duration}</span>
                        </div>
                      </div>
                    ))}
                    {chapter.sections.length > 2 && (
                      <div className="py-1 text-sm text-blue-400">
                        + {chapter.sections.length - 2} more sections
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Forum tab */}
        {activeTab === 'forum' && (
          <div>
            <div className="bg-gray-900 rounded-lg shadow-md mb-6 p-6 border border-gray-800">
              <h2 className="text-xl font-bold mb-4 text-white">Discussion Forum</h2>
              
              {isEnrolled ? (
                <form onSubmit={handleNewPost}>
                  <div className="mb-3">
                    <textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="block w-full rounded-md border-gray-700 bg-gray-800 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                      rows={4}
                      placeholder="Share your thoughts or questions..."
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">
                      <span>Cost: 1 MyToken to post</span>
                    </div>
                    <button
                      type="submit"
                      disabled={newPostContent.trim() === ''}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Post
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-yellow-900 bg-opacity-25 p-4 rounded-md border border-yellow-800">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiLock className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-400">
                        Forum access restricted
                      </h3>
                      <div className="mt-2 text-sm text-yellow-300">
                        <p>
                          You need to enroll in this course to participate in the forum.
                          Enroll now to join the discussion!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Forum posts */}
            <div className="space-y-6">
              {forumPosts.map(post => (
                <ForumPost
                  key={post.id}
                  post={post}
                  onReply={handleReply}
                />
              ))}
              
              {forumPosts.length === 0 && (
                <div className="text-center py-12 bg-gray-900 rounded-lg shadow-md border border-gray-800">
                  <h3 className="text-lg font-medium text-white mb-2">No discussions yet</h3>
                  <p className="text-gray-400">
                    Be the first to start a discussion in this course
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}