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
    ProfessionId: number ; // nullable field
    BusinessLicenseCode?: string | null; // nullable field
    UserImage: string | null; // nullable field
    Email: string;
    Telephone: string;
    UserPassword: string;
    ActiveStatus: boolean;
    CreationDate: string;
};

// Project Type
export type Project = {
    ProjectID: number;
    ClientID: number;
    ProjectName: string;
    ProjectFieldID: number;
    OpeningDate: string;
    Deadline: string;
    ProjectDescription: string;
    RegionID: number;
    ProjectQuantities?: string | null;
    ConstructionPlans?: string | null;
    ContractorID: number;
    ActualStartDate?: string | null;
    ActualEndDate?: string | null;
    ActualPayment?: number | null;
    ClientReview?: string | null;
    ContractorReview?: string | null;
};

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

// Full Data Structure
export type DataStructure = {
    regions: Region[];
    professions: Profession[];
    project_fields: ProjectField[];
    user_types: UserType[];
    users: User[];
    projects: Project[];
    project_proposals: ProjectProposal[];
    project_images: ProjectImage[];
    ratings: Rating[];
    log_table: LogEntry[];
    messages: Message[];
};