import React from 'react';
import './bidDetails.scss';

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
}

const BidDetails: React.FC<BidDetailsProps> = ({ bid }) => {
  if (!bid) return null;

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
          <div className="info-item">
            <span className="info-label">Contractor:</span> {bid.contractorName}
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
              : 'Rejected'}
          </div>
          {bid.comment && (
            <div className="comment">
              <strong>Comment:</strong> {bid.comment}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BidDetails;
