import dbMock from '../mockDB/mock.json'; // Import the JSON mock data

interface IUser {
  UserID: number;
  UserName: string;
  UserImage: string;
}

interface IMessage {
  Id: number;
  Content: string;
  Timestamp: string; // Assuming the timestamp in JSON is stored as a string
  SenderId: number;
  ReceiverId: number;
}

interface IChats {
  Id: number;
  Content: string;
  Timestamp: string;
  userImgUrl: string;
  userName: string;
}

// Function to retrieve user by user ID
function getUserById(userId: number): IUser | null {
  const user = dbMock.users.find((u: IUser) => u.UserID === userId);
  return user ? user : null; // Return the user or null if not found
}

// Function to get last chats by user ID
export function getLastChatsByUserId(userId: number): IChats[] {
  const messages: IMessage[] = dbMock.messages;

  // Filter messages where the user is either the sender or the receiver
  const userChats = messages.filter(
    (msg: IMessage) => msg.SenderId === userId || msg.ReceiverId === userId
  );

  // Sort messages by Timestamp in descending order to get the latest chats first
  const sortedChats = userChats.sort(
    (a, b) => new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime()
  );

  // Map the sorted messages to the ILastChats format
  return sortedChats.map((msg: IMessage) => {
    const otherUserId = msg.SenderId === userId ? msg.ReceiverId : msg.SenderId;
    const otherUser = getUserById(otherUserId);

    return {
      Id: msg.Id,
      Content: msg.Content,
      Timestamp: msg.Timestamp,
      userImgUrl: otherUser ? otherUser.UserImage : '',
      userName: otherUser ? otherUser.UserName : 'Unknown'
    };
  });
}
