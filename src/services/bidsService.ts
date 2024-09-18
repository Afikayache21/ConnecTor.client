import axios from "axios";
import {ProjectProposal} from "../types.ts";

export interface ProjectBid {
    projectID: number;
    projectName: string;
    proposalDate: string;
    comment: string;
    contractorID: number;
    proposalPrice: number;
    acceptedStatus :boolean;

  }


  export async function getUsers10LastProjectsBidsByUserId(userId: number): Promise<ProjectBid[]|undefined> {
    try {
      // Make an API call to the backend
      const response = await axios.get(`https://localhost:7198/api/Projects/bids?id=${userId}&amount=10`);
  
      // Assuming the response returns an array of ProjectDto
      const projects: ProjectBid[] = response.data;

      console.log("Sucsses fetching getUsers10LastProjectsBidsByUserId:", projects);
      const sortedBids = projects.sort((a, b) => new Date(b.proposalDate).getTime() - new Date(a.proposalDate).getTime());
      return sortedBids;

    } catch (error) {
      console.error('Error fetching getUsers10LastProjectsBidsByUserId:', error);
    }    
  }
  

