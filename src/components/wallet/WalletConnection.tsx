'use client'

import React, { useState, useEffect } from 'react';

// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}
import { ethers } from 'ethers';
import { FiExternalLink, FiCopy, FiCheckCircle } from 'react-icons/fi';
import { useWeb3Provider } from '@/lib/web3/hooks/useWeb3Provider';
import { getTokenBalances } from '@/lib/web3/contracts/tokenExchange';

const WalletConnection = () => {
  const { account, isConnected, connectWallet, error: connectionError, isLoading: isConnectionLoading } = useWeb3Provider();
  const [ethBalance, setEthBalance] = useState('0');
  const [eduBalance, setEduBalance] = useState('0');
  const [myTokensBalance, setMyTokensBalance] = useState('0');
  const [copied, setCopied] = useState(false);

  // Fetch balances when connected
  useEffect(() => {
    const fetchBalances = async () => {
      if (typeof window !== 'undefined' && window.ethereum && account) {
        try {
          // Get ETH balance
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const ethBalanceWei = await provider.getBalance(account);
          setEthBalance(ethers.utils.formatEther(ethBalanceWei));
          
          // Get token balances
          const tokenBalances = await getTokenBalances(provider, account);
          setEduBalance(tokenBalances.eduBalance);
          setMyTokensBalance(tokenBalances.myTokenBalance);
        } catch (err) {
          console.error('Error fetching balances:', err);
        }
      }
    };

    if (isConnected && account) {
      fetchBalances();
    }
  }, [isConnected, account]);

  // Copy address to clipboard
  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
      <h2 className="text-lg font-medium text-white mb-4">Wallet Connection</h2>
      
      {!isConnected ? (
        <div>
          <button
            onClick={connectWallet}
            disabled={isConnectionLoading}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnectionLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
          
          {connectionError && (
            <div className="mt-2 text-sm text-red-400">
              {connectionError}
            </div>
          )}
          
          <div className="mt-4 text-sm text-gray-300">
            <p>Connect your wallet to access the EduChain platform features:</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Purchase and manage MyTokens</li>
              <li>Access paid courses and content</li>
              <li>Participate in forum discussions</li>
              <li>Earn rewards for your contributions</li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col space-y-4">
            <div className="bg-gray-800 rounded-md p-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">Connected Account</div>
                <button
                  onClick={() => {}}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Disconnect
                </button>
              </div>
              <div className="mt-1 flex items-center">
                <span className="font-mono text-white">{formatAddress(account || '')}</span>
                <button
                  onClick={copyAddress}
                  className="ml-2 text-gray-400 hover:text-gray-300"
                  title="Copy address"
                >
                  {copied ? <FiCheckCircle className="text-green-500" /> : <FiCopy />}
                </button>
                
                 <a href={`https://etherscan.io/address/${account}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-gray-400 hover:text-gray-300"
                  title="View on Etherscan"
                >
                  <FiExternalLink />
                </a>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-md p-4">
              <div className="text-sm text-gray-400">ETH Balance</div>
              <div className="mt-1 text-white font-medium">
                {parseFloat(ethBalance).toFixed(4)} ETH
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-md p-4">
              <div className="text-sm text-gray-400">$EDU Token Balance</div>
              <div className="mt-1 text-white font-medium">
                {parseFloat(eduBalance).toFixed(4)} $EDU
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-md p-4">
              <div className="text-sm text-gray-400">MyTokens Balance</div>
              <div className="mt-1 text-white font-medium">
                {parseFloat(myTokensBalance).toFixed(2)} MyTokens
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnection;