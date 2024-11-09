import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import "./lastChats.scss";
import { formatDate } from "../../../services/DateService";
import ModalBox from "../../modals/ModalBox";
import ChatWindow from "./ChatWindow";
import { useStore } from "../../../Store/store";

const LastChats = observer(() => {
  const { chatsStore } = useStore();
  const {
    tenChatsSortedByTimestamp,
    loadChats,
    loadingInitial,
    error,
    loadChat,
    selectedChat,
  } = chatsStore;

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Load chats when component mounts
    if (tenChatsSortedByTimestamp.length === 0) loadChats();
  }, [loadChats, tenChatsSortedByTimestamp.length]);

  //if (loadingInitial) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const toggleModal = (chatId: number | null) => {
    if (chatId !== null) {
      loadChat(chatId); // Set the selected chat in the store
      setIsModalVisible(true); // Open the modal
    } else {
      setIsModalVisible(false); // Close the modal
    }
  };

  return (
    <div className="recent-chats-list">
      {tenChatsSortedByTimestamp.length > -1 ? (
        tenChatsSortedByTimestamp.map((chat) => (
          <div className="list-item" onClick={() => toggleModal(chat.chatId)} key={chat.chatId}>
            <span className="chat-username">{chat.userName}</span>
            <div className="chat">
              <div className="message-info">
                <img
                  className="img"
                  src={"../../../../public/user.svg"} // Placeholder; replace with user profile image if available
                  alt={`${chat.userName}'s avatar`} // Add alt text for accessibility
                />
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
      </ModalBox>
    </div>
  );
});

export default LastChats;