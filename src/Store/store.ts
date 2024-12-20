import { createContext, useContext } from "react";
import AuthStore from "./AuthStore";
import UserStore from "./UserStore";
import ProjectStore from "./projectsStore";
import WindowStore from "./windowStore";
import BidsStore from "./bidsStore";
import { ChatsStore } from "./ChatsStore";
import commonStore from "./commonStore";

interface IStore {
    authStore: AuthStore;
    userStore: UserStore;
    projectStore: ProjectStore;
    windowStore : WindowStore;
    bidsStore : BidsStore;
    chatsStore : ChatsStore;
    commonStore : commonStore;

}

export const store: IStore = {
    authStore: new AuthStore(),
    userStore: new UserStore(),
    projectStore: new ProjectStore(),
    windowStore: new WindowStore(), 
    bidsStore: new BidsStore(), 
    chatsStore: new ChatsStore(),  
    commonStore: new commonStore(),

}

export const StoreContext = createContext(store); 

export function useStore(){
    return useContext(StoreContext)
}