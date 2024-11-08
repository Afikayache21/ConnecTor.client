import './ChatWindow.scss';
import React, { useState } from 'react';
import { useStore } from '../../../Store/store';
import { getUserId } from '../../../Api/agent';
import { IMessage } from '../../../Store/ChatsStore';

interface ChatWindowProps {
  ChatId: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ ChatId }) => {
  const currentUserId = Number(getUserId());
  const { chatsStore } = useStore();
  const chat = chatsStore.chats.get(ChatId);
  const [newMessage, setNewMessage] = useState<string>('');
  
  const messages = chat?.messages || [];  // Use an empty array if chat or messages is undefined

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg: IMessage = {
      ChatId: ChatId,
      MessageId: messages.length + 1,
      Content: newMessage,
      Timestamp: new Date().toISOString(),
      SenderId: currentUserId,
      ReceiverId: chat?.secondUserId || 0,
      SenderName: "You"  // Assume "You" as sender name for the current user
    };

    const updatedMessages = [...messages, newMsg];
    chatsStore.updateMessages(ChatId, updatedMessages);  // Assuming there's an action to update the store
    setNewMessage('');  // Clear input field after sending
  };

  return (
    <div className="chat-window">
      <div className="chat-username">{chat?.userName || 'Chat'}</div>
      <div className="messages">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.MessageId}
              className={`message ${message.SenderId === currentUserId ? 'sent' : 'received'}`}
            >
              <span className="sender-name">{message.SenderId === currentUserId ? 'You' : message.SenderName}</span>
              <p className="content">{message.Content}</p>
              <span className="timestamp">{new Date(message.Timestamp).toLocaleString()}</span>
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
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
