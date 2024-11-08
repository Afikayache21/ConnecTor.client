import axios from 'axios';
import { getToken ,getUserId} from '../Api/agent';
//import { date } from 'yup';

interface IMessage {
  ChatId: number;
  MessageId: number;
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

interface IUser {
  UserID: number;
  UserTypeID: number;
  UserPassword: string;
  FirstName: string;
  LastName: string;
  ActiveStatus: boolean;
  RegionID: number;
  BusinessLicenseCode: string | null;
  Salt: string;
  Email: string;
  Telephone: string;
  CreationDate: string;
  UserImageFileId: number | null;
}

async function getUserById(userId: number): Promise<any> {
  
  try {
    const response = await fetch(`https://localhost:5000/api/User/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch user:', response.statusText);
      return null;
    }

    const user: IUser = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
}


// Function to get last chats by user ID
// export function getLastChatsByUserId(userId: number): IChats[] {
//   const messages: IMessage[] = dbMock.messages;

//   // Filter messages where the user is either the sender or the receiver
//   const userChats = messages.filter(
//     (msg: IMessage) => msg.SenderId === userId || msg.ReceiverId === userId
//   );

//   // Sort messages by Timestamp in descending order to get the latest chats first
//   const sortedChats = userChats.sort(
//     (a, b) => new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime()
//   );

//   // Map the sorted messages to the ILastChats format
//   return sortedChats.map((msg: any) => {
//     const otherUserId = msg.secondUserId === userId ? msg.secondUserId : msg.FirstUserId;

//     const otherUser = getUserById(otherUserId);

//     return {
//       Id: msg.Id,
//       Content: msg.Content,
//       Timestamp: msg.Timestamp,
//       userImgUrl: otherUser ? otherUser.UserImageFileId : '',
//       userName: otherUser ? otherUser.Email : 'Unknown'
//     };
//   });

  
// }


// export function getLastChats(): IChats[] {
  
//   const messages: IMessage[] = dbMock.messages;

//   // Filter messages where the user is either the sender or the receiver


//   // Sort messages by Timestamp in descending order to get the latest chats first
//   const sortedChats = userChats.sort(
//     (a, b) => new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime()
//   );

//   // Map the sorted messages to the ILastChats format
//   return sortedChats.map((msg: IMessage) => {
//     let token = localStorage.getItem('userToken');


//     if (!token) {
//       return null;
//     }


//     const otherUserId = msg.SenderId === userId ? msg.ReceiverId : msg.SenderId;
//     const otherUser = getUserById(otherUserId);

//     return {
//       Id: msg.Id,
//       Content: msg.Content,
//       Timestamp: msg.Timestamp,
//       userImgUrl: otherUser ? otherUser.UserImage : '',
//       userName: otherUser ? otherUser.UserName : 'Unknown'
//     };
//   });

export async function getLastChats(): Promise<IChats[]> {
  try {
        const response = await axios.get(`https://localhost:5000/api/Chat/chats`, {
          
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'// Assuming getToken() fetches your token
          },
        });
        //console.log(response.data);

    // Process the response data and map to IChats format
    const chats: IMessage[] = response.data;  // Adjust based on your API response structure
    const userId = Number(getUserId());
    //  const userId =12;
    return chats.map((msg: any) => {
      //const otherUserId = msg.secondUserId === userId ? msg.ReceiverId : msg.secondUserId; // Ensure userId is defined
      //const otherUser = getUserById(otherUserId);


      // return {
      //   Id: msg.Id,
      //   Content: ''msg.Content'',
      //   Timestamp: msg.Timestamp,
      //   userImgUrl: '',//otherUser ? otherUser.UserImage : '',TODO: getUserImage
      //   userName: 'afik'//otherUser ? otherUser.UserName : 'Unknown'//TODO getUserName
      // };


      return {
        Id: msg.chatId,
        Content: msg.content,
        Timestamp: msg.timestamp,
        userImgUrl: '',//otherUser ? otherUser.UserImage : '',TODO: getUserImage
        userName: msg.userName//otherUser ? otherUser.UserName : 'Unknown'//TODO getUserName
      };
    });

  } catch (error) {
    console.error('Error fetching chats:', error);
    return []; // Return an empty array in case of error
  }
}

  

