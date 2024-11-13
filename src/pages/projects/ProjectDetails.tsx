import { Project } from '../../services/ProjectService';
import './projectDetalis.scss';

interface ProjectDetailsProps {
  project: Project | null;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  if (!project) return null;

  return (
    <div className="project-details-container">
      <h2 className="project-title">{project.projectName}</h2>
      <div className="project-content">
        <div className="project-info">
          <div className="info-item">
            <span className="info-label">Client:</span> {project.clientFullName}
          </div>
          <div className="info-item">
            <span className="info-label">Contractor:</span> {project.contractorFullName}
          </div>
          <div className="info-item">
            <span className="info-label">Project Field ID:</span> {project.projectFieldId}
          </div>
          <div className="info-item">
            <span className="info-label">Opening Date:</span> {new Date(project.openingDate).toLocaleDateString()}
          </div>
          <div className="info-item">
            <span className="info-label">Deadline:</span> {new Date(project.deadline).toLocaleDateString()}
          </div>
          {project.actualStartDate && (
            <div className="info-item">
              <span className="info-label">Actual Start Date:</span> {new Date(project.actualStartDate).toLocaleDateString()}
            </div>
          )}
          {project.actualEndDate && (
            <div className="info-item">
              <span className="info-label">Actual End Date:</span> {new Date(project.actualEndDate).toLocaleDateString()}
            </div>
          )}
          {project.actualPayment && (
            <div className="info-item">
              <span className="info-label">Actual Payment:</span> ${project.actualPayment.toLocaleString()}
            </div>
          )}
          <div className="description">
            <strong>Description:</strong> {project.projectDescription}
          </div>
          <div className="reviews">
            <strong>Client Review:</strong> {project.clientReview}
          </div>
          <div className="reviews">
            <strong>Contractor Review:</strong> {project.contractorReview}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;


// import { MDBCol, MDBCard, MDBCardText, MDBCardBody, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
// import './projectDetalis.scss';
// import { Project } from '../../services/ProjectService';
// interface ProjectDetailsProps {
//     project: Project | null; // Add null if the project can be empty
// }
// const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {

//     // If no project is passed in, return null
//     if (!project) return null;


//     return (
//         <div className="project-details-page" style={{ width: '100%' }}>
//             <MDBCol >
//                 <MDBCard >
//                     <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: 'grey', height: '200px' }}>
//                         <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>

//                             <MDBBtn onClick={() => console.log("need to implemant the edit navigation")} outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
//                                 Edit Project
//                             </MDBBtn>
//                         </div>
//                         <div className="ms-3" style={{ marginTop: '130px' }}>
//                             <MDBTypography tag="h5">{project.projectName}</MDBTypography>
//                             {/* <MDBCardText>{project.location}</MDBCardText> */}
//                         </div>
//                     </div>

//                     <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
//                         <div className="d-flex justify-content-end text-center py-1">
//                             <div>
//                                 <MDBCardText className="mb-1 h5">12</MDBCardText>
//                                 <MDBCardText className="small text-muted mb-0">Team Members</MDBCardText>
//                             </div>
//                             <div className="px-3">
//                                 <MDBCardText className="mb-1 h5">5</MDBCardText>
//                                 <MDBCardText className="small text-muted mb-0">Tasks</MDBCardText>
//                             </div>
//                             <div>
//                                 <MDBCardText className="mb-1 h5">3</MDBCardText>
//                                 <MDBCardText className="small text-muted mb-0">Completed</MDBCardText>
//                             </div>
//                         </div>
//                     </div>

//                     <MDBCardBody className="text-black p-4">
//                         <div className="mb-5">
//                             <p className="lead fw-normal mb-1">About the Project</p>
//                             <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
//                                 <MDBCardText className="font-italic mb-1"><strong>Client:</strong> {project.clientFullName}</MDBCardText>
//                                 <MDBCardText className="font-italic mb-1"><strong>Contractor:</strong> {project.contractorFullName}</MDBCardText>
//                                 <MDBCardText className="font-italic mb-1"><strong>Project Field:</strong> {project.projectFieldId}</MDBCardText>
//                                 <MDBCardText className="font-italic mb-1"><strong>Opening Date:</strong> {project.openingDate}</MDBCardText>
//                                 <MDBCardText className="font-italic mb-1"><strong>Deadline:</strong> {project.deadline}</MDBCardText>
//                                 {project.actualStartDate && (
//                                     <MDBCardText className="font-italic mb-1"><strong>Start Date:</strong> {project.actualStartDate}</MDBCardText>
//                                 )}
//                                 {project.actualEndDate && (
//                                     <MDBCardText className="font-italic mb-1"><strong>End Date:</strong> {project.actualEndDate}</MDBCardText>
//                                 )}
//                                 {project.actualPayment && (
//                                     <MDBCardText className="font-italic mb-1"><strong>Actual Payment:</strong> ${project.actualPayment}</MDBCardText>
//                                 )}
//                                 <MDBCardText style={{color:'black'}} className="font-italic mb-1"><strong>Project Description:</strong> {project.projectDescription}</MDBCardText>
//                                 <MDBCardText className="font-italic mb-1"><strong>Client Review:</strong> {project.clientReview}</MDBCardText>
//                                 <MDBCardText className="font-italic mb-1"><strong>Contractor Review:</strong> {project.contractorReview}</MDBCardText>
//                             </div>
//                         </div>
//                     </MDBCardBody>
//                 </MDBCard>
//             </MDBCol>
//         </div>
//     );
// };

// export default ProjectDetails;
