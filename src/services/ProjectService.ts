
export type Project = {
  ProjectID: number;
  ClientID: number;
  ProjectName: string;
  ProjectFieldID: number;
  OpeningDate: string;
  Deadline: string;
  ProjectDescription: string;
  RegionID: number;
  ContractorID: number;
  ActualStartDate: string | null;
  ActualEndDate: string | null;
  ActualPayment: number | null;
  ClientReview: string | null;
  ContractorReview: string | null;
}

export interface HomePageProjectDto {
  id:number;
  projectID: number;
  projectName: string;
  projectDescription: string;
  projectFieldName:string
  deadline: Date;//| string;
  region: string;
}
export interface ProjectDto2 {
  projectID: number;
  projectName: string;
  projectDescription: string;
  clientName: string;
  openingDate:string
  deadline: string;
  projectFieldName:string
  region:string
}

