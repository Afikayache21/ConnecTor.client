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
// export const register = async (user: IUser): Promise<any> => {
//     try {       
//         const response =await agent.Auth.register(user);

//         if (!response) {
//             throw new Error('Registration failed.');
//         }

//         const data = response.success
//         alert('Registration successful');
//         return data;
//     } catch (error: any) {
//         alert('Registration failed: ' + error.message);
//     }
// }
export const register = async (user: IUser): Promise<any> => {
    try {
        // Create a FormData object to handle multipart/form-data
        const formData = new FormData();

        // Append fields to FormData
        if (user.userTypeID !== undefined) formData.append('UserTypeID', user.userTypeID.toString());
        if (user.userPassword) formData.append('UserPassword', user.userPassword);
        if (user.email) formData.append('Email', user.email);
        if (user.firstName) formData.append('FirstName', user.firstName);
        if (user.lastName) formData.append('LastName', user.lastName);
        if (user.telephone) formData.append('Telephone', user.telephone);
        if (user.regionID !== undefined) formData.append('RegionID', user.regionID.toString());
        if (user.businessLicenseCode) formData.append('BusinessLicenseCode', user.businessLicenseCode);

        // Append the file (if provided)
        if (user.userImage) {
            formData.append('UserImage', user.userImage);
        }

        // Append profession IDs as a JSON string (if provided)
        if (user.professionIDs && user.professionIDs.length > 0) {
            formData.append('ProfessionIDs', JSON.stringify(user.professionIDs));
        }

        // Send the request using the agent
        const response = await agent.Auth.register(formData);

        if (!response) {
            throw new Error('Registration failed.');
        }

        const data = response.success;
        alert('Registration successful');
        return data;
    } catch (error: any) {
        alert('Registration failed: ' + error.message);
        throw error; // Rethrow the error if further handling is needed
    }
};



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

