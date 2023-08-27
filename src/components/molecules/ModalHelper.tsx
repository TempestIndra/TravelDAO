import React, { useState } from "react";
import DestinationModal from "../atoms/DestinationModal"; // Import your modal component

export const useModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [pictureIndex, setPictureIndex] = useState(null); // Added pictureIndex state

    const openModal = (destination, index) => {
        
        setSelectedDestination(destination);
        setPictureIndex(index); // Set the pictureIndex
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedDestination(null);
        setPictureIndex(null); // Reset pictureIndex when closing the modal
        setShowModal(false);
    };

    const ModalComponent = showModal && (
        <DestinationModal
            
            onClose={closeModal}
            destinationData={selectedDestination}
            indexData ={pictureIndex} // Pass pictureIndex to the modal
        />
    );

    return { openModal, closeModal, ModalComponent };
};
