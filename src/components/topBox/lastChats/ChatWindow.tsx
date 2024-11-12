// import './ChatWindow.scss';
// import React, { useState, useEffect, useRef } from 'react';
// import { IChat, IMessage } from '../../../Store/ChatsStore';
// import { getUserId } from '../../../Api/agent';
// import { useStore } from '../../../Store/store';
// import signalRService from '../../../services/signalRService';

// interface ChatWindowProps {
//   Chat: IChat;
// }

// const ChatWindow: React.FC<ChatWindowProps> = ({ Chat }) => {

//   const { chatsStore } = useStore();
//   const [messages, setMessages] = useState<IMessage[]>(Chat?.messages || []);
//   const [newMessage, setNewMessage] = useState('');
//   const currentUserId = Number(getUserId());

//   // Reference for the messages container
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const loadMessages = async () => {
//       const loadedChat = await chatsStore.loadChat(Chat?.chatId);
//       if (loadedChat && loadedChat.messages) {
//         setMessages(loadedChat.messages);
//         console.log(loadedChat.messages);
//       }
//     };
//     loadMessages();
//   }, [Chat.chatId, chatsStore.getChatById(Chat.chatId)]);

//   // Auto-scroll to the bottom whenever messages change
//   useEffect(() => {
//     // Define the callback function for received messages
//     const handleMessageReceived = (message: string) => {
//       console.log(message);

//       alert(message);
//     //place this in the chat if it is open



//     };

//     // Subscribe to the ReceiveMessage event
//     signalRService.onMessageReceived(handleMessageReceived);

//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const sendMessage = async () => {
//     if (newMessage.trim() === '') return;

//     const newMsg: IMessage = {
//       chatId: Chat.chatId,
//       content: newMessage,
//       senderId: currentUserId,
//       receiverId: Chat.secondUserId
//     };
//     try {
//       chatsStore.sendMessage(newMsg);
//       //I want to add this to the loadedChat.messages but I don't want to call again to the store. just want to add this newMsg into the list
//       // setMessages(newMsg);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }

//     setNewMessage('');
//   };

//   return (
//     <div className="chat-window">
//       <div className="chat-username">{Chat.userName || 'Chat'}</div>
//       <div className="messages">
//         {messages.length > 0 ? (
//           messages.map((message: IMessage) => (
//             <div
//               key={message.messageId}
//               className={`message ${message.senderId === currentUserId ? 'sent' : 'received'}`}
//             >
//               <span className="sender-name">{message.senderName}</span>
//               <p className="content">{message.content}</p>
//               <span className="timestamp">{message.timestamp}</span>
//             </div>
//           ))
//         ) : (
//           <p>No messages available.</p>
//         )}
//         {/* Empty div to act as the auto-scroll target */}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="message-input">
//         <textarea
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;




import './ChatWindow.scss';
import React, { useState, useEffect, useRef } from 'react';
import { IChat, IMessage } from '../../../Store/ChatsStore';
import { getUserId } from '../../../Api/agent';
import { useStore } from '../../../Store/store';
import signalRService from '../../../services/signalRService';

interface ChatWindowProps {
  Chat: IChat;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ Chat }) => {

  const { chatsStore } = useStore();
  const { selectedChat ,addMessageToChat} = chatsStore;
  const [messages, setMessages] = useState<IMessage[]>(selectedChat?.messages || []);
  const [newMessage, setNewMessage] = useState('');
  const currentUserId = Number(getUserId());

  // Reference for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadMessages = async () => {
    if (!selectedChat?.chatId) return;
    const loadedChat = await chatsStore.loadChat(selectedChat.chatId);
    if (loadedChat && loadedChat.messages) {
      setMessages(loadedChat.messages);
      //console.log(loadedChat.messages);
    }
  };
  const handleMessageReceived = async (message: any) => {
debugger;
// alert(message.value.chatId);
    // await loadMessages();

    
    message.value.messageId = message.value.id
    var msg2  = message.value
    // addMessageToChat(message.value.chatId,message.value)
    //  setMessages(message.value);
    // setMessages((prevMessages) => [...prevMessages, message.value]);
    setMessages((prevMessages) => {
      
      
      // Check if the message ID already exists in the current messages
      const messageExists = prevMessages.some((msg) => msg.messageId === msg2.messageId);
    
      // If the message ID doesn't exist, add it to the messages array; otherwise, return the previous array
      return messageExists ? prevMessages : [...prevMessages, msg2];
    });
    
    setNewMessage('')

  };




  useEffect(() => {

    // Subscribe to the ReceiveMessage event
    signalRService.onMessageReceived(handleMessageReceived);

    // Auto-scroll to the bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

  }, [Chat.chatId, messages]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;
debugger;
    const newMsg: IMessage = {
      chatId: Chat.chatId,
      content: newMessage,
      senderId: currentUserId,
      receiverId: Chat.secondUserId == currentUserId? Chat.firstUserId :Chat.secondUserId
    };
    try {
      chatsStore.sendMessage(newMsg);

    } catch (error) {
      console.error("Error sending message:", error);
    }

    setNewMessage('');
  };

  return (
    <div className="chat-window">
      <div className="chat-username">{Chat.userName || 'Chat'}</div>
      <div className="messages">
        {messages.length > 0 ? (
          messages.map((message: IMessage) => (
            <div
              key={message.messageId}
              className={`message ${message.senderId === currentUserId ? 'sent' : 'received'}`}
            >
              <span className="sender-name">{message.senderName}</span>
              <p className="content">{message.content}</p>
              <span className="timestamp">{message.timestamp}</span>
            </div>
          ))
        ) : (
          <p>No messages available.</p>
        )}
        {/* Empty div to act as the auto-scroll target */}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input">
        <textarea
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;

