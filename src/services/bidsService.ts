import { Project , getLastProjectsByUserId } from "./ProjectService";
import {formatDate} from './DateService.ts'
import {ProjectProposal} from "../types.ts";
import dbMock from '../mockDB/mock.json'; // Import the JSON mock data
import axios from "axios";

export interface ProjectBid {
    projectID: number;
    projectName: string;
    proposalDate: string;
    comment: string;
    contractorID: number;
    proposalPrice: number;
    acceptedStatus :boolean;

  }
// Helper function to get bids by project ID
// function getBidsByProjectId(projectId: number): ProjectProposal[] {
//     return dbMock.project_proposals.filter(bid => bid.ProjectID === projectId);
//   }

  export async function getUsers10LastProjectsBidsByUserId(userId: number): Promise<ProjectBid[]|undefined> {
    try {
      // Make an API call to the backend
      const response = await axios.get(`https://localhost:7198/api/Projects/bids?id=${userId}&amount=10`);
  
      // Assuming the response returns an array of ProjectDto
      const projects: ProjectBid[] = response.data;

      console.log("Sucsses fetching getUsers10LastProjectsBidsByUserId:", projects);

      return projects;

    } catch (error) {
      console.error('Error fetching getUsers10LastProjectsBidsByUserId:', error);
    }    
  }
  
  export async function getLastBidsByUserId(userId: number): Promise<ProjectProposal[]> {
    const projects = await getLastProjectsByUserId(userId);
    
    // Filter and get bids for the retrieved projects
    const projectIds = projects.map(project => project.ProjectID);
    const allBids = dbMock.project_proposals.filter(bid => projectIds.includes(bid.ProjectID));
  
    // Optionally sort bids by ProposalDate if needed
    const sortedBids = allBids.sort((a, b) => new Date(b.ProposalDate).getTime() - new Date(a.ProposalDate).getTime());
  
    return sortedBids;
  }

