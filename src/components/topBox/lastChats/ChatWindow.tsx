import './ChatWindow.scss';
import React, { useState, useEffect, useRef } from 'react';
import { IChat, IMessage } from '../../../Store/ChatsStore';
import { getUserId } from '../../../Api/agent';
import { useStore } from '../../../Store/store';
import signalRService from '../../../services/signalRService';
import { formatDate } from '../../../services/DateService';

interface ChatWindowProps {
  Chat: IChat;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ Chat }) => {

  const { chatsStore } = useStore();
  const { selectedChat} = chatsStore;
  const [messages, setMessages] = useState<IMessage[]>(selectedChat?.messages || []);
  const [newMessage, setNewMessage] = useState('');  
  const currentUserId = Number(getUserId());
  const temp ='';

  const messagesEndRef = useRef<HTMLDivElement>(null);


  const handleMessageReceived = async (message: any) => {
    const msg3:IMessage = message.value

    setMessages((prevMessages) => [...prevMessages, msg3]);
  };



  useEffect(() => {

    signalRService.onMessageReceived(handleMessageReceived);

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    return () => {
      signalRService.offMessageReceived();
    };
  }, [Chat.chatId]);

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
      receiverId: Chat.secondUserId === currentUserId ? Chat.firstUserId : Chat.secondUserId,
    };
    try {
      await chatsStore.sendMessage(newMsg);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setNewMessage('');
  };

  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {

  }

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
              <span className="sender-name">{message.senderId === currentUserId ? 'Me' : Chat.userName }</span>
              <p className="content">{message.content}</p>
              <span className="timestamp">{formatDate(message.timestamp as string)}</span>
            </div>
          ))
        ) : (
          <p>No messages available.</p>
        )}      
        <div ref={messagesEndRef} />
      </div>
      <form
        className="message-input"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <textarea
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;

