import { ethers } from 'ethers';

export async function requestAccount(): Promise<string | null> {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            return accounts[0];
           } catch (error) {
            console.log('Error connecting...', error);
            return null;
        }
    } else {
        alert('MetaMask not detected');
        return null;
    }
}

export async function connectWallet(): Promise<ethers.BrowserProvider| null> {
    if (typeof window.ethereum !== 'undefined') {
        const walletAddress = await requestAccount();
        if (walletAddress) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            return provider;
        }
    }
    return null;
}
