import { useEffect, useState } from 'react';
import './lastBids.scss';
import { formatDateWithDateTime } from '../../../services/DateService';
import { useStore } from '../../../Store/store';
import { observer } from 'mobx-react';
import ModalBox from '../../modals/ModalBox';
import BidDetails from '../../modals/childrens/BidDetails';
import { BidDto } from '../../../Store/bidsStore';
import ChatWindow from '../lastChats/ChatWindow';

function MyBids() {
  const store = useStore();
  const { bidsStore ,chatsStore} = store;
  const { bidsSortedByProposalDate, loadBids, loading ,selectedBid ,setSelectedBid} = bidsStore;
  const {loadChat,selectedChat} = chatsStore;

  const [isBidModalVisible, setIsBidModalVisible] = useState(false);
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);

  const toggleBidModal = async (bid :BidDto | null) => {
    if (bid) {
      setSelectedBid(bid.proposalID);
      setIsBidModalVisible(true);
    } else {
      setIsBidModalVisible(false);
    }
  };


  const toggleChatModal = async (ChatId: number | null | undefined) => {
    if (ChatId) {
      if (isBidModalVisible) setIsBidModalVisible(false);
      await loadChat(ChatId);
      setIsChatModalVisible(true);
      return;
    }
    setIsChatModalVisible(false);
  };


  useEffect(() => {
    if (bidsSortedByProposalDate.length === 0) loadBids();
  }, [bidsSortedByProposalDate.length, loadBids]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='recent-bids-list'>
      {bidsSortedByProposalDate.length > 0 ? (
        bidsSortedByProposalDate.map((bid) => (
          <div
            className='list-item'
            key={`${bid.proposalID}-${bid.contractorID}`}
            onClick={() => toggleBidModal(bid)}
          >
            <span className='project-name'>
              {bid.projectName} - {bid.acceptedStatus ? 'Accepted' : 'Pending'}
            </span>
            <div dir='rtl' className='bid-details'>
              <div className='bid-comment'>{bid.proposalPrice}$</div>
              <span className='bid-date'>Date: {formatDateWithDateTime(bid.proposalDate)}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No bids found.</p>
      )}

      <ModalBox isVisible={isBidModalVisible} onClose={() => toggleBidModal(null)}>
        {selectedBid && <BidDetails bid={selectedBid} onChatStart={toggleChatModal} />}
      </ModalBox>

      <ModalBox isVisible={isChatModalVisible} onClose={() => toggleChatModal(null)}>
        {selectedChat&& isChatModalVisible && <ChatWindow Chat={selectedChat} />}
      </ModalBox>

    </div>
  );
}

export default observer(MyBids);