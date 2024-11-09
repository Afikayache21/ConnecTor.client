import axios from "axios";
//import {ProjectProposal} from "../types.ts";
import { getToken } from "../Api/agent.ts";

export interface ProjectBid {
    projectID: number;
    projectName: string;
    proposalDate: string;
    comment: string;
    contractorID: number;
    proposalPrice: number;
    acceptedStatus :boolean;

  }


  export async function getUsers10LastBids(): Promise<ProjectBid[]|undefined> {
    try {
      // Make an API call to the backend
  //     const response = axios.get<ProjectBid[]>('https://localhost:5000/api/Project/UserProjects', {
  //       headers: {
  //         'Authorization': `${getToken()}`,
  //     }
  // });
      // Assuming the response returns an array of ProjectDto
      //const projects: ProjectBid[] = response.data;

      //console.log("Sucsses fetching getUsers10LastProjectsBidsByUserId:", projects);
      //const sortedBids = projects.sort((a, b) => new Date(b.proposalDate).getTime() - new Date(a.proposalDate).getTime());
      return [];

    } catch (error) {
      //console.error('Error fetching getUsers10LastProjectsBidsByUserId:', error);
    }    
  }
  

