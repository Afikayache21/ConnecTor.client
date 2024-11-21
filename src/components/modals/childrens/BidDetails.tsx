import React from 'react';
import './bidDetails.scss';
import agent from '../../../Api/agent';
import { useStore } from '../../../Store/store';

export interface BidDto {
  proposalID: number;
  projectID: number;
  contractorID: number;
  contractorName: string;
  projectName: string;
  proposalPrice: number;
  proposalDate: Date;
  suggestedStartDate: Date;
  acceptedStatus: boolean | null;
  projectRandomImage?: string;
  comment?: string;
}

interface BidDetailsProps {
  bid: BidDto | null;
  onChatStart?: (chatId: number) => void;
}

const BidDetails: React.FC<BidDetailsProps> = ({ bid, onChatStart }) => {

  if (!bid) return null;


  const { chatsStore ,userStore} = useStore();

  const { createChat } = chatsStore
  const { user } = userStore



  const onClick = async () => {
    const chatid = await createChat(bid.contractorID)
    if (chatid) {
      if (onChatStart) {
        onChatStart(chatid)
      }
    }

  }

  
  const AcceptBid = async () => {
    const chatid = await createChat(bid.proposalID)
    if (chatid) {
      if (onChatStart) {
        onChatStart(chatid)
      }
    }

  }

  return (
    <div className="bid-details-container">
      <h2 className="bid-title">{bid.projectName}</h2>
      {bid.projectRandomImage && (
        <div className="image-container">
          <img src={bid.projectRandomImage} alt="Project" />
        </div>
      )}
      <div className="bid-content">
        <div className="bid-info">
          <div className="info-item">
            <span className="info-label">Proposal ID:</span> {bid.proposalID}
          </div>
          <div className="info-item">
            <span className="info-label">Project ID:</span> {bid.projectID}
          </div>
          <div className="clickable-info-item">
            <span className="info-label">Contractor:</span> <div onClick={()=>{}} className='clickable-info-item'>{bid.contractorName}</div>
          </div>
          <div className="info-item">
            <span className="info-label">Proposal Price:</span> ${bid.proposalPrice.toLocaleString()}
          </div>
          <div className="info-item">
            <span className="info-label">Proposal Date:</span>{' '}
            {new Date(bid.proposalDate).toLocaleDateString()}
          </div>
          <div className="info-item">
            <span className="info-label">Suggested Start Date:</span>{' '}
            {new Date(bid.suggestedStartDate).toLocaleDateString()}
          </div>
          <div className="info-item">
            <span className="info-label">Accepted Status:</span>{' '}
            {bid.acceptedStatus === null
              ? 'Pending'
              : bid.acceptedStatus
                ? 'Accepted'
                : 'Pending'}
          </div>
          {bid.comment && (
            <div className="comment">
              <strong>Comment:</strong> {bid.comment}
            </div>
          )}
        </div>
        {user?.userTypeID==1 &&
         <div className="file-item">
          <button
            onClick={onClick}
          >
            Start to chat
          </button>
          <button
            onClick={AcceptBid}
          >
            Accept bid
          </button>
        </div>
        }
      </div>
    </div>
  );
};

export default BidDetails;
