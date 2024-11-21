import React, { useState } from 'react';
import { MDBInput, MDBBtn, MDBFile } from 'mdb-react-ui-kit';
import Select from 'react-select';
//import './UserProfileForm.scss';
//import { useStore } from '../../Store/store';
import { getUserId } from '../../Api/agent';

interface UserProfileFormProps {
    regions: { value: number; label: string }[];
    onSubmit: (formData: UserProfileDto) => void;
}

export interface UserProfileDto {   
    userTypeId : number; 
    email: string;
    region: number | null;
    password: string;
    newPassword: string;
    verifyNewPassword: string;
    phoneNumber: string;
    profilePicture: File | null;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ regions, onSubmit }) => {

    // const {userStore}= useStore();
    // const {user}= userStore;



    const [formData, setFormData] = useState<UserProfileDto>({
        userTypeId: Number(getUserId()),
        email: '',
        region: null,
        password: '',
        newPassword: '',
        verifyNewPassword: '',
        phoneNumber: '',
        profilePicture: null,
    });

    const [selectedRegion, setSelectedRegion] = useState<{ value: number; label: string } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prevData) => ({ ...prevData, profilePicture: file }));
    };

    const handleRegionChange = (selectedOption: { value: number; label: string } | null) => {
        setSelectedRegion(selectedOption);
        setFormData((prevData) => ({ ...prevData, region: selectedOption ? selectedOption.value : null }));
    };

    const handleSubmit = () => {
        if (!formData.email || !formData.password || !formData.phoneNumber) {
            alert('Please fill in all required fields.');
            return;
        }
        if (formData.newPassword !== formData.verifyNewPassword) {
            alert('New password and verification do not match.');
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="user-profile-form">
            <h1>Update Profile</h1>
            <div className="form-fields">
                <MDBInput
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mb-3"
                />
                <MDBInput
                    name="password"
                    label="Current Password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mb-3"
                />
                <MDBInput
                    name="newPassword"
                    label="New Password"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="mb-3"
                />
                <MDBInput
                    name="verifyNewPassword"
                    label="Verify New Password"
                    type="password"
                    value={formData.verifyNewPassword}
                    onChange={handleInputChange}
                    className="mb-3"
                />
                <MDBInput
                    name="phoneNumber"
                    label="Phone Number"
                    type="text"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mb-3"
                />
                <Select
                    options={regions}
                    placeholder="Select Region"
                    value={selectedRegion}
                    onChange={handleRegionChange}
                    isClearable
                    className="mb-3"
                />
                <MDBFile
                    label="Profile Picture"
                    onChange={handleFileChange}
                    className="mb-3"
                />
            </div>
            <MDBBtn color="primary" onClick={handleSubmit} className="mb-3">
                Submit
            </MDBBtn>
        </div>
    );
};

export default UserProfileForm;