import React, { useState } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import './createBidForm.scss';
import { useStore } from '../../../Store/store';

interface CreateBidFormProps {
    projectId: number;
    contractorId: number;
    onSubmit: (bidData: CreateBidDto) => void;
    onClose: () => void;
}

export interface CreateBidDto {
    projectID: number;
    contractorID: number;
    acceptedStatus: boolean;
    comment: string;
    proposalPrice: number;
    proposalDate: Date;
    suggestedStartDate: Date;
    expectedEndDate: Date;
}

const CreateBidForm: React.FC<CreateBidFormProps> = ({ projectId, contractorId, onSubmit, onClose }) => {
    const {userStore} = useStore();

    const [bidData, setBidData] = useState<CreateBidDto>({
        projectID: projectId,
        contractorID: userStore.user?.userID??contractorId,
        acceptedStatus: false,
        comment: '',
        proposalPrice: 0,
        proposalDate: new Date(),
        suggestedStartDate: new Date(),
        expectedEndDate: new Date(),
    });

    const handleChange = (field: keyof CreateBidDto, value: any) => {
        setBidData({ ...bidData, [field]: value });
    };

    const handleSubmit = () => {
        onSubmit(bidData);
    };

    return (
        <div className="create-bid-form">
            <h3>Create Bid</h3>
            <MDBInput
                style={{ margin: '10px' }}
                label="Proposal Price"
                type="number"
                value={bidData.proposalPrice == 0 ? '' : bidData.proposalPrice}
                onChange={(e) => handleChange('proposalPrice', parseFloat(e.target.value))}
                className="mb-3"
            />
            <MDBInput
                label="Comment"
                type="text"
                value={bidData.comment}
                onChange={(e) => handleChange('comment', e.target.value)}
                className="mb-3"
            />
            <MDBInput
                label="Suggested Start Date"
                type="date"
                value={bidData.suggestedStartDate.toISOString().split('T')[0]}
                onChange={(e) => handleChange('suggestedStartDate', new Date(e.target.value))}
                className="mb-3"
            />
            <MDBInput
                label="Expected End Date"
                type="date"
                value={bidData.expectedEndDate.toISOString().split('T')[0]}
                onChange={(e) => handleChange('expectedEndDate', new Date(e.target.value))}
                className="mb-3"
            />
            <div className="actions">
                <MDBBtn color="primary" onClick={handleSubmit}>
                    Submit Bid
                </MDBBtn>
                <MDBBtn color="secondary" onClick={onClose}>
                    Cancel
                </MDBBtn>
            </div>
        </div>
    );
};

export default CreateBidForm;
