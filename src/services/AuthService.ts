// Import the JSON mock data import dbMock from '../mockDB/mock.json'; 

import agent from "../Api/agent";

export interface ILoginUser {
    email: string;
    password: string;
}
export interface IAuthResult
{
     success :boolean;
     token :string; // Can be JWT or Session token
     message :string;
}
export interface IUser {
    userTypeID?: number;  
    userPassword?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    telephone?: string;
    regionID?: number;           
    userImage?: File; // Changed from string | null to File
    businessLicenseCode?: string;
    professionIDs?: number[];     
}
export const register = async (user: IUser): Promise<any> => {
    try {       
        const response =await agent.Auth.register(user);

        if (!response) {
            throw new Error('Registration failed.');
        }

        const data = response.success
        alert('Registration successful');
        return data;
    } catch (error: any) {
        alert('Registration failed: ' + error.message);
    }
}



export const login = async (user: ILoginUser): Promise<any> => {
    try {
        const response = await fetch('https://localhost:5000/api/Auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Invalid credentials.');
        }

        const data = await response.json();
        const token = data.token;

        // Store the token in localStorage for future use
        localStorage.setItem('userToken', token);

        // Navigate to the main page
        alert('Login successful');
        return token;
    } catch (error: any) {
        alert('Login failed: ' + error.message);
    }
    return false;
}

