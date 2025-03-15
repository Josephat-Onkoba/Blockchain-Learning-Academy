import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export function useWeb3Provider() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Connect wallet function
  const connectWallet = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        if (window.ethereum.request) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        } else {
          throw new Error('Ethereum provider does not support request method');
        }
        
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();
        
        setProvider(provider);
        setSigner(signer);
        setAccount(address);
        setChainId(network.chainId);
        setIsConnected(true);
        
        return { provider, signer, address, chainId: network.chainId };
      } else {
        throw new Error('Please install MetaMask or another Ethereum wallet');
      }
    } catch (err: unknown) {
      console.error('Error connecting wallet:', err);
      if (err instanceof Error) {
        setError(err.message || 'Failed to connect wallet');
      } else {
        setError('Failed to connect wallet');
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize provider and setup event listeners
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const checkConnection = async () => {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            const signer = provider.getSigner();
            const network = await provider.getNetwork();
            
            setProvider(provider);
            setSigner(signer);
            setAccount(accounts[0]);
            setChainId(network.chainId);
            setIsConnected(true);
          }
        } catch (err) {
          console.error('Error checking wallet connection:', err);
        }
      };
      
      checkConnection();
      
      // Setup listeners
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected
          setProvider(null);
          setSigner(null);
          setAccount(null);
          setIsConnected(false);
        } else if (accounts[0] !== account) {
          // Account changed
          setAccount(accounts[0]);
          if (provider) {
            setSigner(provider.getSigner());
          }
        }
      };
      
      const handleChainChanged = () => {
        window.location.reload();
      };
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [account, provider]);

  return {
    provider,
    signer,
    account,
    chainId,
    isConnected,
    isLoading,
    error,
    connectWallet
  };
}