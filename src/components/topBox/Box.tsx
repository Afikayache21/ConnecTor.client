import './box.scss';
import '../modals/modalBox.scss';

import React, { useState } from 'react';
import ModalBox from '../modals/ModalBox';

type BoxProps = {
  title?: string;
  className?: string;
  content?: string;
  leftIcon?: string;
  rightIcon?: string;
  leftIconTooltip?: string;
  rightIconTooltip?: string;
  leftIconAction?: () => void;
  rightIconAction?: () => void;
  children?: React.ReactNode;
  leftIconChildren?: React.ReactNode;
  rightIconChildren?: React.ReactNode;

};

function Box({
  title,
  className = '',
  leftIcon,
  rightIcon,
  rightIconTooltip,
  leftIconTooltip,
  content,
  leftIconAction,
  rightIconAction,
  children,
  leftIconChildren,
  rightIconChildren,
}: BoxProps) {

  // State for modal visibility
  const [isLeftModalVisible, setLeftModalVisible] = useState(false);
  const [isRightModalVisible, setRightModalVisible] = useState(false);

  // Toggle functions
  const toggleLeftModal = () => setLeftModalVisible(!isLeftModalVisible);
  const toggleRightModal = () => setRightModalVisible(!isRightModalVisible);

  return (
    <div className={`box-container ${className}`}>
      <div style={leftIcon ? undefined : { display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="box-header">
        {leftIcon &&
          <img
            title={leftIconTooltip}
            className="box-icon"
            src={leftIcon}
            alt="left icon"
            onClick={() => {
              if (leftIconAction) leftIconAction();
              toggleLeftModal();
            }}
          />}
        <h1>{title}</h1>
        {rightIcon &&
          <img
            title={rightIconTooltip}
            className="box-icon"
            src={rightIcon}
            alt="right icon"
            onClick={() => {
              if (rightIconAction) rightIconAction();
              toggleRightModal();
            }}
          />}
      </div>
      <div className="content-container">
        {content && <p>{content}</p>}
        {children}
      </div>

      {leftIcon && <ModalBox isVisible={isLeftModalVisible} onClose={toggleLeftModal}>
        {leftIconChildren}
      </ModalBox>}


      {rightIcon && <ModalBox isVisible={isRightModalVisible} onClose={toggleRightModal}>
        {rightIconChildren}
      </ModalBox>}
    </div>
  );
}

export default Box;
