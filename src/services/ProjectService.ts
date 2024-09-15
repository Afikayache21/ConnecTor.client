import dbMock from '../mockDB/mock.json'; // Import the JSON mock data
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

export function getLastProjectsByUserId(userId: number): Project[] {
    const projects = dbMock.projects.filter((p: Project) => 
      p.ClientID === userId || p.ContractorID === userId
    );
  
    return projects;
  }