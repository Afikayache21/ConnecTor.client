import { observer } from "mobx-react";
import { useStore } from "../../Store/store";
import { useEffect, useState } from "react";
import { formatDate } from "../../services/DateService";
import ModalBox from "../../components/modals/ModalBox";
import ChatWindow from "../../components/topBox/lastChats/ChatWindow";



const Chats = observer(() => {


  const { chatsStore} = useStore();
  const {
    chatsSortedByTimestamp,
    loadChats,
    error,
    loadChat,
    selectedChat,
  } = chatsStore;


  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {

    if (chatsSortedByTimestamp.length === 0) loadChats();
  }, [loadChats, chatsSortedByTimestamp.length]);


  if (error) return <p>{error}</p>;

  const toggleModal = async (chatId: number | null) => {
    if (chatId !== null) {
      await loadChat(chatId);
      setIsModalVisible(true); 
    } else {
      await loadChats();
      setIsModalVisible(false); 
    }
  };


  return (
    <div className="recent-chats-list">
      {chatsSortedByTimestamp.length > -1 ? (
        chatsSortedByTimestamp.map((chat) => (
          <div className="list-item" onClick={() => toggleModal(chat.chatId)} key={chat.chatId}>
            <span className="chat-username">{chat.userName}</span>
            <div className="chat">
              <div className="message-info">
                <img
                  className="img"
                  src={"../../../../public/user.svg"} // Placeholder; replace with user profile image if available
                  alt={`${chat.userName}s avatar} // Add alt text for accessibility`}/>
                <div dir="rtl" className="row-text">
                  <span className="chat-content">{chat.content}</span>
                </div>
              </div>
              <div className="message-timestamp">
                <span>{formatDate(chat.timestamp)}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No chats found.</p>
      )}

      <ModalBox isVisible={isModalVisible} onClose={() => toggleModal(null)}>
        {selectedChat && <ChatWindow Chat={selectedChat} />}
      </ModalBox>:
      
    </div>
  );
});

export default Chats;