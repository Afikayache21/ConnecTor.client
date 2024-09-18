import { useState, useEffect } from 'react';
import { getAllProjects } from "../../../services/ProjectService";
import './allProjects.scss';
import { formatDate } from '../../../services/DateService';

function AllProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleClick = (project: any) => {
    console.log(project);
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getAllProjects();
        if (result) {
          setProjects(result);
        }
      } catch (err) {
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const displayedProjects = projects.slice(0, 10);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='recent-projects-list'>
      {displayedProjects.length > 0 ? (
        displayedProjects.map(project => (
          <div 
            onClick={() => handleClick(project)} 
            className='list-item' 
            key={project.projectID}
          >
            <span className='project-name'>
              {project.projectName} ({project.projectFieldName})
            </span>
            <div dir="rtl" className="project-details">
              <div className="project-description">{project.projectDescription}</div>
              <span className="client-name">{project.clientName}</span>
              <span className="project-region">{project.region}</span>
              <span className="project-dates">
                {formatDate(project.openingDate)} - {formatDate(project.deadline)}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}

export default AllProjects;
