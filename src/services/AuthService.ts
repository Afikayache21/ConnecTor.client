// Import the JSON mock data import dbMock from '../mockDB/mock.json'; 

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    regionID: number;            // Made required
    professionID: number;        // Made required and corrected naming
    businessLicenseCode: string; // Required now
    telephone: string;
    userImage?: string | null;
    creationDate?: string;       // Optional in case it's auto-generated server-side
    activeStatus?: boolean;      // Optional in case it's set by the backend
    userTypeID: number;          // Added this property
}
export const register = async (user: IUser): Promise<any> => {
    try {
        const response = await fetch('https://localhost:7198/api/Authentication/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password,      // Changed from userPassword to match Swagger
                firstName: user.firstName,
                lastName: user.lastName,
                regionID: user.regionID,
                professionID: user.professionID,  // Fixed name from professionId to professionID
                businessLicenseCode: user.businessLicenseCode,
                telephone: user.telephone,
                userImage: user.userImage,
                userTypeID: user.userTypeID       // Added to the payload
            }), 
        });

        if (!response.ok) {
            throw new Error('Registration failed.');
        }

        const data = await response.json();
        alert('Registration successful');
        return data;
    } catch (error: any) {
        alert('Registration failed: ' + error.message);
    }
}


export const login = async (user: ILoginUser): Promise<any> => {
    try {
        const response = await fetch('https://localhost:7198/api/Authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user), // Send user email and password
        });

        if (!response.ok) {
            throw new Error('Invalid credentials.');
        }

        const data = await response.json();
        const token = data.token;

        // Store the token in localStorage for future use
        localStorage.setItem('authToken', token);

        // Navigate to the main page
        alert('Login successful');
        return token;
    } catch (error: any) {
        alert('Login failed: ' + error.message);
    }
    return false;
}

