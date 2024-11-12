// import { Project } from '../../services/ProjectService';
// import './projectDetalis.scss';



// interface ProjectDetailsProps {
//     project: Project | null; // Add null if the project can be empty
// }

// const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
//     if (!project) return null;

//     return (
//         <div className="project-details-container">
//             <h2>{project.projectName}</h2>
//             <div className="project-info">
//                 <div>
//                     <strong>Client:</strong> {project.clientFullName}
//                 </div>
//                 <div>
//                     <strong>Contractor:</strong> {project.contractorFullName}
//                 </div>
//                 <div>
//                     <strong>Project Field ID:</strong> {project.projectFieldId}
//                 </div>
//                 <div>
//                     <strong>Opening Date:</strong> {new Date(project.openingDate).toLocaleDateString()}
//                 </div>
//                 <div>
//                     <strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}
//                 </div>
//                 {project.actualStartDate &&
//                     <div>
//                         <strong>Actual Start Date:</strong> {new Date(project.actualStartDate).toLocaleDateString()}
//                     </div>
//                 }

//                 {project.actualEndDate &&
//                     <div>
//                         <strong>Actual End Date:</strong> {new Date(project.actualEndDate).toLocaleDateString()}
//                     </div>
//                 }
//                 {project.actualPayment && 
//                 <div>
//                     <strong>Actual Payment:</strong> ${project.actualPayment.toLocaleString()}
//                 </div>
//                 }
//                 <div className="description">
//                     <strong>Description:</strong> {project.projectDescription}
//                 </div>
//                 <div className="reviews">
//                     <strong>Client Review:</strong> {project.clientReview}
//                 </div>
//                 <div className="reviews">
//                     <strong>Contractor Review:</strong> {project.contractorReview}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ProjectDetails;
import { MDBCol, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import './projectDetalis.scss';
import ModalBox from '../../components/modals/ModalBox';
import { useState } from 'react';
import { Project } from '../../services/ProjectService';
interface ProjectDetailsProps {
    project: Project | null; // Add null if the project can be empty
}
const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    // If no project is passed in, return null
    if (!project) return null;

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <div className="project-details-page" style={{ width: '100%' }}>
            <MDBCol>
                <MDBCard>
                    <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: 'grey', height: '200px' }}>
                        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                            <MDBCardImage
                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                alt="Project Image"
                                className="mt-4 mb-2 img-thumbnail"
                                fluid
                                style={{ width: '150px', zIndex: '1' }}
                            />
                            <MDBBtn onClick={toggleModal} outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                                Edit Project
                            </MDBBtn>
                        </div>
                        <div className="ms-3" style={{ marginTop: '130px' }}>
                            <MDBTypography tag="h5">{project.projectName}</MDBTypography>
                            {/* <MDBCardText>{project.location}</MDBCardText> */}
                        </div>
                    </div>

                    <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="d-flex justify-content-end text-center py-1">
                            <div>
                                <MDBCardText className="mb-1 h5">12</MDBCardText>
                                <MDBCardText className="small text-muted mb-0">Team Members</MDBCardText>
                            </div>
                            <div className="px-3">
                                <MDBCardText className="mb-1 h5">5</MDBCardText>
                                <MDBCardText className="small text-muted mb-0">Tasks</MDBCardText>
                            </div>
                            <div>
                                <MDBCardText className="mb-1 h5">3</MDBCardText>
                                <MDBCardText className="small text-muted mb-0">Completed</MDBCardText>
                            </div>
                        </div>
                    </div>

                    <MDBCardBody className="text-black p-4">
                        <div className="mb-5">
                            <p className="lead fw-normal mb-1">About the Project</p>
                            <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <MDBCardText className="font-italic mb-1"><strong>Client:</strong> {project.clientFullName}</MDBCardText>
                                <MDBCardText className="font-italic mb-1"><strong>Contractor:</strong> {project.contractorFullName}</MDBCardText>
                                <MDBCardText className="font-italic mb-1"><strong>Project Field:</strong> {project.projectFieldId}</MDBCardText>
                                <MDBCardText className="font-italic mb-1"><strong>Opening Date:</strong> {project.openingDate}</MDBCardText>
                                <MDBCardText className="font-italic mb-1"><strong>Deadline:</strong> {project.deadline}</MDBCardText>
                                {project.actualStartDate && (
                                    <MDBCardText className="font-italic mb-1"><strong>Start Date:</strong> {project.actualStartDate}</MDBCardText>
                                )}
                                {project.actualEndDate && (
                                    <MDBCardText className="font-italic mb-1"><strong>End Date:</strong> {project.actualEndDate}</MDBCardText>
                                )}
                                {project.actualPayment && (
                                    <MDBCardText className="font-italic mb-1"><strong>Actual Payment:</strong> ${project.actualPayment}</MDBCardText>
                                )}
                                <MDBCardText className="font-italic mb-1"><strong>Project Description:</strong> {project.projectDescription}</MDBCardText>
                                <MDBCardText className="font-italic mb-1"><strong>Client Review:</strong> {project.clientReview}</MDBCardText>
                                <MDBCardText className="font-italic mb-1"><strong>Contractor Review:</strong> {project.contractorReview}</MDBCardText>
                            </div>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>

            {isModalVisible && (
                <ModalBox 
                    showModal={isModalVisible} 
                    toggleModal={toggleModal} 
                    project={project} 
                />
            )}
        </div>
    );
};

export default ProjectDetails;
