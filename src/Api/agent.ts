import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HomePageProjectDto, Project } from '../services/ProjectService';
import { BidDto, CreateBidDto } from '../Store/bidsStore';
import { IChat, IMessage } from '../Store/ChatsStore';
import { ISelectOption } from '../Store/commonStore';
import { IAuthResult, ILoginUser } from '../services/AuthService';
import { IUserStore } from '../Store/UserStore';
import { UserProfileDto } from '../components/modals/UserProfileForm';
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

    get: <T>(url: string, config?: AxiosRequestConfig) => axios.get<T>(url, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        ...config,
    }).then(responseBody),
    specialGet: <T>(url: string, config?: AxiosRequestConfig, returnFullResponse: boolean = false) =>
        axios.get<T>(url, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            ...config,
        }).then(response => returnFullResponse ? response : response.data),
    specialPost: <T>(url: string, body: {}, config?: AxiosRequestConfig, returnFullResponse: boolean = false) =>
        axios.post<T>(url, body, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            ...config,
        }).then(response => returnFullResponse ? response : response.data),


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
    postForm: <T>(url: string, formData: FormData) => axios.post<T>(url, formData, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    }).then(responseBody),
};
const Projects = {
    userList: () => requests.get<HomePageProjectDto[]>('/Project/UserProjects'),
    selectedUserList: (userId: number) => requests.get<HomePageProjectDto[]>(`/Project/SelectedUserProjects?userId=${userId}`),
    list: () => requests.get<HomePageProjectDto[]>('/Project/ProjectList'),
    details: (projectId: number) => requests.get<Project>(`/Project/${projectId}`),
    create: (formData: FormData) => requests.postForm<HomePageProjectDto>('/Project/Create', formData),
    update: (project: HomePageProjectDto) => requests.put<HomePageProjectDto>(`/Project/${project.id}`, project),
    delete: (id: number) => requests.delete<void>(`/Project/${id}`)
};


const Chats = {
    list: () => requests.get<IChat[]>('/Chat/chats'),
    details: (id: number) => requests.get<IMessage[]>(`/Chat/GetChatMassegesByChatId?chatId=${id}`),
    create: (otherUserId: number) => requests.put<IChat>(`/Chat/CreateChatRoom?otherUserId=${otherUserId}`, {}),
    send: (message: IMessage) => {const res: any = requests.post<IMessage>(`/Message`, message)},
    delete: (id: number) => requests.delete<void>(`/Project/${id}`)
};

const Bids = {
    userList: () => requests.get<BidDto[]>('/Bids/UserBids'),
    details: (id: number) => requests.get<BidDto>(`/Project/${id}`),
    create: (bid: CreateBidDto) => requests.put<HomePageProjectDto>('/Bids/Create', bid),
    accept: (bidId: number) => requests.put<string>(`/Bids/Accept?bidId=${bidId}`,{}),
    update: (project: BidDto) => requests.put<HomePageProjectDto>(`/Project/${project.proposalID}`, project),
    delete: (id: number) => requests.delete<void>(`/Project/${id}`)
};


const Common = {
    proffesionsList: () => requests.get<ISelectOption[]>('/Proffesions'),
    regionsList: () => requests.get<ISelectOption[]>('/Regions'),
    projectFiledsList: () => requests.get<ISelectOption[]>('/ProjectFiledsConroller')
};


const Auth = {
    login: (user: ILoginUser) => requests.post<IAuthResult>(`/Auth/login`, user),
    register: (formData: FormData) => requests.postForm<IAuthResult>(`/Auth/register`, formData),
};


const Files = {
    Upload: (user: ILoginUser) => requests.post<IAuthResult>(`/Auth/login`, user),
    Download: (fileId: number) => requests.specialGet<AxiosResponse>(`/Files/download/${fileId}`, { responseType: 'blob' }, true),
    View: (fileId: number) => requests.get<IAuthResult>(`/Files/file?fileId=${fileId}`),
};


const Users = {
    userDetails: (userId: number) => requests.get<IUserStore>(`/User/${userId}`),
    selectedUserDetails: (userId: number) => requests.get<IUserStore>(`/User/${userId}`),
    update: (user: FormData) => requests.postForm<string>(`/User/update`, user)
};


const agent = {
    Chats,
    Projects,
    Bids,
    Common,
    Auth,
    Files,
    Users
}
export default agent;

