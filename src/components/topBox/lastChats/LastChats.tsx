import { useState, useEffect } from 'react';
import { getLastChatsByUserId } from "../../../services/ChatsService";
import './lastChats.scss';
import { formatDate } from '../../../services/DateService';
import ModalBox from '../../modals/ModalBox';
import '.././box.scss';

type Chat = {
  Id: number;
  Content: string;
  Timestamp: string;
  userImgUrl: string;
  userName: string;
};

type LastChatsProps = {
  userId: number;
};

function LastChats({ userId }: LastChatsProps) {
  const [lastChats, setLastChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    const fetchChats = async () => {
      try {
        const result = await getLastChatsByUserId(userId);
        setLastChats(result);
      } catch (err) {
        setError('Failed to load chats.');
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [userId]);

  const displayedChats = lastChats.slice(0, 10);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const toggleModal = (chat: Chat) => {
    setSelectedChat(chat);
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className='recent-chats-list'>
      {displayedChats.length > 0 ? (
        displayedChats.map(chat => (
          <div className='list-item' onClick={() => toggleModal(chat)} key={chat.Id}>
            <span className='chat-username'>{chat.userName}</span>
            <div className="chat">
              <div className='message-info'>
                <img
                  className='img'
                  src={chat.userImgUrl || '../../../../public/user.svg'}
                  alt={`${chat.userName}'s avatar`} // Add alt text for accessibility
                />
                <div dir="rtl" className='row-text'>
                  <span className='chat-content'>{chat.Content}</span>
                </div>
              </div>
              <div className='message-timestamp'>
                <span>{formatDate(chat.Timestamp)}</span>
              </div>
            </div>
            <ModalBox isVisible={isModalVisible} onClose={() => toggleModal(chat)}>
              <div >
                <div >{selectedChat?.userName}</div>
                <div >{selectedChat?.Content}</div>
              </div>
            </ModalBox>
          </div>
        ))
      ) : (
        <p>No chats found.</p>
      )}
    </div>
  );
}

export default LastChats;
