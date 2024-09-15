import dbMock from '../../../mockDB/mock.json'; // Import the JSON mock data


// Login function that validates email and password
const login = (user) => {
    const validUser = dbMock.users.find(u => u.Email === user.email && u.UserPassword === user.password);
    return validUser;
};



// Exporting functions for use in other components
export { login };
