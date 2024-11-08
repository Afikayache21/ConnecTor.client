import { useEffect } from 'react';
import './lastBids.scss';
import { formatDateWithDateTime } from '../../../services/DateService';
import { useStore } from '../../../Store/store';
import { observer } from 'mobx-react';

function MyBids() {
  const store = useStore();
  const { bidsStore } = store;
  const { bidsSortedByProposalDate, loadBids, loading } = bidsStore;

  useEffect(() => {
    if (bidsSortedByProposalDate.length === 0) loadBids(); // Load bids if they haven't been loaded
  }, [bidsSortedByProposalDate.length, loadBids]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='recent-bids-list'>
      {bidsSortedByProposalDate.length > 0 ? (
        bidsSortedByProposalDate.map((bid) => (
          <div className='list-item' key={`${bid.proposalID}-${bid.contractorID}`}>
            <span className='project-name'>
              {bid.projectName} - {bid.acceptedStatus ? 'Accepted' : 'Pending'}
            </span>
            <div dir="rtl" className="bid-details">
              <div className="bid-comment">{bid.proposalPrice}</div>
              <span className="bid-date">Date: {formatDateWithDateTime(bid.proposalDate)}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No bids found.</p>
      )}
    </div>
  );
}

export default observer(MyBids);