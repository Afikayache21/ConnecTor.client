import React from 'react';
import './bids.scss';

function BidsPage() {
  const bidsData = [
    {
      projectId: 1,
      projectName: "Building Renovation",
      bidAmount: "$50,000",
      contractor: "ABC Construction",
      status: "Pending",
      deadline: "2024-11-01",
    },
    {
      projectId: 2,
      projectName: "Office Expansion",
      bidAmount: "$75,000",
      contractor: "XYZ Contractors",
      status: "Accepted",
      deadline: "2024-10-25",
    },
    {
      projectId: 3,
      projectName: "Residential Complex",
      bidAmount: "$120,000",
      contractor: "Prime Builders",
      status: "Rejected",
      deadline: "2024-11-10",
    },
  ];

  return (
    <div className="bids-page">
      <h2>Project Bids</h2>
      <ul className="bids-list">
        {bidsData.map((bid) => (
          <li key={bid.projectId} className={`bid-item ${bid.status.toLowerCase()}`}>
            <div className="bid-header">
              <h3>{bid.projectName}</h3>
              <span className={`status-label ${bid.status.toLowerCase()}`}>{bid.status}</span>
            </div>
            <div className="bid-details">
              <p><strong>Contractor:</strong> {bid.contractor}</p>
              <p><strong>Bid Amount:</strong> {bid.bidAmount}</p>
              <p><strong>Deadline:</strong> {new Date(bid.deadline).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BidsPage;
