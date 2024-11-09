import { getToken } from '../Api/agent';
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

// export async function getAllProjects(): Promise<HomePageProjectDto[]> {
//   try {
//     // Make an API call to the backend
//     const response = await axios.get<HomePageProjectDto[]>('https://localhost:5000/api/Project/UserProjects', {
//       headers: {
//           'Authorization': `Bearer ${getToken()}`,
//           'Content-Type': 'application/json'
//       }
//   });

//     // Assuming the response returns an array of HomePageProjectDto
//     const projects: HomePageProjectDto[] = response.data;
//     console.log(projects);
    
//     return projects;
//   } catch (error) {
//     console.error('Error fetching last projects:', error);
//     return [];
//   }
// }


// export async function getUsers10LastProjectsByUserId(): Promise<HomePageProjectDto[]> {
//   try {
//     // let userId = localStorage.getItem('userId')
//     // Make an API call to the backend
//     const response = await axios.get(`https://localhost:5000/api/Project/UserProjects`);
//     console.log(response);

//     // Assuming the response returns an array of HomePageProjectDto
//     const projects: HomePageProjectDto[] = response.data;

//     return projects;
//   } catch (error) {
//     console.error('Error fetching last getUsers10LastProjects:', error);
//     return [];
//   }
// }

// export function getLastProjectsByUserId(userId: number): Project[] {
//   const projects = dbMock.projects.filter((p: Project) =>
//     p.ClientID === userId || p.ContractorID === userId
//   );

//   return projects;
// }