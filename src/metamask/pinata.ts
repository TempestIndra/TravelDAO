import axios from 'axios';

const key = "f7ba54fff88290b81d3f"
const secret = "09aa4202696c78d1e38068c25aa1a81c7d78d6f5520c2a18b796c7621f37a601";

export const pinJSONToIPFS = async (JSONBody: any) => {
    
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    // const url = `https://api.pinata.cloud/data/testAuthentication`;
    try {

        const response = await axios.post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            },
        });
        
        return {
            success: true,
            pinataUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
        };
    } catch (error) {
        // console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
};
