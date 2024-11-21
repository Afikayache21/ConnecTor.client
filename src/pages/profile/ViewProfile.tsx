import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBCard,
  MDBCardText,
  MDBRow,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from 'mdb-react-ui-kit';
import './profile.scss';
import ModalBox from '../../components/modals/ModalBox';
import { useStore } from '../../Store/store';
import ProjectDetails from '../projects/ProjectDetails';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router';

const ViewProfile: React.FC = () => {
    console.log("here");
    
    const navigate = useNavigate();
  const { userStore, projectStore } = useStore();
  const { selectedUserProjectsByDeadline , loadProject , selectedProject , loadSelectedUserProjects } = projectStore;


  const { selectedUser  } = userStore;

  const [isProjectModalVisible, setIsProjectModalVisible] = useState<boolean>(false);
  if (!selectedUser) 
  {
    console.log("here");

      navigate('/')
      return
  }

  useEffect(() => {
    if (selectedUserProjectsByDeadline.length === 0) loadSelectedUserProjects(selectedUser.userID);
  }, [selectedUser, loadSelectedUserProjects]);

  useEffect(() => {
    if (selectedUserProjectsByDeadline.length === 0) loadSelectedUserProjects(selectedUser.userID);
  }, [selectedUserProjectsByDeadline.length, loadSelectedUserProjects]);

  const toggleProjectModal = async (projectId: number | null) => {
    if (projectId !== null) {
      await loadProject(projectId);
      setIsProjectModalVisible(true);
    } else {
      setIsProjectModalVisible(false);
    }
  };

  return (
    <div className="profile-page" style={{ width: '100%', backgroundColor: 'none' }}>
      <MDBCol style={{ backgroundColor: '#2a3447' }}>
        <MDBCard style={{ backgroundColor: 'none' }}>
          <div
            className="rounded-top text-white d-flex flex-row"
            style={{ backgroundColor: 'grey', height: '200px' }}
          >
            <div
              className="ms-4 mt-5 d-flex flex-column"
              style={{ width: '150px' }}
            >
              <MDBCardImage
                src={selectedUser?.userImage?selectedUser?.userImage:'./noavatar.png'}
                alt="Profile image"
                className="mt-4 mb-2 img-thumbnail"
                fluid
                style={{ width: '150px', zIndex: '1' }}
              />
            </div>
            <div className="ms-3" style={{ marginTop: '130px' }}>
              <MDBTypography tag="h5">{selectedUser?.firstName + ' ' + selectedUser?.lastName}</MDBTypography>
              <MDBCardText>{selectedUser?.region}</MDBCardText>
            </div>
          </div>
          <div className="p-4 text-black">
            <div className="d-flex justify-content-end text-center py-1">
              <div>
                <MDBCardText className="medium text-muted mb-0">Projects</MDBCardText>
                <MDBCardText className="medium text-muted mb-0">
                  {selectedUserProjectsByDeadline.length}
                </MDBCardText>
              </div>
            </div>
          </div>
          <MDBCardBody className="text-black p-4 about-section">
            <div className="mb-5">
              <h3 style={{ fontFamily: 'bold' }}>About {selectedUser?.firstName}:</h3>
              <div className="p-4">
                <MDBCardText className="font-italic mb-1">Type: {selectedUser?.userType}</MDBCardText>
                <MDBCardText className="font-italic mb-1">Region: {selectedUser?.region}</MDBCardText>
                {selectedUser?.professions && (
                  <MDBCardText className="font-italic mb-0">
                    Professions: {selectedUser?.professions.join(', ')}
                  </MDBCardText>
                )}
              </div>
            </div>
            <div className="projects-content">
              <MDBRow className="g-2 image-container">
                {selectedUserProjectsByDeadline.length > 0 &&
                  selectedUserProjectsByDeadline.map((project, key) => (
                    <MDBCol
                      key={key}
                      onClick={() => toggleProjectModal(project.projectID)}
                      className="mb-2"
                    >
                      <div className="image-wrapper">
                        <MDBCardImage
                          src={project.projectImage}
                          alt="Project image"
                          className="w-100 rounded-3 image"
                        />
                        <div className="overlay">
                          <p className="overlay-text">{project.projectName}</p>
                        </div>
                      </div>
                    </MDBCol>
                  ))
                }
              </MDBRow>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>

      <ModalBox isVisible={isProjectModalVisible} onClose={() => toggleProjectModal(null)}>
        {selectedProject && <ProjectDetails project={selectedProject} />}
      </ModalBox>
    </div>
  );
};

export default observer(ViewProfile);
