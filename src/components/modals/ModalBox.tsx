import './modalBox.scss';
import React from 'react';

function ModalBox({BackroundColor, isVisible, onClose, children }: {BackroundColor?:string, isVisible: boolean, onClose: () => void, children: React.ReactNode }) {

  if (!isVisible) return null; 
  const handleOverlayClick = () => {
    onClose(); 
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
  };

  return (
    <div className="my-modal-overlay"  onClick={handleOverlayClick}> 
      <div className="my-modal" style={{backgroundColor:BackroundColor}} onClick={handleModalClick}> 
        <button className="my-close-button" style={{color:BackroundColor?'black':'white'}} onClick={onClose}>x</button> {/* Close button */}
        <div className="my-modal-content">
          {children} 
        </div>
      </div>
    </div>
  );
}

export default ModalBox;
