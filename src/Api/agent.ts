import axios, { AxiosResponse } from 'axios';
import { BidDto } from '../Store/bidsStore';
import { IChat, IMessage } from '../Store/ChatsStore';
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
export const getUserLastName = () => {
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



export interface HomePageProjectDto {
    id:number;
    projectID: number;
    projectName: string;
    projectDescription: string;
    projectFieldName:string
    deadline: Date;//| string;
    region: string;
  }

const Projects = {
    userList: () => requests.get<HomePageProjectDto[]>('/Project/UserProjects'),
    list: () => requests.get<HomePageProjectDto[]>('/Project/ProjectList'),
    details: (id: number) => requests.get<HomePageProjectDto>(`/Project/${id}`),
    create: (project: HomePageProjectDto) => requests.post<HomePageProjectDto>('/Project', project),
    update: (project: HomePageProjectDto) => requests.put<HomePageProjectDto>(`/Project/${project.id}`, project),
    delete: (id: number) => requests.delete<void>(`/Project/${id}`)
};

  
//TODO: implemaint it later
const Chats = {
    list: () => requests.get<IChat[]>('/Chat/chats'),
    details: (ChatId: number) => requests.get<IMessage[]>(`/Chat/GetChatMassegesByChatId/${ChatId}`),
    create: (project: HomePageProjectDto) => requests.post<HomePageProjectDto>('/Project', project),
    update: (project: HomePageProjectDto) => requests.put<HomePageProjectDto>(`/Project/${project.id}`, project),
    delete: (id: number) => requests.delete<void>(`/Project/${id}`)
};


const Bids = {
    userList: () => requests.get<BidDto[]>('/Bids/UserBids'),
    details: (id: number) => requests.get<BidDto>(`/Project/${id}`),
    create: (project: BidDto) => requests.post<HomePageProjectDto>('/Project', project),
    update: (project: BidDto) => requests.put<HomePageProjectDto>(`/Project/${project.proposalID}`, project),
    delete: (id: number) => requests.delete<void>(`/Project/${id}`)
};

const agent = {
    Chats,
    Projects,
    Bids
}
export default agent;

