import { useState, useEffect } from 'react';
import { getUsers10LastProjectsBidsByUserId, ProjectBid } from "../../../services/bidsService";

import './lastBids.scss';
import {formatDate } from '../../../services/DateService';

type MyProjectsProps = {
  userId: number;
};

function MyProjects({ userId }: MyProjectsProps) {
  const [bids, setBids] = useState<ProjectBid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const onc = (bid: ProjectBid) => {
    console.log(bid);
  }
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getUsers10LastProjectsBidsByUserId(userId);
        if (result) {
          setBids(result);
        }
      } catch (err) {
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  const displayedBids = bids.slice(0, 10);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='recent-projects-list'>
      {displayedBids.length > 0 ? (
        displayedBids.map(bid => (
          <div onClick={() => onc(bid)} className='list-item' key={`${bid.projectID}-${bid.contractorID}`}>
            <span className='project-name'>{bid.projectName} {bid.acceptedStatus ? 'Accepted' : 'Panding'}</span>
            <div dir="rtl" className="project-details">
              <div className="project-description">{bid.comment}</div>
              <span className="project-dl">{formatDate(bid.proposalDate)}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}

export default MyProjects;
