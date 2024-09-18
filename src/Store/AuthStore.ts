import { makeAutoObservable } from 'mobx';

class AuthStore {
  isLoggedIn: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.checkLocalStorage(); // Initialize from localStorage on creation
  }

  // Check if user is logged in based on localStorage
  checkLocalStorage() {
    const storedLogin = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = storedLogin === 'true';
  }

  // Action to handle login
  login(username: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username); // Save username or other user info
    this.isLoggedIn = true;
  }

  // Action to handle logout
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.isLoggedIn = false;
  }
}

const authStore = new AuthStore();
export default authStore;
