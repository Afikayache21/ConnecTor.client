import React from 'react';
import './bidDetails.scss';
import { useStore } from '../../../Store/store';
import { useNavigate } from 'react-router';

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
const navigate = useNavigate();
  if (!bid) return null;


  const { chatsStore ,userStore,bidsStore} = useStore();

  const { createChat } = chatsStore
  const { user ,setSelectedUser} = userStore



  const onClick = async () => {
    const chatid = await createChat(bid.contractorID)
    if (chatid) {
      if (onChatStart) {
        onChatStart(chatid)
      }
    }

  }

  
  const AcceptBid = async () => {
    const isAccepted = await bidsStore.acceptBid(bid.proposalID)

    if(isAccepted){
      console.log("agent.Bids.accept(bid.proposalID) "+ isAccepted );
      
      const chatid = await createChat(bid.contractorID)
      if (chatid) {
        if (onChatStart) {
          onChatStart(chatid)
        }
      }
    }

   

  }

  const OnClick = async () => {
    await setSelectedUser(bid.contractorID)
    navigate('/view')
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
         
          <div className="clickable-info-item">
            <span className="info-label">Contractor:</span> <div onClick={OnClick} className='clickable-info-item'>{bid.contractorName}</div>
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
          {!bid.acceptedStatus &&
          <button
            onClick={AcceptBid}
          >
            Accept bid
          </button>}
        </div>
        }
      </div>
    </div>
  );
};

export default BidDetails;
