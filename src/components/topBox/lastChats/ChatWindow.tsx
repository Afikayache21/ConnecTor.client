import './ChatWindow.scss';
import React, { useState, useEffect, useRef } from 'react';
import { IChat, IMessage } from '../../../Store/ChatsStore';
import { getUserId } from '../../../Api/agent';
import { useStore } from '../../../Store/store';

interface ChatWindowProps {
  Chat: IChat;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ Chat }) => {

  const { chatsStore } = useStore();
  const [messages, setMessages] = useState<IMessage[]>(Chat?.messages || []);
  const [newMessage, setNewMessage] = useState('');
  const currentUserId = Number(getUserId());

  // Reference for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessages = async () => {
      const loadedChat = await chatsStore.loadChat(Chat?.chatId);
      if (loadedChat && loadedChat.messages) {
        setMessages(loadedChat.messages);
        console.log(loadedChat.messages);
      }
    };
    loadMessages();
  }, [Chat.chatId, chatsStore.getChatById(Chat.chatId)]);

  // Auto-scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
      debugger;
      //I want to add this to the loadedChat.messages but I don't want to call again to the store. just want to add this newMsg into the list
      // setMessages(newMsg);
    } catch (error) {
      debugger;
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
