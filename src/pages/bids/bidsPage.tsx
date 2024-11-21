// import { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import './bids.scss';
// import { useStore } from '../../Store/store';

// import { useNavigate } from 'react-router';
// import Box from '../../components/topBox/Box';

// const BidsPage = () => {
//   const navigate  = useNavigate();
//   const { bidsStore } = useStore();
//   const { bidRegistry, loadBids, loading, error,bidsSortedByProposalDate } = bidsStore;

//   // Load bids when the component mounts
//   useEffect(() => {
//     if (bidRegistry.size === 0) loadBids();
//   }, [bidRegistry.size, loadBids]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   // Sort bids by proposalDate


//   return (
//     <Box
//   title={'Project Bids'}
//   className='all-projects-grid-layout'   
// >
//   <div className="box-content">
//   <div className="bids-page">
//       <ul className="bids-list">
//         {bidsSortedByProposalDate.length > 0 ? (
//           bidsSortedByProposalDate.map((bid) => (
//             <li key={bid.proposalID} className={`bid-item ${bid.acceptedStatus ? 'accepted' : 'pending'}`}>
//               <div className="bid-header">
//                 <h3>{bid.projectName}</h3>
//                 <span className={`status-label ${bid.acceptedStatus ? 'accepted' : 'pending'}`}>
//                   {bid.acceptedStatus ? 'Accepted' : 'Pending'}
//                 </span>
//               </div>
//               <div className="bid-details">
//                 <p><strong>Contractor:</strong> {bid.contractorName}</p>
//                 <p><strong>Bid Amount:</strong> ${bid.proposalPrice.toFixed(2)}</p>
//                 <p><strong>Proposal Date:</strong> {new Date(bid.proposalDate).toLocaleDateString()}</p>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p>No bids found.</p>
//         )}
//       </ul>
//     </div>
//   </div>
// </Box>
//   );
// };

// export default observer(BidsPage);



import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './bids.scss';
import { useStore } from '../../Store/store';
import ModalBox from '../../components/modals/ModalBox';
import BidDetails from '../../components/modals/childrens/BidDetails';
import ChatWindow from '../../components/topBox/lastChats/ChatWindow';
import { BidDto } from '../../Store/bidsStore';

const BidsPage = () => {
  const { bidsStore, chatsStore } = useStore();
  const { bidsSortedByProposalDate, loadBids, loading, error, selectedBid, setSelectedBid } = bidsStore;
  const { loadChat, selectedChat } = chatsStore;

  const [isBidModalVisible, setIsBidModalVisible] = useState(false);
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);

  const toggleBidModal = async (bid: BidDto | null) => {
    if (bid) {
      setSelectedBid(bid.proposalID);
      setIsBidModalVisible(true);
    } else {
      setIsBidModalVisible(false);
    }
  };

  const toggleChatModal = async (chatId: number | null) => {
    if (chatId) {
      if (isBidModalVisible) setIsBidModalVisible(false); // Close bid modal if open
      await loadChat(chatId);
      setIsChatModalVisible(true);
    } else {
      setIsChatModalVisible(false);
    }
  };

  useEffect(() => {
    if (bidsSortedByProposalDate.length === 0) loadBids();
  }, [bidsSortedByProposalDate.length, loadBids]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bids-page">
      <ul className="bids-list">
        {bidsSortedByProposalDate.length > 0 ? (
          bidsSortedByProposalDate.map((bid) => (
            <li
              key={bid.proposalID}
              className={`bid-item ${bid.acceptedStatus ? 'accepted' : 'pending'}`}
              onClick={() => toggleBidModal(bid)}
            >
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

      <ModalBox isVisible={isBidModalVisible} onClose={() => toggleBidModal(null)}>
        {selectedBid && <BidDetails bid={selectedBid} onChatStart={toggleChatModal} />}
      </ModalBox>

      <ModalBox isVisible={isChatModalVisible} onClose={() => toggleChatModal(null)}>
        {selectedChat && isChatModalVisible && <ChatWindow Chat={selectedChat} />}
      </ModalBox>
    </div>
  );
};

export default observer(BidsPage);
