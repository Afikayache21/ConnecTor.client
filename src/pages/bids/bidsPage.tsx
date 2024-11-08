import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './bids.scss';
import { useStore } from '../../Store/store';

const BidsPage = () => {
  const { bidsStore } = useStore();
  const { bidRegistry, loadBids, loading, error,bidsSortedByProposalDate } = bidsStore;

  // Load bids when the component mounts
  useEffect(() => {
    if (bidRegistry.size === 0) loadBids();
  }, [bidRegistry.size, loadBids]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Sort bids by proposalDate


  return (
    <div className="bids-page">
      <h2>Project Bids</h2>
      <ul className="bids-list">
        {bidsSortedByProposalDate.length > 0 ? (
          bidsSortedByProposalDate.map((bid) => (
            <li key={bid.proposalID} className={`bid-item ${bid.acceptedStatus ? 'accepted' : 'pending'}`}>
              <div className="bid-header">
                <h3>{bid.projectName}</h3>
                <span className={`status-label ${bid.acceptedStatus ? 'accepted' : 'pending'}`}>
                  {bid.acceptedStatus ? 'Accepted' : 'Pending'}
                </span>
              </div>
              <div className="bid-details">
                <p><strong>Contractor:</strong> {bid.contractorName}</p>
                <p><strong>Bid Amount:</strong> ${bid.proposalPrice.toFixed(2)}</p>
                <p><strong>Proposal Date:</strong> {new Date(bid.proposalDate).toLocaleDateString()}</p>
              </div>
            </li>
          ))
        ) : (
          <p>No bids found.</p>
        )}
      </ul>
    </div>
  );
};

export default observer(BidsPage);
