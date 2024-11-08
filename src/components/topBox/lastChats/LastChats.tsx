// import { useState, useEffect } from 'react';
// import { getLastChats } from "../../../services/ChatsService";
// import './lastChats.scss';
// import { formatDate } from '../../../services/DateService';
// import ModalBox from '../../modals/ModalBox';
// import '../../modals/modalBox.scss'
// import ChatWindow from './ChatWindow';

// type Chat = {
//   Id: number;
//   Content: string;
//   Timestamp: string;
//   userImgUrl: string;
//   userName: string;
// };



// function LastChats() {
//   const [lastChats, setLastChats] = useState<Chat[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedChatId, setSelectedChat] = useState<number | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);


//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const result = await getLastChats();
// ;
//        if(lastChats != result){
//         //console.log("Fetching Chats: " + result);        
//          setLastChats(result);
//        }

//       } catch (err) {
//         setError('Failed to load chats.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChats();
//   }, []);

//   const displayedChats = lastChats.slice(0, 10);


//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   const toggleModal = (chatId: number) => {
//     setSelectedChat(chatId);
//     setIsModalVisible(!isModalVisible);
//   };

//   return (
//     <div className='recent-chats-list'>
//       {displayedChats.length > 0 ? (
//         displayedChats.map(chat => (
//           <div className='list-item' onClick={() => toggleModal(chat.Id)} key={chat.Id}>
//             <span className='chat-username'>{chat.userName}</span>
//             <div className="chat">
//               <div className='message-info'>
//                 <img
//                   className='img'
//                   src={chat.userImgUrl || '../../../../public/user.svg'}
//                   alt={`${chat.userName}'s avatar`} // Add alt text for accessibility
//                 />
//                 <div dir="rtl" className='row-text'>
//                   <span className='chat-content'>{chat.Content}</span>
//                 </div>
//               </div>
//               <div className='message-timestamp'>
//                 <span>{formatDate(chat.Timestamp)}</span>
//               </div>
//             </div>
//             <ModalBox isVisible={isModalVisible} onClose={() => toggleModal(chat.Id)}>
//               <ChatWindow ChatId={chat.Id} />
//             </ModalBox>
//           </div>
//         ))
//       ) : (
//         <p>No chats found.</p>
//       )}
//     </div>
//   );
// }

// export default LastChats;


import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../Store/store';
import './lastChats.scss';
import { formatDate } from '../../../services/DateService';
import ModalBox from '../../modals/ModalBox';
import ChatWindow from './ChatWindow';

function ChatList() {
  const { chatsStore } = useStore();
  const { loadInitialData, chats, activeChatId,chatsByDate } = chatsStore;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  
  useEffect(() => {
    if(chatsByDate.length === 0)
    loadInitialData(); 
  }, [chatsByDate.length,loadInitialData]);
  
  console.log(chatsByDate);

  const toggleModal = (chatId: number | null) => {
    setSelectedChatId(chatId);
    setIsModalVisible(!isModalVisible);
  };

  if (!chats.size) return <p>Loading chats...</p>;

  
  return (
    <div className="recent-chats-list">
      {chatsByDate.map(chat => (
        <div
          className="list-item"
          key={chat.chatId}
          onClick={() => toggleModal(chat.chatId)}
        >
          <span className="chat-username">{chat.userName}</span>
          <div className="chat">
            <div className="message-info">
              <img
                className="img"
                src={'../../../../public/user.svg'}//TODO: addimage to the obeject in show it
                alt={`${chat.userName}'s avatar`}
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
      ))}
      {isModalVisible && selectedChatId && (
        <ModalBox isVisible={isModalVisible} onClose={() => toggleModal(null)}>
          <ChatWindow ChatId={activeChatId ?? 0} />
        </ModalBox>
      )}
    </div>
  );
}

export default observer(ChatList);

