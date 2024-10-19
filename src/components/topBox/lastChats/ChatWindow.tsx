// import React, { useEffect, useState } from 'react';

// type Message = {
//     Id: number;
//     Content: string;
//     Timestamp: string;
//     SenderId: number; // ID of the user who sent the message
//     ReceiverId: number; // ID of the user who received the message
//     SenderName: string; // Name of the user who sent the message
//   };

// const mockChatHistory: Message[] = [
//   {
//     Id: 1,
//     Content: "Hey, how are you?",
//     Timestamp: "2024-10-18T10:00:00Z",
//     SenderId: 1,
//     ReceiverId: 2,
//     SenderName: "User 1",
//   },
//   {
//     Id: 2,
//     Content: "I'm good, thanks! How about you?",
//     Timestamp: "2024-10-18T10:01:00Z",
//     SenderId: 2,
//     ReceiverId: 1,
//     SenderName: "User 2",
//   },
//   {
//     Id: 3,
//     Content: "Just working on some projects.",
//     Timestamp: "2024-10-18T10:02:00Z",
//     SenderId: 1,
//     ReceiverId: 2,
//     SenderName: "User 1",
//   },
//   {
//     Id: 4,
//     Content: "Sounds great! Let me know if you need help.",
//     Timestamp: "2024-10-18T10:03:00Z",
//     SenderId: 2,
//     ReceiverId: 1,
//     SenderName: "User 2",
//   },
//   {
//     Id: 5,
//     Content: "Will do! Have a great day!",
//     Timestamp: "2024-10-18T10:04:00Z",
//     SenderId: 1,
//     ReceiverId: 2,
//     SenderName: "User 1",
//   },
//   {
//     Id: 6,
//     Content: "You too! Talk soon!",
//     Timestamp: "2024-10-18T10:05:00Z",
//     SenderId: 2,
//     ReceiverId: 1,
//     SenderName: "User 2",
//   },
//   {
//     Id: 7,
//     Content: "Did you finish the report I sent you?",
//     Timestamp: "2024-10-18T10:06:00Z",
//     SenderId: 1,
//     ReceiverId: 2,
//     SenderName: "User 1",
//   },
//   {
//     Id: 8,
//     Content: "Yes, I submitted it yesterday.",
//     Timestamp: "2024-10-18T10:07:00Z",
//     SenderId: 2,
//     ReceiverId: 1,
//     SenderName: "User 2",
//   },
//   {
//     Id: 9,
//     Content: "Great! Let me know if you need any feedback.",
//     Timestamp: "2024-10-18T10:08:00Z",
//     SenderId: 1,
//     ReceiverId: 2,
//     SenderName: "User 1",
//   },
//   {
//     Id: 10,
//     Content: "Sure, I appreciate it!",
//     Timestamp: "2024-10-18T10:09:00Z",
//     SenderId: 2,
//     ReceiverId: 1,
//     SenderName: "User 2",
//   },
//   {
//     Id: 11,
//     Content: "What are your plans for the weekend?",
//     Timestamp: "2024-10-18T10:10:00Z",
//     SenderId: 1,
//     ReceiverId: 2,
//     SenderName: "User 1",
//   },
//   {
//     Id: 12,
//     Content: "I’m thinking of going hiking. How about you?",
//     Timestamp: "2024-10-18T10:11:00Z",
//     SenderId: 2,
//     ReceiverId: 1,
//     SenderName: "User 2",
//   },
//   {
//     Id: 13,
//     Content: "That sounds fun! I might join you if you're okay with that.",
//     Timestamp: "2024-10-18T10:12:00Z",
//     SenderId: 1,
//     ReceiverId: 2,
//     SenderName: "User 1",
//   },
//   {
//     Id: 14,
//     Content: "Of course! The more, the merrier.",
//     Timestamp: "2024-10-18T10:13:00Z",
//     SenderId: 2,
//     ReceiverId: 1,
//     SenderName: "User 2",
//   },
//   {
//     Id: 15,
//     Content: "Let’s plan to leave early then!",
//     Timestamp: "2024-10-18T10:14:00Z",
//     SenderId: 1,
//     ReceiverId: 2,
//     SenderName: "User 1",
//   },
//   {
//     Id: 16,
//     Content: "Sounds like a plan! I’ll bring snacks.",
//     Timestamp: "2024-10-18T10:15:00Z",
//     SenderId: 2,
//     ReceiverId: 1,
//     SenderName: "User 2",
//   },
//   {
//     Id: 17,
//     Content: "Perfect! Looking forward to it.",
//     Timestamp: "2024-10-18T10:16:00Z",
//     SenderId: 1,
//     ReceiverId: 2,
//     SenderName: "User 1",
//   },
//   {
//     Id: 18,
//     Content: "Me too! It’s going to be a great time.",
//     Timestamp: "2024-10-18T10:17:00Z",
//     SenderId: 2,
//     ReceiverId: 1,
//     SenderName: "User 2",
//   },
// ];


// // Mock implementation of getChatHistory
// const getChatHistory = (currentUserId: number, otherUserId: number) => {
//   return new Promise<Message[]>((resolve) => {
//     setTimeout(() => {
//       const chatHistory = mockChatHistory.filter(message =>
//         (message.SenderId === currentUserId && message.ReceiverId === otherUserId) ||
//         (message.SenderId === otherUserId && message.ReceiverId === currentUserId)
//       );
//       resolve(chatHistory);
//     }, 1000); // Simulate network delay
//   });
// };

// type ChatWindowProps = {
//   currentUserId: number;
//   otherUserId: number;
// };

// const ChatWindow: React.FC<ChatWindowProps> = ({ currentUserId, otherUserId }) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         const result = await getChatHistory(currentUserId, otherUserId);
//         setMessages(result); // Set messages with the result
//       } catch (err) {
//         setError('Failed to load chat history.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatHistory();
//   }, [currentUserId, otherUserId]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="chat-window">
//       <div className="messages">
//         {messages.map(message => (
//           <div key={message.Id} className={`message ${message.SenderId === currentUserId ? 'sent' : 'received'}`}>
//             <span className="sender-name">{message.SenderName}</span>
//             <p className="content">{message.Content}</p>
//             <span className="timestamp">{new Date(message.Timestamp).toLocaleString()}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;

import './ChatWindow.scss'; // Importing a separate CSS file for styling
import React from 'react';

const ChatWindow: React.FC = () => {
  const currentUserId = 1; // Hardcoding the current user for demo purposes
  const messages = [
    {
      Id: 1,
      Content: "Hey, how are you doing?",
      Timestamp: "2024-10-01T10:20:00",
      SenderId: 1,
      ReceiverId: 2,
      SenderName: "John",
    },
    {
      Id: 2,
      Content: "I'm good, thanks! How about you?",
      Timestamp: "2024-10-01T10:21:30",
      SenderId: 2,
      ReceiverId: 1,
      SenderName: "Jane",
    },
    {
      Id: 3,
      Content: "Just finished a project, feeling relieved.",
      Timestamp: "2024-10-01T10:23:15",
      SenderId: 1,
      ReceiverId: 2,
      SenderName: "John",
    },
    {
      Id: 4,
      Content: "That's awesome! What's the next project?",
      Timestamp: "2024-10-01T10:24:00",
      SenderId: 2,
      ReceiverId: 1,
      SenderName: "Jane",
    },
    {
      Id: 5,
      Content: "Still figuring it out, but I have some ideas.",
      Timestamp: "2024-10-01T10:26:45",
      SenderId: 1,
      ReceiverId: 2,
      SenderName: "John",
    },
    {
      Id: 6,
      Content: "Let me know if you need help brainstorming!",
      Timestamp: "2024-10-01T10:27:30",
      SenderId: 2,
      ReceiverId: 1,
      SenderName: "Jane",
    },
    {
      Id: 7,
      Content: "Definitely! I appreciate that.",
      Timestamp: "2024-10-01T10:29:10",
      SenderId: 1,
      ReceiverId: 2,
      SenderName: "John",
    },
  ];

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message) => (
          <div key={message.Id} className={`message ${message.SenderId === currentUserId ? 'sent' : 'received'}`}>
            <span className="sender-name">{message.SenderName}</span>
            <p className="content">{message.Content}</p>
            <span className="timestamp">{new Date(message.Timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;

