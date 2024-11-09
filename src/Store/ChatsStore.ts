// import { makeAutoObservable, runInAction } from "mobx";
// import agent from "../Api/agent";

// export interface IMessage {
//   ChatId: number;
//   MessageId: number;
//   Content: string;
//   Timestamp: string;
//   SenderId: number;
//   SenderName: string;
//   ReceiverId: number;
// }

// export interface IChat{
//   chatId: number;
//   firstUserId: number;
//   secondUserId: number;
//   lastSenderId: number;
//   isRead: boolean;
//   content: string;
//   timestamp: string;
//   userName: string;
//   messages?: IMessage[] | null;
//   //userImgUrl?: string; //TODO: fetch the user image from the db
// }

// export class ChatsStore {
//     chats: Map<number, IChat> = new Map();
//     activeChatId: number | null = null; 

//   constructor() {
//     makeAutoObservable(this);
//   }  

//   // Set the active chat ID for displaying messages
//   setActiveChat(chatId: number) {
//     this.activeChatId = chatId;
//   }

//   updateMessages(chatId: number, newMessages: IMessage[]) {
//     const chat = this.chats.get(chatId);
//     if (chat) {
//       chat.messages = newMessages;
//     }
//   }

//   // Load initial data for chats
// //   async loadInitialData() {
// //     try {
// //       // Fetch chats data from the API
// //       const chatsData = await agent.Chats.list();
  
// //       // Log the entire response for debugging
// //       console.log("API response:", chatsData);
  
// //       // Ensure the response is an array
// //       if (Array.isArray(chatsData)) {
// //         runInAction(() => {
// //           // Loop through each chat item
// //           chatsData.forEach(chat => {
// //             // Check if chatId is defined
// //             if (chat.chatId) {
// //               // Safely add chat to the map
// //               this.chats.set(chat.chatId, { ...chat });
// //             } else {
// //               console.warn("Chat object is missing chatId:", chat);
// //             }
// //           });
// //         });
// //       } else {
// //         // If the response is not an array, throw an error
// //         throw new Error("The response from the API is not an array");
// //       }
// //     } catch (error) {
// //       // Handle any errors that occur during the fetch or processing
// //       runInAction(() => {
// //         console.error("Error in chats fetch:", error);
// //       });
// //     }
// //   }

// async loadInitialData() {
//     try {
//       const chatsData = await agent.Chats.list();
//       debugger;
//       console.log("API response:", chatsData);

//       runInAction(() => {
//         if (Array.isArray(chatsData)) {
//           chatsData.forEach((chatDto) => {
//             // Map the DTO to the IChat structure
//             const mappedChat: IChat = {
//               chatId: chatDto.chatId,
//               firstUserId: chatDto.firstUserId,
//               secondUserId: chatDto. secondUserId,
//               lastSenderId: chatDto.lastSenderId,
//               isRead: chatDto.isRead,
//               content: chatDto.content || "", // Ensure content is always a string
//               timestamp: chatDto.timestamp.toString(),
//               userName: chatDto.userName,
//               messages: [] // Initially, the messages array is empty or null as per your design
//             };
            
//             this.chats.set(mappedChat.chatId, mappedChat);
//           });
//         } else {
//           console.error("Expected chatsData to be an array");
//         }
//       });
//     } catch (error) {
//       runInAction(() => {
//         console.error("Error in chats fetch:", error);
//       });
//     }
//   }
  
//   addChat(chat: IChat) {
//     this.chats.set(chat.chatId, { ...chat, messages: [] });
//   }

//   addMessage(message: IMessage) {
//     const chat = this.chats.get(message.ChatId);
//     if (chat) {
//       if (chat.messages === null) {
//         chat.messages = [];
//       }
//       chat.messages?.push(message);
//     }
//   }

//   // Load messages for the active chat
//   async loadActiveChatMessages() {
//     if (!this.activeChatId) return [];

//     const activeChat = this.chats.get(this.activeChatId);
//     if (!activeChat) return [];

//     activeChat.isRead = true;

//     try {
//       const messages = await agent.Chats.details(activeChat.chatId);
//     //   runInAction(() => {
//     //     this.updateMessages(activeChat.chatId, messages);
//     //   });
//     } catch (err) {
//       console.error("Error in Chats Store on fetch chat messages:", err);
//     }

//     return activeChat.messages || [];
//   }

//   // Computed property to get messages of the active chat without async actions
//   get activeChatMessages() {
//     const activeChat = this.activeChatId ? this.chats.get(this.activeChatId) : null;
//     return activeChat?.messages || [];
//   }
//   get chatsByDate() {
//     return Array.from(this.chats.values())
//       .filter(chat => chat?.timestamp) // Filter out undefined chats
//       .sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
//   }

//   // Simulate receiving a new message in real-time (e.g., WebSocket or SignalR)
//   receiveMessage(message: IMessage) {
//     this.addMessage(message);
//   }

//   // Simulate receiving a new chat in real-time
//   receiveNewChat(chat: IChat) {
//     this.addChat(chat);
//   }
// }










//---------------------------
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Api/agent";

export interface IMessage {
  chatId: number;
  messageId?: number;
  content: string;
  timestamp?: string;
  senderId: number;
  senderName?: string;
  receiverId: number;
}

export interface IChat {
  chatId: number;
  firstUserId: number;
  secondUserId: number;
  lastSenderId: number;
  isRead: boolean;
  content: string;
  timestamp: string;
  userName: string;
  messages: IMessage[] | null;
}



export class ChatsStore {
  chatRegistry = new Map<number, IChat>();
  selectedChat: IChat | undefined = undefined;
  loading = false;
  loadingInitial = true;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get chats() {
    return Array.from(this.chatRegistry.values());
  }

  get tenChatsSortedByTimestamp() {
     const x = this.chats.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return x.slice(0, 10);
  }

  get chatsSortedByTimestamp() {
    return this.chats.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  loadChats = async () => {
    this.loadingInitial = true;
    this.error = null;

    try {
      const chats = await agent.Chats.list();
      
      runInAction(() => {
        chats.forEach(chat => this.setChat(chat));
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to load chats.';
        this.loadingInitial = false;
      });
    }
  }

  loadChat = async (id: number) => {
    let chat = this.getChat(id);
    if (!chat) {
     return ;
    }
     else {
      this.loadingInitial = true;
      this.error = null;

      try {
          let messages = await agent.Chats.details(id);
          console.log(messages);         
          runInAction(() => { 
            if(messages){                
                chat.messages = messages;
            }
            else{
                chat.messages = [];

            }
                this.setChat(chat);
                this.selectedChat = chat;            
            });
            this.loadingInitial = false;
      } catch (error) {
        runInAction(() => {
          this.error = 'Failed to load chat details.';
          this.loadingInitial = false;
        });
      }
      
      return chat;
    }
  }

 


  sendMessage = async (message :IMessage) =>{
    this.loading = true;
    this.error = null;
    try {
        await agent.Chats.send(message);
        runInAction(() => {
        this.loading = false;
        });
      } catch (error) {
        runInAction(() => {
          this.error = 'Failed to send message.';
          this.loading = false;
        });
      }

  }

  deleteChat = async (id: number) => {
    this.loading = true;
    this.error = null;

    try {
      await agent.Chats.delete(id);
      runInAction(() => {
        this.chatRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to delete chat.';
        this.loading = false;
      });
    }
  }

  private getChat(id: number) {
    return this.chatRegistry.get(id);
  }

  private setChat(chat: IChat) {
    this.chatRegistry.set(chat.chatId, chat);
  }
}












