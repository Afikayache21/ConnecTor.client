import React, { useEffect, useState } from 'react';
import { MDBInput, MDBBtn, MDBFile } from 'mdb-react-ui-kit';
import Select from 'react-select';
import './UserProfileForm.scss'; // Assuming the styles are in this file
import { useStore } from '../../Store/store';
import { observer } from 'mobx-react';

interface Props{
    onSubmit: (any :any) => void;
}
export interface UserProfileDto {
    email: string;
    region: number | null;
    password: string;
    newPassword: string;
    verifyNewPassword: string;
    phoneNumber: string;
    profilePicture: File | null;
}

const UserProfileForm: React.FC<Props> = ({onSubmit}) => {
    const {commonStore,userStore} = useStore();
    const { regions ,loadRegions} = commonStore;
    const { UpdateUser } = userStore;
    const [formData, setFormData] = useState<UserProfileDto>({
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

    const handleSubmit = async () => {
        if (!formData.email || !formData.password || !formData.phoneNumber) {
            alert('Please fill in all required fields.');
            return;
        }
        if (formData.newPassword !== formData.verifyNewPassword) {
            alert('New password and verification do not match.');
            return;
        }
        await UpdateUser(formData)
        onSubmit(null)

    };



    useEffect(() => {
        loadRegions()
      }, [commonStore]);

    return (
        <div className="create-bid-form">
            <h3>Update Profile</h3>
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
            <div className="actions">
                <MDBBtn color="primary" onClick={handleSubmit} className="btn btn-primary">
                    Submit
                </MDBBtn>
            </div>
        </div>
    );
};

export default observer(UserProfileForm);
