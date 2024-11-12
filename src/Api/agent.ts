import axios, { AxiosResponse } from 'axios';
import { HomePageProjectDto, Project } from '../services/ProjectService';
import { BidDto } from '../Store/bidsStore';
import { IChat, IMessage } from '../Store/ChatsStore';
import { ISelectOption } from '../Store/commonStore';
import { IAuthResult, ILoginUser, IUser } from '../services/AuthService';
axios.defaults.baseURL = 'https://localhost:5000/api';

export const getToken = () => {
    return localStorage.getItem('userToken'); // or however you store the token
};
export const getUserId = () => {
    return localStorage.getItem('userId'); // or however you store the token
};
export const getUserTypeId = () => {
    return localStorage.getItem('userType'); // or however you store the token
};
export const getUserFirstName = () => {
    return localStorage.getItem('firstName'); // or however you store the token
};


// Add a request interceptor to include the token in the headers
axios.interceptors.request.use(config => {
    const token = getToken();    
    if (token) {
        config.headers['Authorization'] = `${token}`; 
    }    
    return config;
}, error => {
    return Promise.reject(error);
});

// const sleep = (delay: number) => {
//     return new Promise(resolve => setTimeout(resolve, delay));
// }

axios.interceptors.response.use(async response => {
   try {
    //await sleep(1000);

    return response;    
   } 
   catch (error) {
    console.log(error);
    return await Promise.reject(error);    
   }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
    }).then(responseBody),
    
    post: <T>(url: string, body: {}) => axios.post<T>(url, body, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
    }).then(responseBody),
    
    put: <T>(url: string, body: {}) => axios.put<T>(url, body, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
    }).then(responseBody),
    
    delete: <T>(url: string) => axios.delete<T>(url, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
    }).then(responseBody),
};
const requestsWithoutAuth = {
    get: <T>(url: string,) => 
        axios.get<T>(url).then(responseBody),
    
    post: <T>(url: string, body: {}) => 
        axios.post<T>(url, body).then(responseBody),
    
    put: <T>(url: string, body: {}) => 
        axios.put<T>(url, body).then(responseBody),
    
    delete: <T>(url: string) => 
        axios.delete<T>(url).then(responseBody),
};

const Projects = {
    userList: () => requests.get<HomePageProjectDto[]>('/Project/UserProjects'),
    list: () => requests.get<HomePageProjectDto[]>('/Project/ProjectList'),
    details: (projectId: number) => requests.get<Project>(`/Project/${projectId}`),
    create: (project: HomePageProjectDto) => requests.post<HomePageProjectDto>('/Project', project),
    update: (project: HomePageProjectDto) => requests.put<HomePageProjectDto>(`/Project/${project.id}`, project),
    delete: (id: number) => requests.delete<void>(`/Project/${id}`)
};
const Chats = {
    list: () => requests.get<IChat[]>('/Chat/chats'),
    details: (id: number) => requests.get<IMessage[]>(`/Chat/GetChatMassegesByChatId?chatId=${id}`),
    create: (otherUserId: number) => requests.post<IChat>(`/Chat/CreateChatRoom?otherUserId=${otherUserId}`,{}),
    send: (message: IMessage) => requests.post<IMessage>(`/Message`, message),
    delete: (id: number) => requests.delete<void>(`/Project/${id}`)
};
const Bids = {
    userList: () => requests.get<BidDto[]>('/Bids/UserBids'),
    details: (id: number) => requests.get<BidDto>(`/Project/${id}`),
    create: (project: BidDto) => requests.post<HomePageProjectDto>('/Project', project),
    update: (project: BidDto) => requests.put<HomePageProjectDto>(`/Project/${project.proposalID}`, project),
    delete: (id: number) => requests.delete<void>(`/Project/${id}`)
};
const Common = {
    proffesionsList: () => requests.get<ISelectOption[]>('/Proffesions') ,   
    regionsList: () => requests.get<ISelectOption[]>('/Regions'),    
    projectFiledsList: () => requests.get<ISelectOption[]>('/ProjectFiledsConroller')    
};
const Auth = {
    login: (user: ILoginUser) => requests.post<IAuthResult>(`/Auth/login`,user),
    register: (user: IUser) => requests.post<IAuthResult>(`/Auth/register`,user),
};


const agent = {
    Chats,
    Projects,
    Bids,
    Common,
    Auth
}
export default agent;

