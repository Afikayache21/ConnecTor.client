import React, { useState } from 'react';
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

const Profile: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'bids'>('projects');

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleTabClick = (tab: 'projects' | 'bids') => {
    setActiveTab(tab);
    console.log(`Switched to ${tab} tab`);
  };

  return (
    <div className="profile-page" style={{ width: '100%' }}>
      <MDBCol>
        <MDBCard>
          <div
            className="rounded-top text-white d-flex flex-row"
            style={{ backgroundColor: 'grey', height: '200px' }}
          >
            <div
              className="ms-4 mt-5 d-flex flex-column"
              style={{ width: '150px' }}
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
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
              <MDBTypography tag="h5">Yosef Horwitz</MDBTypography>
              <MDBCardText>Zafririm Holon</MDBCardText>
            </div>
          </div>
          <div
            className="p-4 text-black"
            style={{ backgroundColor: '#f8f9fa' }}
          >
            <div className="d-flex justify-content-end text-center py-1">
              <div>
                <MDBCardText className="medium text-muted mb-0">
                  Projects
                </MDBCardText>
                <MDBCardText className="medium text-muted mb-0">4</MDBCardText>
              </div>
              <div className="px-3">
                <MDBCardText className="medium text-muted mb-0">Bids</MDBCardText>
                <MDBCardText className="medium text-muted mb-0">26</MDBCardText>
              </div>
            </div>
          </div>
          <MDBCardBody className="text-black p-4 about-section">
            <div className="mb-5">
              <h3 style={{fontFamily:'bold'}}>About</h3>
              <div
                className="p-4"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <MDBCardText className="font-italic mb-1">
                  Contractor
                </MDBCardText>
                <MDBCardText className="font-italic mb-1">
                  Lives in Zafririm Holon
                </MDBCardText>
                <MDBCardText className="font-italic mb-0">
                  Electric
                </MDBCardText>
              </div>
            </div>

            {/* Custom Tabs for Projects and Bids */}
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
                    <MDBCol className="mb-2">
                      <div className="image-wrapper">
                        <MDBCardImage
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                          alt="image 1"
                          className="w-100 rounded-3 image"
                        />
                        <div className="overlay">
                          <p className="overlay-text">Project Title 1</p>
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol className="mb-2">
                      <div className="image-wrapper">
                        <MDBCardImage
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                          alt="image 2"
                          className="w-100 rounded-3 image"
                        />
                        <div className="overlay">
                          <p className="overlay-text">Project Title 2</p>
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>

                </div>
              )}

              {activeTab === 'bids' && (
                <div className="bids-content">
                  {/* Bids content goes here */}
                  <p>Bids content goes here. This is a placeholder for bid information and details.</p>
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
    </div>
  );
};

export default Profile;
