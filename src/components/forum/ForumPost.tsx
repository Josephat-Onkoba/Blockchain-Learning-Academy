'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiThumbsUp, FiMessageSquare, FiShare2, FiFlag, FiMoreHorizontal } from 'react-icons/fi';
import { timeAgo } from '@/lib/utils';

interface Author {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

interface Reply {
  id: string;
  content: string;
  author: Author;
  timestamp: string;
  likes: number;
}

interface Post {
  id: string;
  content: string;
  author: Author;
  timestamp: string;
  likes: number;
  replies?: Reply[];
  course?: {
    id: number;
    title: string;
  };
}

interface ForumPostProps {
  post: Post;
  isReply?: boolean;
  onReply: (postId: string, newReply: Reply) => void;
}

const ForumPost: React.FC<ForumPostProps> = ({ post, isReply = false, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(likesCount + 1);
      setIsLiked(true);
    } else {
      setLikesCount(likesCount - 1);
      setIsLiked(false);
    }
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim() === '') return;

    const newReply: Reply = {
      id: `reply-${Date.now()}`,
      content: replyContent,
      author: {
        id: 'current-user',
        name: 'You',
        avatar: '/images/avatars/default.jpg',
        role: 'Student'
      },
      timestamp: new Date().toISOString(),
      likes: 0
    };

    onReply(post.id, newReply);
    setReplyContent('');
    setShowReplyForm(false);
  };

  return (
    <div className={`bg-gray-900 rounded-lg ${isReply ? 'border border-gray-800' : 'shadow-md'} mb-4`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full mr-3"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-900 text-blue-200 flex items-center justify-center mr-3">
                {post.author.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center">
                <Link href={`/profile/${post.author.id}`} className="font-medium text-white hover:text-blue-400">
                  {post.author.name}
                </Link>
                {post.author.role && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300">
                    {post.author.role}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">
                {timeAgo(post.timestamp)}
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              title="More options"
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 hover:text-gray-300 focus:outline-none"
            >
              <FiMoreHorizontal />
            </button>

            {showMenu && (
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  onClick={() => {
                    alert('Report submitted');
                    setShowMenu(false);
                  }}
                >
                  <FiFlag className="mr-3 h-4 w-4" />
                  Report post
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="prose prose-invert max-w-none mb-4">
          <p className="text-gray-200">{post.content}</p>
        </div>

        <div className="text-xs text-gray-400 mb-4">
          <span>Engagement cost: 1 MyToken per action</span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-800 pt-3">
          <div className="flex space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 text-sm ${
                isLiked ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <FiThumbsUp className={isLiked ? 'fill-current' : ''} />
              <span>Like{likesCount > 0 && ` (${likesCount})`}</span>
            </button>

            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center space-x-1 text-sm text-gray-400 hover:text-gray-300"
            >
              <FiMessageSquare />
              <span>Reply{(post.replies?.length ?? 0) > 0 && ` (${post.replies?.length})`}</span>
            </button>

            <button
              className="flex items-center space-x-1 text-sm text-gray-400 hover:text-gray-300"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/forum/post/${post.id}`);
                alert('Link copied to clipboard');
              }}
            >
              <FiShare2 />
              <span>Share</span>
            </button>
          </div>

          {!isReply && post.course && (
            <Link
              href={`/courses/${post.course.id}`}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              {post.course.title}
            </Link>
          )}
        </div>
      </div>

      {showReplyForm && (
        <div className="px-4 pb-4">
          <form onSubmit={handleReplySubmit} className="mt-2">
            <div className="mb-3">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="block w-full rounded-md border-gray-700 bg-gray-800 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                rows={3}
                placeholder="Write your reply..."
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400">
                <span>Cost: 1 MyToken to post</span>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-700 text-xs font-medium rounded text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={replyContent.trim() === ''}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reply
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {!isReply && post.replies && post.replies.length > 0 && (
        <div className="px-4 pb-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Replies</h3>
          <div className="pl-6 border-l-2 border-gray-800">
            {post.replies.map(reply => (
              <ForumPost
                key={reply.id}
                post={reply as Post}
                isReply={true}
                onReply={onReply}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPost;