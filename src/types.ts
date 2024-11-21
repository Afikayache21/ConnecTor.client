// Region Type
export type Region = {
    RegionID: number;
    RegionDescription: string;
};

// Profession Type
export type Profession = {
    ProfessionID: number;
    ProfessionDescription: string;
};

// Project Field Type
export type ProjectField = {
    ProjectFieldID: number;
    ProjectFieldDescription: string;
};

// User Type
export type UserType = {
    UserTypeID: number;
    UserTypeDescription: string;
};

// User Type
export type User = {
    UserID: number;
    UserTypeID: number;
    FirstName: string;
    LastName: string;
    RegionID: number;
    ProfessionId: number ; 
    BusinessLicenseCode?: string | null; // nullable field
    UserImage: string | null; // nullable field
    Email: string;
    Telephone: string;
    ActiveStatus: boolean;
    CreationDate: string;
};

// Project Type
// export type Project = {
//     ProjectID: number;
//     ClientID: number;
//     ProjectName: string;
//     ProjectFieldID: number;
//     OpeningDate: string;
//     Deadline: string;
//     ProjectDescription: string;
//     RegionID: number;
//     ProjectQuantities?: string | null;
//     ConstructionPlans?: string | null;
//     ContractorID?: number| null;
//     ActualStartDate?: string | null;
//     ActualEndDate?: string | null;
//     ActualPayment?: number | null;
//     ClientReview?: string | null;
//     ContractorReview?: string | null;
// };
// export type CreateProjectModel = {
//     //ClientID: number;
//     ProjectName: string;
//     OpeningDate: string;
//     Deadline: string;
//     ProjectDescription: string;
//     RegionID: number;
//     ProjectQuantities?: File | null;  // Changed to File to reflect uploaded files
//     ConstructionPlans?: File | null;   // 
// };

interface File {
    fileName: string;
    fileSize: number;
    fileType: string;
}

export interface CreateProjectModel {
    ProjectName: string;
    ProjectFieldID: number;
    OpeningDate: Date;
    Deadline: Date;
    ProjectDescription: string;
    RegionID: number;
    ProjectQuantities: File;
    ConstructionPlans: File;    
    Image: File;
}





// export interface CreateProjectModel {
//     ClientId: number;
//     ProjectName: string;
//     ProjectFieldID: number;
//     OpeningDate: Date;
//     Deadline: Date;
//     ProjectDescription: string;
//     RegionID: number;
//     ProjectQuantities: File;
//     ConstructionPlans: File;
//     ContractorID?: number;
//     ActualStartDate?: Date;
//     ActualEndDate?: Date;
//     ActualPayment?: number;
//     ClientReview?: string;
//     ContractorReview?: string;
//     Images?: File[];
// }




// Project Proposal Type
export type ProjectProposal = {
    ProjectID: number;
    ProposalDate: string;
    ContractorID: number;
    SuggestedStartDate: string;
    AcceptedStatus: boolean;
    ExpectedEndDate: string;
    Comments: string;
    ProposalPrice: number;
};

// Project Image Type
export type ProjectImage = {
    ProjectID: number;
    ImageID: number;
    Image?: string | null;
    UploadDate: string;
    ImageDescription: string;
};

// Rating Type
export type Rating = {
    RaterUserID: number;
    RatedUserID: number;
    RatingDate: string;
    RatingValue: number;
    Comments: string;
};

// Log Entry Type
export type LogEntry = {
    LogID: number;
    LogMessage: string;
    LogDateTime: string;
};

// Message Type
export type Message = {
    Id: number;
    Content: string;
    Timestamp: string;
    SenderId: number;
    ReceiverId: number;
    IsRead: boolean;
};
export type Chat ={
     ChatId : number ;
    FirstUserId : number ;
     SecondUserId : number ;
     LastSenderId : number ;
     IsRead :boolean;
}
// Full Data Structure
// export type DataStructure = {
//     regions: Region[];
//     professions: Profession[];
//     project_fields: ProjectField[];
//     user_types: UserType[];
//     users: User[];
//     projects: Project[];
//     project_proposals: ProjectProposal[];
//     project_images: ProjectImage[];
//     ratings: Rating[];
//     log_table: LogEntry[];
//     messages: Message[];
// };