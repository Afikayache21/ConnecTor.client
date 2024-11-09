import './ChatWindow.scss';
import React, { useState, useEffect } from 'react';
import { IChat, IMessage } from '../../../Store/ChatsStore';
import { getUserId } from '../../../Api/agent';
import { useStore } from '../../../Store/store';

interface ChatWindowProps {
  Chat: IChat;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ Chat }) => {
  const currentUserId = Number(getUserId());
  const { chatsStore } = useStore();
  const [messages, setMessages] = useState<IMessage[]>(Chat?.messages || []);
  const [newMessage, setNewMessage] = useState<string>('');

  // Load the chat messages when the component mounts or when Chat.chatId changes
  useEffect(() => {
    const loadMessages = async () => {
      const loadedChat = await chatsStore.loadChat(Chat?.chatId);
      if (loadedChat && loadedChat.messages) {
        setMessages(loadedChat.messages);
      }
    };
    loadMessages();
  }, [Chat.chatId, chatsStore,messages]);




  
  const sendMessage = async () => {
    if (newMessage.trim() === '') return;
  
    const newMsg: IMessage = {
      chatId: Chat.chatId,
      content: newMessage,
      senderId: currentUserId,
      receiverId: Chat.secondUserId
    };
    try {
     chatsStore.sendMessage(newMsg);
     const loadedChat = await chatsStore.loadChat(Chat?.chatId);
     if (loadedChat && loadedChat.messages) {
       setMessages(loadedChat.messages);
     }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  
    setNewMessage(''); // Clear input field after sending
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
