import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBCard,
  MDBCardText,
  MDBRow,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from 'mdb-react-ui-kit';
import './profile.scss';
import ModalBox from '../../components/modals/ModalBox';
import { useStore } from '../../Store/store';
import ProjectDetails from '../projects/ProjectDetails';
import { observer } from 'mobx-react';
import BidDetails from '../../components/modals/childrens/BidDetails';
import ChatWindow from '../../components/topBox/lastChats/ChatWindow';
import { CreateBidDto } from '../../Store/bidsStore';
import CreateBidForm from '../../components/modals/childrens/CreateBidForm';

const Profile: React.FC = () => {
  const { userStore, projectStore, bidsStore, chatsStore } = useStore();
  const { projectsByDeadline, loadProject, selectedProject, loadProjects } = projectStore;
  const { selectedChat, loadChat } = chatsStore;
  const { user, setUser } = userStore;
  const { bidsSortedByProposalDate, loadBids, setSelectedBid, selectedBid } = bidsStore;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isProjectModalVisible, setIsProjectModalVisible] = useState<boolean>(false);
  const [isBidModalVisible, setIsBidModalVisible] = useState<boolean>(false);
  const [isChatModalVisible, setIsChatModalVisible] = useState<boolean>(false);
  const [isCreateBidModalVisible, setIsCreateBidModalVisible] = useState<boolean>(false);
  const [selectedProjectForBid, setSelectedProjectForBid] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'bids'>('projects');

  useEffect(() => {
    if (!user) setUser();
  }, [user, setUser]);

  useEffect(() => {
    if (projectsByDeadline.length === 0) loadProjects();
  }, [projectsByDeadline.length, loadProjects]);

  useEffect(() => {
    if (bidsSortedByProposalDate.length === 0) loadBids();
  }, [bidsSortedByProposalDate.length, loadBids, selectedBid]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleProjectModal = async (projectId: number | null) => {
    if (projectId !== null) {
      await loadProject(projectId);
      setIsProjectModalVisible(true);
    } else {
      setIsProjectModalVisible(false);
    }
  };

  const toggleBidModal = async (BidId: number | null) => {
    if (BidId) {
      setSelectedBid(BidId);
      setIsBidModalVisible(true);
    } else {
      setIsBidModalVisible(false);
    }
  };

  const toggleChatModal = async (ChatId: number | null | undefined) => {
    if (ChatId) {
      if (isProjectModalVisible) setIsProjectModalVisible(false);
      if (isBidModalVisible) setIsBidModalVisible(false);
      await loadChat(ChatId);
      setIsChatModalVisible(true);
      return;
    }
    setIsChatModalVisible(false);
  };

  const toggleCreateBidModal = (projectId: number | null) => {
    if (projectId !== null) {
      setSelectedProjectForBid(projectId);
      setIsProjectModalVisible(false)
      setIsCreateBidModalVisible(true);
    } else {
      setSelectedProjectForBid(null);
      setIsCreateBidModalVisible(false);
    }
  };

  const handleCreateBid = async (bidData: CreateBidDto) => {
    try {
      await bidsStore.createBid(bidData);
      setIsCreateBidModalVisible(false);
    } catch (error) {
      console.error('Error creating bid:', error);
    }
  };

  const handleTabClick = (tab: 'projects' | 'bids') => {
    setActiveTab(tab);
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
                src={user?.userImage ?user?.userImage :'noavatar.png'}
                alt="Profile image"
                className="mt-4 mb-2 img-thumbnail"
                fluid
                style={{ width: '150px', zIndex: '1' }}
              />
              <MDBBtn
                onClick={toggleModal}
                outline
                color="dark"
                style={{ height: '36px', overflow: 'visible' }}
              >
                Edit profile
              </MDBBtn>
            </div>
            <div className="ms-3" style={{ marginTop: '130px' }}>
              <MDBTypography tag="h5">{user?.firstName + ' ' + user?.lastName}</MDBTypography>
              <MDBCardText>{user?.region}</MDBCardText>
            </div>
          </div>
          <div className="p-4 text-black">
            <div className="d-flex justify-content-end text-center py-1">
              <div>
                <MDBCardText className="medium text-muted mb-0">Projects</MDBCardText>
                <MDBCardText className="medium text-muted mb-0">
                  {projectsByDeadline.length}
                </MDBCardText>
              </div>
              <div className="px-3">
                <MDBCardText className="medium text-muted mb-0">Bids</MDBCardText>
                <MDBCardText className="medium text-muted mb-0">
                  {bidsSortedByProposalDate.length}
                </MDBCardText>
              </div>
            </div>
          </div>
          <MDBCardBody className="text-black p-4 about-section">
            <div className="mb-5">
              <h3 style={{ fontFamily: 'bold' }}>About {user?.firstName}:</h3>
              <div className="p-4">
                <MDBCardText className="font-italic mb-1">Type: {user?.userType}</MDBCardText>
                <MDBCardText className="font-italic mb-1">Region: {user?.region}</MDBCardText>
                {user?.professions && (
                  <MDBCardText className="font-italic mb-0">
                    Professions: {user?.professions.join(', ')}
                  </MDBCardText>
                )}
              </div>
            </div>
            <div className="custom-tabs mb-3">
              <button
                className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => handleTabClick('projects')}
              >
                Projects
              </button>
              <button
                className={`tab-button ${activeTab === 'bids' ? 'active' : ''}`}
                onClick={() => handleTabClick('bids')}
              >
                Bids
              </button>
            </div>
            <div className="tab-content">
              {activeTab === 'projects' && (
                <div className="projects-content">
                  <MDBRow className="g-2 image-container">
                    {projectsByDeadline.length > 0 &&
                      projectsByDeadline.map((project, key) => (
                        <MDBCol
                          key={key}
                          onClick={() => toggleProjectModal(project.projectID)}
                          className="mb-2"
                        >
                          <div className="image-wrapper">
                            <MDBCardImage
                              src={project.projectImage}
                              alt="image 1"
                              className="w-100 rounded-3 image"
                            />
                            <div className="overlay">
                              <p className="overlay-text">{project.projectName}</p>
                            </div>
                          </div>
                        </MDBCol>
                      ))}
                  </MDBRow>
                </div>
              )}
              {activeTab === 'bids' && (
                <div className="bids-content">
                  {bidsSortedByProposalDate.length > 0 &&
                    bidsSortedByProposalDate.map((bid, key) => (
                      <MDBRow key={key} className="g-2 image-container">
                        <MDBCol
                          onClick={() => toggleBidModal(bid.proposalID)}
                          className="mb-2"
                        >
                          <div className="image-wrapper">
                            <MDBCardImage
                              src={bid.projectRandomImage}
                              alt="image 1"
                              className="w-100 rounded-3 image"
                            />
                            <div className="overlay">
                              <p className="overlay-text">{bid.contractorName}</p>
                            </div>
                          </div>
                        </MDBCol>
                      </MDBRow>
                    ))}
                </div>
              )}
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>


      <ModalBox
        BackroundColor="white"
        isVisible={isModalVisible}
        onClose={toggleModal}
      >
        <div className="update-user-form">
          <input placeholder="Email" type="text" />
          <input placeholder="Region" type="text" />
          <input placeholder="First Name" type="text" />
          <input placeholder="Last Name" type="text" />
          <input placeholder="Password" type="password" />
          <input placeholder="Confirm Password" type="password" />
          <input placeholder="Phone Number" type="text" />
          <input placeholder="Profile Picture" type="file" />
          <button>Submit</button>
        </div>
      </ModalBox>


      <ModalBox isVisible={isProjectModalVisible} onClose={() => toggleProjectModal(null)}>
        {selectedProject && (
          <ProjectDetails
            project={selectedProject}
            onBidStart={() => toggleCreateBidModal(selectedProject.projectID)}
          />
        )}
      </ModalBox>


      <ModalBox isVisible={isCreateBidModalVisible} onClose={() => toggleCreateBidModal(null)}>
        {selectedProjectForBid && (
          <CreateBidForm
            projectId={selectedProjectForBid}
            contractorId={user?.userID || 0}
            onSubmit={handleCreateBid}
            onClose={() => toggleCreateBidModal(null)}
          />
        )}
      </ModalBox>


      <ModalBox isVisible={isBidModalVisible} onClose={() => toggleBidModal(null)}>
        {selectedBid && <BidDetails bid={selectedBid} onChatStart={toggleChatModal} />}
      </ModalBox>


      <ModalBox isVisible={isChatModalVisible} onClose={() => toggleChatModal(null)}>
        {selectedChat&& isChatModalVisible && <ChatWindow Chat={selectedChat} />}
      </ModalBox>
    </div>
  );
};

export default observer(Profile);
