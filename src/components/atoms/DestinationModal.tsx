import React from "react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Image,
    Box,
    Text,
    Center,
    Button
} from "@chakra-ui/react";
import City1 from "../../assets/city1.jpeg"
import City2 from "../../assets/city2.jpeg"
import City3 from "../../assets/city3.jpeg"
import City4 from "../../assets/city4.jpeg"
import City5 from "../../assets/city5.jpeg"
import City6 from "../../assets/city6.jpeg"
import { mintNFT } from "../../metamask/interaction";



const DestinationModal = ({ onClose, destinationData ,indexData}) => {


    const cities = [City1, City2, City3, City4, City5, City6];
    const cityImage = cities[indexData] || "";
    console.log(destinationData);
    console.log(indexData);

    const handleMintClick = (item) => {
        // Implement your minting logic her
        console.log("Minting process initiated for item:", item);
        mintNFT('https://orange-poised-catshark-700.mypinata.cloud/ipfs/'+item.ipfs,item.country,item.tripitinerary,item.priceCrypto);
    };


    return (
        <Modal isOpen={true} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="gray.100"
                borderRadius="md"
            >
                <Box p={4} display="flex" alignItems="center" textAlign="center">
                    <Box flex="1">
                        <Image
                            src={cityImage}
                            alt={destinationData.country}
                            borderRadius="md"
                            maxH="300px"
                        />
                    </Box>
                    <Box flex="2" pl={4}>
                        <ModalHeader>{destinationData.country}</ModalHeader>
                        <ModalCloseButton />
                        <Text fontWeight="bold" mt={4}>
                            Price: {destinationData.price}
                        </Text>
                        <Text mt={2}>Duration: {destinationData.duration}</Text>
                        <br></br>
                        {/* Display the itinerary */}
                        {destinationData.tripitinerary}
                        {/* Other information from the card */}
                        <Button
                            colorScheme="green"
                            mt={4}
                            onClick={() => handleMintClick(destinationData)}
                        >
                            Mint
                        </Button>
                    </Box>
                </Box>



            </ModalContent>
        </Modal>
    );
};

export default DestinationModal;
