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
    if (bidsSortedByProposalDate.length === 0) loadBids(); 
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




// import { useEffect, useState } from 'react';
// import { observer } from 'mobx-react-lite';
// import './lastBids.scss';
// import { formatDateWithDateTime } from '../../../services/DateService';
// import { useStore } from '../../../Store/store';
// import ModalBox from '../../modals/ModalBox';
// import LoadingComponent from '../../LoadingComponent';
// import BidDetails from '../../modals/childrens/BidDetails';

// function MyBids() {
//   const store = useStore();
//   const { bidsStore } = store;
//   const { bidsSortedByProposalDate, loadBids, loading, loadBid, selectedBid } = bidsStore;
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   useEffect(() => {
//     if (bidsSortedByProposalDate.length === 0) loadBids();
//   }, [bidsSortedByProposalDate.length, loadBids]);

//   const toggleModal = async (bidId: number | null) => {
//     if (bidId !== null) {
//       await loadBid(bidId);
//       setIsModalVisible(true);
//     } else {
//       setIsModalVisible(false);
//     }
//   };

//   if (loading) return <LoadingComponent />;

//   return (
//     <div className='recent-bids-list'>
//       {bidsSortedByProposalDate?.length > 0 ? (
//         bidsSortedByProposalDate.map((bid) => (
//           <div
//             className='list-item'
//             onClick={() => toggleModal(bid.proposalID)}
//             key={`${bid.proposalID}-${bid.contractorID}`}
//           >
//             <span className='project-name'>
//               {bid.projectName} - {bid.acceptedStatus ? 'Accepted' : 'Pending'}
//             </span>
//             <div dir="rtl" className="bid-details">
//               <div className="bid-comment">{bid.proposalPrice}</div>
//               <span className="bid-date">Date: {formatDateWithDateTime(bid.proposalDate)}</span>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No bids found.</p>
//       )}

//       <ModalBox isVisible={isModalVisible} onClose={() => toggleModal(null)}>
//         {selectedBid && <BidDetails bid={selectedBid} />}
//       </ModalBox>
//     </div>
//   );
// }

// export default observer(MyBids);
