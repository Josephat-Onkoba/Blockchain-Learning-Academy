'use client'

import React from 'react';
import WalletConnection from '@/components/wallet/WalletConnection';
import TokenExchange from '@/components/token/TokenExchange';

export default function TokensPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section */}
        <div className="bg-gray-900 rounded-xl px-6 py-10 mb-8 text-center shadow-md border border-gray-800">
          <h1 className="text-3xl font-bold text-white mb-4">Token Dashboard</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Manage your $EDU tokens and MyTokens, exchange tokens, and view your transaction history.
          </p>
        </div>

        {/* Token dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - wallet connection & token balances */}
          <div className="space-y-6">
            <WalletConnection />
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <TokenExchange />
            
            {/* Token Info */}
            <div className="bg-gray-900 rounded-lg shadow-md p-6 mt-6 border border-gray-800">
              <h2 className="text-lg font-medium text-white mb-4">About the EduChain Token Economy</h2>
              <div className="prose prose-sm max-w-none text-gray-300">
                <p>
                  The EduChain Course Platform operates with a dual-token system designed to facilitate learning and community engagement:
                </p>
                <ul className="space-y-2">
                  <li>
                    <strong className="text-white">$EDU Token:</strong> The native token of the EduChain ecosystem. It has utility across multiple education platforms and can be traded on exchanges.
                  </li>
                  <li>
                    <strong className="text-white">MyTokens:</strong> Platform-specific tokens that fuel all activities within the course platform. They can only be purchased with $EDU tokens at a fixed rate of 0.01 $EDU = 1000 MyTokens.
                  </li>
                </ul>
                <p>
                  MyTokens are used to:
                </p>
                <ul className="space-y-2">
                  <li>Access courses and individual chapters</li>
                  <li>Post and engage in forum discussions</li>
                  <li>Complete assignments and receive feedback</li>
                </ul>
                <p>
                  You can earn MyTokens by:
                </p>
                <ul className="space-y-2">
                  <li>Receiving engagement on your forum posts from other learners</li>
                  <li>Contributing high-quality educational content</li>
                  <li>Participating in community activities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}