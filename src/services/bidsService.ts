import { Project , getLastProjectsByUserId } from "./ProjectService";
import {ProjectProposal} from "../types.ts";
import dbMock from '../mockDB/mock.json'; // Import the JSON mock data

export interface ProjectBid implements ProjectProposal {
    ProjectID: number;
    ProposalDate: string;
    ContractorID: number;
    SuggestedStartDate: string;
    AcceptedStatus: boolean;
    ExpectedEndDate: string;
    Comments: string;
    ProposalPrice: number;
  }
// Helper function to get bids by project ID
function getBidsByProjectId(projectId: number): ProjectProposal[] {
    return dbMock.project_proposals.filter(bid => bid.ProjectID === projectId);
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

