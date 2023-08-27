import { pinJSONToIPFS } from "./pinata";
import { ethers } from "ethers";
import { Network, Alchemy } from 'alchemy-sdk';



import contractABI from "../contract_abi.json"; // Assuming contract-abi.json exports JSON

const alchemyKey = "96jE-97NZOPs6BcWWRZG3ApMBd6uBZaB";
const contractAddress = "0x862386e0cc3d7d2b855f039d26984cA9fd16dd6F";

const settings = {
    apiKey: alchemyKey,
    network: Network.ETH_SEPOLIA,
};

const web3 = new Alchemy(settings);

// Use the provider directly without the BrowserProvider wrapper
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = provider.getSigner();

function convertValueToHex(value: string | number): string {
    const hexValue = ethers.toBeHex(value);

    return hexValue;
  }

export async function mintNFT(url: string, name: string, description: string, price: string) {
    console.log(price);
    // Make metadata
    const metadata: Record<string, string> = {
        name: name,
        image: url,
        description: description,
    };

    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "😢 Something went wrong while uploading your tokenURI.",
        };
    }
    const tokenURI = pinataResponse.pinataUrl;
    console.log(price);
    const mintingPriceWei = ethers.parseEther(price.toString());

    window.contract = await new ethers.Contract(contractAddress, contractABI, provider);

    console.log(mintingPriceWei);
    const transactionParameters = {
        to: contractAddress,
        from: window.ethereum.selectedAddress,
        value: convertValueToHex(ethers.parseEther(price.toString())),
        data: contract.interface.encodeFunctionData("mintNFT", [
            window.ethereum.selectedAddress,
            mintingPriceWei,
            tokenURI, // Pass the token URI
        ]),
    };

    console.log(transactionParameters);
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        return {
            success: true,
            status: "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
                txHash,
        };
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message,
        };
    }
}
