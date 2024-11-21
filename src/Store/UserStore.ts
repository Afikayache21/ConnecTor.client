import { makeAutoObservable, runInAction } from "mobx";
import agent, { getUserId } from "../Api/agent";
import { Project } from "../services/ProjectService";

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