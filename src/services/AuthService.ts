import dbMock from '../mockDB/mock.json'; // Import the JSON mock data
import { useNavigate } from 'react-router';
// Define the types for the user and the database
interface User {
    email: string;
    password: string;
}

// Login function that validates email and password
export const login = async (user: User): Promise<any> => {
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
// // Define the types for the user and the database
// interface User {
//     email: string;
//     password: string;
// }

// interface MockUser {
//     Email: string;
//     UserPassword: string;
//     [key: string]: any; // Add more properties if needed
// }

// // Define the structure of your mock database if needed
// interface MockDB {
//     users: MockUser[];
// }

// // Assuming `dbMock` matches the `MockDB` structure
// const mockDB: MockDB = dbMock as MockDB; // Cast the imported mock data to the `MockDB` type

// // Login function that validates email and password
// const login = (user: User): MockUser | undefined => {
//     const validUser = mockDB.users.find(u => u.Email === user.email && u.UserPassword === user.password);
//     return validUser;
// };

// Exporting functions for use in other components
// export { login };
