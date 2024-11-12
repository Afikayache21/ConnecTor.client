
export interface Project {
  projectID: number;
  clientID: number;
  clientFullName: string;
  projectName: string;
  projectFieldId: number;
  openingDate: string;
  deadline: string;
  projectDescription: string;
  regionID: number;
  contractorID: number|null;
  contractorFullName: string|null;
  actualStartDate: string|null;
  actualEndDate: string|null;
  actualPayment: number|null;
  clientReview: string|null;
  contractorReview: string |null;
   // ProjectQuantities?: string | null;
  // ConstructionPlans?: string | null;
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
