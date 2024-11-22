import { makeAutoObservable, runInAction } from "mobx";
import agent, { getUserId } from "../Api/agent";
import { Project } from "../services/ProjectService";
import { UserProfileDto } from "../components/modals/UserProfileForm";

interface IKeyValue {
  value: number;
  label: string; // Corrected typo from 'lable' to 'label'
}

export interface IUserStore {
  userID: number;
  userTypeID: number;
  userType: string;
  firstName: string;
  lastName: string;
  regionID: number;
  region: string;
  telephone: string;
  email: string;
  userImageFileId?: number;
  userImage?: string; // Assuming this is a URL or base64
  businessLicenseCode?: string;
  professions?: Array<IKeyValue>;
}


export default class UserStore {
  user: IUserStore | null = null; // Current user state
  selectedUser: IUserStore | null = null; // Current user state
  loading: boolean = false; // Track API loading state
  error: string | null = null; // Store error messages

  constructor() {
    makeAutoObservable(this);
    this.setUser = this.setUser.bind(this);

  }


  async UpdateUser(user: UserProfileDto) {
    debugger
    //this.loading = true;
   // this.error = null;

    try {
        // Transform the profile picture to a format suitable for API submission
        const formData = new FormData();
        formData.append('Email', user.email);
        formData.append('UserPassword', user.password);
        formData.append('NewPassword', user.newPassword);
        formData.append('Telephone', user.phoneNumber);
        formData.append('RegionID', user.region?.toString() || '1'); 
        if (user.profilePicture) {
            formData.append('UserImage', user.profilePicture);
        }

        // Call the API with the transformed data
         const res = await agent.Users.update(formData);

        runInAction(() => {
           this.setUser();
            this.loading = false;
        });
        return res;
    } catch (error) {
        runInAction(() => {
            this.error ='An unexpected error occurred';
            this.loading = false;
        });
        console.error('Failed to update user profile:', error);
        return error
    }
}



  // Fetch and set user details
  async setUser() {
    this.loading = true;
    this.error = null;

    try {
      const userId = Number(getUserId());
      if (isNaN(userId)) throw new Error("Invalid user ID");

      const userDetails = await agent.Users.userDetails(userId);

      runInAction(() => {
        this.user = userDetails;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "An unexpected error occurred";
        this.loading = false;
      });
      console.error("Failed to fetch user details:", error);
    }
  }


  setSelectedUser = async (userId: number | null) => {
    if (userId) {


      this.loading = true;
      this.error = null;

      try {
        if (isNaN(userId)) throw new Error("Invalid user ID");

        const userDetails = await agent.Users.userDetails(userId);

        runInAction(() => {
          this.selectedUser = userDetails;
          this.loading = false;
        });
      } catch (error) {
        runInAction(() => {
          this.error = error instanceof Error ? error.message : "An unexpected error occurred";
          this.loading = false;
        });
        console.error("Failed to fetch selected User details:", error);
      }
    }
    else{
      this.selectedUser = null;
    }

  }


  // Clear the user state
  clearUser() {
    this.user = null;
    this.error = null;
  }

  // Computed property: Full name of the user
  get fullName(): string {
    return `${this.user?.firstName ?? ""} ${this.user?.lastName ?? ""}`.trim();
  }

  // Computed property: Whether the store is ready
  get isReady(): boolean {
    return this.user !== null && !this.loading;
  }

  // Computed property: Professions as a comma-separated string
  get professionList(): string {
    return this.user?.professions?.map((p) => p.label).join(", ") ?? "No professions listed";
  }
}