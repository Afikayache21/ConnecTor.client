import { useState, useEffect } from 'react';
import { getLastProjectsByUserId, Project } from "../../../services/ProjectService";
import './myProjects.scss';
import { formatDate } from '../../../services/DateService';

type MyProjectsProps = {
  userId: number;
};

function MyProjects({ userId }: MyProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getLastProjectsByUserId(userId);
        setProjects(result);
      } catch (err) {
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  const displayedProjects = projects.slice(0, 10);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='recent-projects-list'>
      {displayedProjects.length > 0 ? (
        displayedProjects.map(project => (
          <div className='list-item' key={project.ProjectID}>
            <span className='project-name'>{project.ProjectName}</span>
            <div dir="rtl" className="project-details">           
              <div className="project-description">{project.ProjectDescription}</div>
              <span className="project-dl">DL: {formatDate(project.Deadline)}</span>
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
