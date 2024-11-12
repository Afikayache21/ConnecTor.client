// import { makeAutoObservable, runInAction } from 'mobx';
// import { login, ILoginUser } from '../services/AuthService';
// import * as Jwt from 'jwt-decode';


// interface MyPayLoad extends Jwt.JwtPayload {
//   UserType: string;
//   UserId: string;
//   FirstName: string;
//   LastName: string;
// }

// export default class AuthStore {
//   isLoggedIn = false;
//   email: string | null = null;
//   loading = false;
//   userType: string | null = null;
//   userId: string | null = null;

//   constructor() {
//     makeAutoObservable(this);
//     this.initializeFromLocalStorage();
//   }

//   setLoading(userData: boolean) {
//     this.loading = userData;
//   }
//   // Initialize user information from localStorage
//   initializeFromLocalStorage() {
//     const storedLogin = localStorage.getItem('isLoggedIn');
//     this.isLoggedIn = storedLogin === 'true';
//     this.email = localStorage.getItem('email');
//     this.userType = localStorage.getItem('userType');
//   }

//   // Action to handle login
//   async login(username: string, password: string) {
//     //this.setLoading(true);
//     try {
//       //this.loading = true;
//       const user: ILoginUser = { email: username, password };

//       const response = await login(user); // Call the login service
//       const res: MyPayLoad = Jwt.jwtDecode(response)


//       runInAction(() => {

//         // Persist to localStorage
//         localStorage.setItem('isLoggedIn', 'true');
//         localStorage.setItem('email', username);
//         localStorage.setItem('userType', res.UserType);
//         localStorage.setItem('userId', res.UserId);
//         localStorage.setItem('firstName', res.FirstName);
//         localStorage.setItem('lastName', res.LastName);



//       });
//       return res.UserId;
//     } catch (error) {
//       //this.loading = false;
//       runInAction(() => {
//         //this.setLoading(false);

//         console.error("Login failed:", error);
//       });
//     }

//   }

//   // Action to handle logout
//   logout() {
//     this.isLoggedIn = false;
//     this.email = null;
//     this.userType = null;

//     // Clear from localStorage
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('username');
//     localStorage.removeItem('userType');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('firstName');
//     localStorage.removeItem('lastName');
//   }


// }


import { makeAutoObservable, runInAction } from 'mobx';
import { login, ILoginUser } from '../services/AuthService';
import { register, IUser } from '../services/AuthService'; // Assuming you will add a register service
import * as Jwt from 'jwt-decode';

interface MyPayLoad extends Jwt.JwtPayload {
  UserType: string;
  UserId: string;
  FirstName: string;
  LastName: string;
}

export default class AuthStore {
  isLoggedIn = false;
  email: string | null = null;
  loading = false;
  userType: string | null = null;
  userId: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.initializeFromLocalStorage();
  }

  setLoading(userData: boolean) {
    this.loading = userData;
  }

  // Initialize user information from localStorage
  initializeFromLocalStorage() {
    const storedLogin = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = storedLogin === 'true';
    this.email = localStorage.getItem('email');
    this.userType = localStorage.getItem('userType');
  }

  // Action to handle login
  async login(username: string, password: string) {
    try {
      const user: ILoginUser = { email: username, password };
      const response = await login(user); // Call the login service
      const res: MyPayLoad = Jwt.jwtDecode(response);

      runInAction(() => {
        // Persist to localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('email', username);
        localStorage.setItem('userType', res.UserType);
        localStorage.setItem('userId', res.UserId);
        localStorage.setItem('firstName', res.FirstName);
        localStorage.setItem('lastName', res.LastName);
      });

      return res.UserId;
    } catch (error) {
      runInAction(() => {
        console.error("Login failed:", error);
      });
    }
  }

  // Action to handle logout
  logout() {
    this.isLoggedIn = false;
    this.email = null;
    this.userType = null;

    // Clear from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
  }

  // Register action to handle registration
  async register(userData: IUser) {
    this.setLoading(true);

    try {
      const response = await register(userData); 
      return response.UserId;
    } catch (error) {
      runInAction(() => {
        console.error("Registration failed:", error);
      });
    } finally {
      this.setLoading(false);
    }
  }
}
