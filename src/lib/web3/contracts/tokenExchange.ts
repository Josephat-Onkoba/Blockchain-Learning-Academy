import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, TOKEN_EXCHANGE_ABI, EDU_TOKEN_ABI, MY_TOKEN_ABI } from './config';

// Get contract instances
export const getTokenExchangeContract = (provider: ethers.providers.Web3Provider | ethers.Signer) => {
  return new ethers.Contract(
    CONTRACT_ADDRESSES.tokenExchange,
    TOKEN_EXCHANGE_ABI.flat(),
    provider
  );
};

export const getEduTokenContract = (provider: ethers.providers.Web3Provider | ethers.Signer) => {
  return new ethers.Contract(
    CONTRACT_ADDRESSES.eduToken,
    EDU_TOKEN_ABI.flat(),
    provider
  );
};

export const getMyTokenContract = (provider: ethers.providers.Web3Provider | ethers.Signer) => {
  return new ethers.Contract(
    CONTRACT_ADDRESSES.myToken,
    MY_TOKEN_ABI.flat(),
    provider
  );
};

// Function to exchange EDU to MyTokens
export const exchangeEduToMyTokens = async (signer: ethers.Signer, eduAmount: string) => {
  try {
    const weiAmount = ethers.utils.parseEther(eduAmount);
    
    // Get contract instances
    const eduTokenContract = getEduTokenContract(signer);
    const exchangeContract = getTokenExchangeContract(signer);
    
    // First approve the exchange contract to spend EDU tokens
    const approveTx = await eduTokenContract.approve(CONTRACT_ADDRESSES.tokenExchange, weiAmount);
    await approveTx.wait();
    
    // Then execute the exchange
    const exchangeTx = await exchangeContract.exchangeEduToMyTokens(weiAmount);
    const receipt = await exchangeTx.wait();
    
    return {
      success: true,
      transaction: receipt
    };
  } catch (error: unknown) {
    console.error("Error exchanging EDU to MyTokens:", error);
    return {
      success: false,
      error: (error as Error).message
    };
  }
};

// Function to exchange MyTokens to EDU
export const exchangeMyTokensToEdu = async (signer: ethers.Signer, myTokenAmount: string) => {
  try {
    const weiAmount = ethers.utils.parseEther(myTokenAmount);
    
    // Get contract instances
    const myTokenContract = getMyTokenContract(signer);
    const exchangeContract = getTokenExchangeContract(signer);
    
    // First approve the exchange contract to spend MyTokens
    const approveTx = await myTokenContract.approve(CONTRACT_ADDRESSES.tokenExchange, weiAmount);
    await approveTx.wait();
    
    // Then execute the exchange
    const exchangeTx = await exchangeContract.exchangeMyTokensToEdu(weiAmount);
    const receipt = await exchangeTx.wait();
    
    return {
      success: true,
      transaction: receipt
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error exchanging MyTokens to EDU:", error);
    return {
      success: false,
      error: err.message
    };
  }
};

// Get token balances
// In src/lib/web3/contracts/tokenExchange.ts

export const getTokenBalances = async (provider: ethers.providers.Web3Provider, account: string) => {
  try {
    // For debugging, let's check contract instances
    const eduTokenContract = getEduTokenContract(provider);
    const myTokenContract = getMyTokenContract(provider);
    
    // Make sure the contract ABIs have the balanceOf function
    // Fallback to zero if it fails
    let eduBalance = ethers.BigNumber.from(0);
    let myTokenBalance = ethers.BigNumber.from(0);
    
    try {
      if (eduTokenContract.balanceOf) {
        eduBalance = await eduTokenContract.balanceOf(account);
      } else {
        console.error("balanceOf function not found in EDU token contract ABI");
      }
    } catch {
      if (myTokenContract.balanceOf) {
        myTokenBalance = await myTokenContract.balanceOf(account);
      } else {
        console.error("balanceOf function not found in MyToken contract ABI");
      }
    }
    
    try {
      myTokenBalance = await myTokenContract.balanceOf(account);
    } catch (error) {
      console.error("Error fetching MyToken balance:", error);
    }
    
    return {
      eduBalance: ethers.utils.formatEther(eduBalance),
      myTokenBalance: ethers.utils.formatEther(myTokenBalance)
    };
  } catch (error) {
    console.error("Error fetching token balances:", error);
    return {
      eduBalance: '0',
      myTokenBalance: '0'
    };
  }
};