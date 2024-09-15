import { makeAutoObservable } from "mobx";

// Define a TypeScript interface for User data
interface IUser {
    UserID: number | null;
    UserTypeID: number | null;
    UserName: string;
    UserPassword: string;
    FirstName: string;
    LastName: string;
    ActiveStatus: boolean;
    RegionID: number | null;
    ProfessionID: number | null;
    BusinessLicenseCode: string;
    UserImage: string | null;
    Email: string;
    Telephone: string;
    CreationDate: Date;
}

class User implements IUser {
    UserID: number | null = null;
    UserTypeID: number | null = null;
    UserName: string = "";
    UserPassword: string = "";
    FirstName: string = "";
    LastName: string = "";
    ActiveStatus: boolean = false;
    RegionID: number | null = null;
    ProfessionID: number | null = null;
    BusinessLicenseCode: string = "";
    UserImage: string | null = null;
    Email: string = "";
    Telephone: string = "";
    CreationDate: Date = new Date();

    constructor() {
        makeAutoObservable(this);
    }

    setUserID(id: number | null): void {
        this.UserID = id;
    }

    setUserTypeID(typeID: number | null): void {
        this.UserTypeID = typeID;
    }

    setUserName(name: string): void {
        this.UserName = name;
    }

    setUserPassword(password: string): void {
        this.UserPassword = password;
    }

    setFirstName(firstName: string): void {
        this.FirstName = firstName;
    }

    setLastName(lastName: string): void {
        this.LastName = lastName;
    }

    setActiveStatus(status: boolean): void {
        this.ActiveStatus = status;
    }

    setRegionID(regionID: number | null): void {
        this.RegionID = regionID;
    }

    setProfessionID(professionID: number | null): void {
        this.ProfessionID = professionID;
    }

    setBusinessLicenseCode(code: string): void {
        this.BusinessLicenseCode = code;
    }

    setUserImage(image: string | null): void {
        this.UserImage = image;
    }

    setEmail(email: string): void {
        this.Email = email;
    }

    setTelephone(telephone: string): void {
        this.Telephone = telephone;
    }

    setCreationDate(date: Date): void {
        this.CreationDate = date;
    }
}

class UserStore {
    users: User[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addUser(user: User): void {
        this.users.push(user);
    }

    removeUser(userID: number): void {
        this.users = this.users.filter(user => user.UserID !== userID);
    }

    updateUser(userID: number, newUserData: Partial<IUser>): void {
        const userIndex = this.users.findIndex(user => user.UserID === userID);
        if (userIndex > -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...newUserData } as User;
        }
    }

    getUser(userID: number): User | undefined {
        return this.users.find(user => user.UserID === userID);
    }

    getAllUsers(): User[] {
        return this.users;
    }
}

const userStore = new UserStore();
export default userStore;
