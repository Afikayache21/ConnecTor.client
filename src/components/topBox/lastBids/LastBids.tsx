import { useState, useEffect } from 'react';
import { getLastBidsByUserId,ProjectBid} from "../../../services/bidsService";

import './lastBids.scss';
import { formatDate } from '../../../services/DateService';

type MyProjectsProps = {
  userId: number;
};

function MyProjects({ userId }: MyProjectsProps) {
  const [bids, setBids] = useState<ProjectBid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getLastBidsByUserId(userId);
        setBids(result);
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
          <div className='list-item' key={`${bid.ProjectID}-${bid.ContractorID}`}>
            <span className='project-name'>{bid.AcceptedStatus ? 'Accepted' : 'Panding'}</span>
            <div dir="rtl" className="project-details">           
              <div className="project-description">{bid.Comments}</div>
              <span className="project-dl">{formatDate(bid.ProposalDate)}</span>
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
