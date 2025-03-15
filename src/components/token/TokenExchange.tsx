'use client'

import React, { useState, useEffect } from 'react';
import { FiRefreshCw, FiArrowDown } from 'react-icons/fi';
import { ethers } from 'ethers';
import { useWeb3Provider } from '@/lib/web3/hooks/useWeb3Provider';
import { exchangeEduToMyTokens, exchangeMyTokensToEdu, getTokenBalances } from '@/lib/web3/contracts/tokenExchange';

const TokenExchange = () => {
  const { signer, account, isConnected, connectWallet } = useWeb3Provider();
  const [eduBalance, setEduBalance] = useState('0');
  const [myTokensBalance, setMyTokensBalance] = useState('0');
  const [exchangeDirection, setExchangeDirection] = useState('eduToMyTokens');
  const [amount, setAmount] = useState('');
  const [estimatedReceive, setEstimatedReceive] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Conversion rate: 0.01 $EDU = 1000 MyTokens
  const conversionRate = 100000;

  // Fetch token balances
  const fetchBalances = async () => {
    if (account && signer?.provider) {
      const provider = signer.provider as ethers.providers.Web3Provider;
      const balances = await getTokenBalances(provider, account);
      setEduBalance(balances.eduBalance);
      setMyTokensBalance(balances.myTokenBalance);
    }
  };

  // Fetch balances when account changes
  useEffect(() => {
    if (isConnected && account) {
      fetchBalances();
    }
  }, [isConnected, account]);

  // Update estimated receive amount when inputs change
  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      if (exchangeDirection === 'eduToMyTokens') {
        // For 0.01 EDU = 1000 MyTokens
        const eduAmountInWei = ethers.utils.parseEther(amount);
        const myTokensAmount = eduAmountInWei.mul(conversionRate).div(ethers.utils.parseEther('1'));
        setEstimatedReceive(ethers.utils.formatEther(myTokensAmount));
      } else {
        // For 1000 MyTokens = 0.01 EDU
        const myTokensAmountInWei = ethers.utils.parseEther(amount);
        const eduAmount = myTokensAmountInWei.mul(ethers.utils.parseEther('1')).div(conversionRate);
        setEstimatedReceive(ethers.utils.formatEther(eduAmount));
      }
    } else {
      setEstimatedReceive('0');
    }
  }, [amount, exchangeDirection]);

  // Handle exchange direction toggle
  const toggleExchangeDirection = () => {
    setExchangeDirection(prevDirection => 
      prevDirection === 'eduToMyTokens' ? 'myTokensToEdu' : 'eduToMyTokens'
    );
    setAmount('');
    setEstimatedReceive('0');
  };

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d*\.?\d*$/).test(value)) {
      setAmount(value);
    }
  };

  // Handle setting max amount
  const handleSetMax = () => {
    if (exchangeDirection === 'eduToMyTokens') {
      setAmount(eduBalance);
    } else {
      setAmount(myTokensBalance);
    }
  };

  // Execute token exchange
  const executeExchange = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (!amount || parseFloat(amount) <= 0) {
        throw new Error('Please enter a valid amount');
      }
      
      if (!signer) {
        throw new Error('Please connect your wallet first');
      }
      
      let result;
      if (exchangeDirection === 'eduToMyTokens') {
        if (parseFloat(amount) > parseFloat(eduBalance)) {
          throw new Error('Insufficient $EDU balance');
        }
        result = await exchangeEduToMyTokens(signer, amount);
      } else {
        if (parseFloat(amount) > parseFloat(myTokensBalance)) {
          throw new Error('Insufficient MyTokens balance');
        }
        result = await exchangeMyTokensToEdu(signer, amount);
      }
      
      if (result.success) {
        setSuccess(`Exchange successful! Transaction hash: ${result.transaction.transactionHash}`);
        setAmount('');
        setEstimatedReceive('0');
        // Refresh balances
        fetchBalances();
      } else {
        throw new Error(result.error);
      }
    } catch (err: unknown) {
      console.error('Exchange error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Exchange failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
      <h2 className="text-lg font-medium text-white mb-4">Token Exchange</h2>
      
      {!isConnected ? (
        <div className="text-center py-6">
          <p className="text-gray-300 mb-4">Connect your wallet to exchange tokens</p>
          <button 
            onClick={connectWallet}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-400">$EDU Balance</h3>
              <p className="text-lg font-medium text-white">{parseFloat(eduBalance).toFixed(4)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">MyTokens Balance</h3>
              <p className="text-lg font-medium text-white">{parseFloat(myTokensBalance).toFixed(2)}</p>
            </div>
          </div>
          
          <div className="relative mb-6">
            {/* Exchange from */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  {exchangeDirection === 'eduToMyTokens' ? 'From ($EDU)' : 'From (MyTokens)'}
                </label>
                <button
                  onClick={handleSetMax}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Max
                </button>
              </div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-24 sm:text-sm border-gray-700 rounded-md bg-gray-700 text-white"
                  placeholder="0.0"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <span className="text-gray-400 sm:text-sm pr-4">
                    {exchangeDirection === 'eduToMyTokens' ? '$EDU' : 'MyTokens'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Exchange direction toggle */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-4 z-10">
              <button
                onClick={toggleExchangeDirection}
                className="bg-gray-700 border border-gray-600 rounded-full p-2 shadow-md hover:bg-gray-600"
                title="Toggle Exchange Direction"
              >
                <FiRefreshCw className="text-blue-400" />
              </button>
            </div>
            
            {/* Exchange arrow */}
            <div className="flex justify-center my-2">
              <FiArrowDown className="text-gray-400 my-2" />
            </div>
            
            {/* Exchange to */}
            <div className="bg-gray-800 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {exchangeDirection === 'eduToMyTokens' ? 'To (MyTokens)' : 'To ($EDU)'}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  value={estimatedReceive}
                  disabled
                  className="bg-gray-700 focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-24 sm:text-sm border-gray-700 rounded-md text-white"
                  placeholder="0.0"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <span className="text-gray-400 sm:text-sm pr-4">
                    {exchangeDirection === 'eduToMyTokens' ? 'MyTokens' : '$EDU'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Exchange rate info */}
          <div className="bg-gray-800 rounded-md p-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Exchange Rate</span>
              <span className="text-white">
                {exchangeDirection === 'eduToMyTokens' 
                  ? `0.01 $EDU = 1000 MyTokens` 
                  : `1000 MyTokens = 0.01 $EDU`}
              </span>
            </div>
          </div>
          
          {/* Error and success messages */}
          {error && (
            <div className="rounded-md bg-red-900 bg-opacity-20 p-3 mb-4">
              <div className="flex">
                <div className="text-sm text-red-400">
                  {error}
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="rounded-md bg-green-900 bg-opacity-20 p-3 mb-4">
              <div className="flex">
                <div className="text-sm text-green-400">
                  {success}
                </div>
              </div>
            </div>
          )}
          
          {/* Exchange button */}
          <button
            onClick={executeExchange}
            disabled={isLoading || !amount || parseFloat(amount) <= 0}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Exchange'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TokenExchange;