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
      return;
    }
    
    else {

      this.loadingInitial = true;
      this.error = null;
      this.selectedChat = chat

      try {
        let messages = await agent.Chats.details(id);
        //console.log(messages);         
        runInAction(() => {
          if (messages) {
            chat.messages = messages;
          }
          else {
            chat.messages = [];
          }
          this.setChat(chat);
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction(() => {
          this.error = 'Failed to load chat details.';
          this.loadingInitial = false;
        });
      }

      return chat;
    }
  }

  addMessageToChat=(chatId: number,message:any)=>{
    let chat = this.getChatById(chatId);
    if(chat&&chat.messages){
    chat?.messages.push(message)
    this.setChat(chat)
    }
  }
  sendMessage = async (message: IMessage) => {
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

  getChatById(id: number) {
    return this.chatRegistry.get(id);
  }

  private getChat(id: number) {
    return this.chatRegistry.get(id);
  }

  private setChat(chat: IChat) {
    this.chatRegistry.set(chat.chatId, chat);
  }
}












