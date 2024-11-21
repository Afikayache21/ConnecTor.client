import { useStore } from '../../Store/store';
import './modalBox.scss';
import React from 'react';

function ModalBox({BackroundColor, isVisible, onClose, children }: {BackroundColor?:string, isVisible: boolean, onClose: () => void, children: React.ReactNode }) {
  const {windowStore} = useStore();
  const {isMobile} = windowStore;
  if (!isVisible) return null; 
  const handleOverlayClick = () => {    
    onClose(); 
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
  };

  return (
    <div className={isMobile?"my-modal-overlay-mobile":"my-modal-overlay"}  onClick={handleOverlayClick}> 
      <div className={isMobile?"my-modal-mobile":"my-modal"} style={{backgroundColor:BackroundColor}} onClick={handleModalClick}> 
        <div className="my-modal-content">
          {children} 
        </div>
      </div>
    </div>
  );
}

export default ModalBox;
