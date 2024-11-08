// import { makeAutoObservable } from "mobx";

// // Define a TypeScript interface for User data
// interface IUser {
//     UserID: number | null;
//     UserTypeID: number | null;
//     UserName: string;
//     UserPassword: string;
//     FirstName: string;
//     LastName: string;
//     ActiveStatus: boolean;
//     RegionID: number | null;
//     ProfessionID: number | null;
//     BusinessLicenseCode: string;
//     UserImage: string | null;
//     Email: string;
//     Telephone: string;
//     CreationDate: Date;
//     token: string | null;
// }
// interface IUserType {
//     UserID: number | null;
//     UserTypeID: number | null;
//     UserName: string;
//     FirstName: string;
//     LastName: string;
//     ProfessionID: number | null;
//     UserImage: string | null;
//     Email: string;
//     Telephone: string;
//     token: string | null;
// }
// class User implements IUser {
//     UserID: number | null = null;
//     UserTypeID: number | null = null;
//     UserName: string = "";
//     UserPassword: string = "";
//     FirstName: string = "";
//     LastName: string = "";
//     ActiveStatus: boolean = false;
//     RegionID: number | null = null;
//     ProfessionID: number | null = null;
//     BusinessLicenseCode: string = "";
//     UserImage: string | null = null;
//     Email: string = "";
//     Telephone: string = "";
//     CreationDate: Date = new Date();
//     token: string | null = null;

//     constructor() {
//         makeAutoObservable(this);
//     }

//     // User properties setters
//     setUserID(id: number | null): void {
//         this.UserID = id;
//     }

//     setUserTypeID(typeID: number | null): void {
//         this.UserTypeID = typeID;
//     }

//     setUserName(name: string): void {
//         this.UserName = name;
//     }

//     setUserPassword(password: string): void {
//         this.UserPassword = password;
//     }

//     setFirstName(firstName: string): void {
//         this.FirstName = firstName;
//     }

//     setLastName(lastName: string): void {
//         this.LastName = lastName;
//     }

//     setActiveStatus(status: boolean): void {
//         this.ActiveStatus = status;
//     }

//     setRegionID(regionID: number | null): void {
//         this.RegionID = regionID;
//     }

//     setProfessionID(professionID: number | null): void {
//         this.ProfessionID = professionID;
//     }

//     setBusinessLicenseCode(code: string): void {
//         this.BusinessLicenseCode = code;
//     }

//     setUserImage(image: string | null): void {
//         this.UserImage = image;
//     }

//     setEmail(email: string): void {
//         this.Email = email;
//     }

//     setTelephone(telephone: string): void {
//         this.Telephone = telephone;
//     }

//     setToken(token: string | null): void {
//         this.token = token;
//     }

//     setCreationDate(date: Date): void {
//         this.CreationDate = date;
//     }
// }

// class UserStore {
//     currentUser: User | null = null; // Store only one user

//     constructor() {
//         makeAutoObservable(this);
//     }

//     // Method to set the current user
//     setCurrentUser(userData: string): void {
//         if (!this.currentUser) {
//             let res :any =  
//             this.currentUser = new User(); // Initialize currentUser if it doesn't exist
//         }
//         Object.assign(this.currentUser, userData); // Update user data
//     }

//     // Method to clear the current user (e.g., on logout)
//     clearCurrentUser(): void {
//         this.currentUser = null;
//     }

//     // Get method to return the current user data
//     getCurrentUser(): User | null {
//         return this.currentUser;
//     }

//     // Check if a user is logged in
//     isAuthenticated(): boolean {
//         return this.currentUser !== null && this.currentUser.token !== null;
//     }
// }

// const userStore = new UserStore();
// export default userStore;


import { makeAutoObservable } from "mobx";
import { Project } from "../types";

interface IProffesion {
  professionID: number;
  professionName: string;
}

interface IProject {
  projectID: number;
  project: Project;
}

interface IUser {
  userID: number;
  userTypeID: number;
  firstName: string;
  lastName: string;
  userType?: string;
  regionID: number;
  region?: string;
  email: string;
  activeStatus: boolean;
  businessLicenseCode?: string;
  userImageFileId?: number;
  userImage?: Uint8Array;
  telephone: string;
  userProfessions?: Array<IProffesion>;
  projects?: Array<IProject>;
}

export default class UserStore {
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(userData: IUser) {
    this.user = userData;
  }

  clearUser() {
    this.user = null;
  }

  get isActive() {
    return this.user?.activeStatus ?? false;
  }

  get fullName() {
    return `${this.user?.firstName ?? ""} ${this.user?.lastName ?? ""}`;
  }

  // Computed property to convert userImage byte array to base64
  get userImageBase64(): string | null {
    if (!this.user?.userImage) return null;

    const buffer = this.user.userImage;
    let binary = '';
    const len = buffer.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(buffer[i]);
    }
    return `data:image/jpeg;base64,${window.btoa(binary)}`;
  }
}

