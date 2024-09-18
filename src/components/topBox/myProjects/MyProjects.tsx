import { useState, useEffect } from 'react';
import { ProjectDto,getUsers10LastProjectsByUserId } from "../../../services/ProjectService";
import './myProjects.scss';
import { formatDate } from '../../../services/DateService';

type MyProjectsProps = {
  userId: number;
};

function MyProjects({ userId }: MyProjectsProps) {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getUsers10LastProjectsByUserId(userId);
        setProjects(result);
      } catch (err) {
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='recent-projects-list'>
      {projects.length > 0 ? (
        projects.map(project => (
          <div className='list-item' key={`${project.projectId}`}>
            <span className='project-name'>{project.projectName}</span>
            <div dir="rtl" className="project-details">           
              <div className="project-description">{project.projectDescription}</div>
              <span className="project-dl">DL: {formatDate(project.deadline)}</span>
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
