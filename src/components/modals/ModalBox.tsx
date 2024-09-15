import './modalBox.scss';
import React from 'react';

function ModalBox({ isVisible, onClose, children }: { isVisible: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!isVisible) return null; // If the modal is not visible, return nothing

  // Handle clicks on the overlay
  const handleOverlayClick = () => {
    onClose(); // Close modal when overlay is clicked
  };

  // Prevent clicks inside the modal from closing the modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click event from propagating to the overlay
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}> {/* Overlay behind the modal */}
      <div className="modal" onClick={handleModalClick}> 
        <button className="close-button" onClick={onClose}>X</button> {/* Close button */}
        <div className="modal-content">
          {children} 
        </div>
      </div>
    </div>
  );
}

export default ModalBox;
