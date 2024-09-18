import dbMock from '../mockDB/mock.json'; // Import the JSON mock data
import axios from 'axios';

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

export interface ProjectDto {
  projectId: number;
  projectName: string;
  projectDescription: string;
  deadline: string;
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

export async function getAllProjects(): Promise<ProjectDto2[]> {
  try {
    // Make an API call to the backend
    const response = await axios.get(`https://localhost:7198/api/Projects`);

    // Assuming the response returns an array of ProjectDto
    const projects: ProjectDto2[] = response.data;
    console.log(projects);
    
    return projects;
  } catch (error) {
    console.error('Error fetching last projects:', error);
    return [];
  }
}


export async function getUsers10LastProjectsByUserId(userId: number): Promise<ProjectDto[]> {
  try {
    // Make an API call to the backend
    const response = await axios.get(`https://localhost:7198/api/Projects/last?id=${userId}&amount=10`);

    // Assuming the response returns an array of ProjectDto
    const projects: ProjectDto[] = response.data;

    return projects;
  } catch (error) {
    console.error('Error fetching last projects:', error);
    return [];
  }
}

export function getLastProjectsByUserId(userId: number): Project[] {
  const projects = dbMock.projects.filter((p: Project) =>
    p.ClientID === userId || p.ContractorID === userId
  );

  return projects;
}