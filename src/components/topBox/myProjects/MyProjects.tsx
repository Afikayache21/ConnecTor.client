import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './myProjects.scss';
import { formatDateWithDateTime } from '../../../services/DateService';
import { useStore } from '../../../Store/store';

function MyProjects() {
  const store = useStore();
  const {projectStore} = store;
  const { projectsByDeadline, loadProjects, loading } = projectStore;
  

  useEffect(() => {
    if (projectsByDeadline.length === 0) loadProjects(); // Load projects if they haven't been loaded
  }, [projectsByDeadline.length, loadProjects]);

  
  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <div className='recent-projects-list'>
      {projectsByDeadline?.length > 0 ? (
        projectsByDeadline.map((project) => (
          <div className='list-item' key={`${project.projectID}`}>
            <span className='project-name'>{project.projectName}</span>
            <div dir="rtl" className="project-details">           
              <div className="project-description">{project.projectDescription}</div>
              <span className="project-dl">DL: {formatDateWithDateTime(project.deadline)}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}

export default observer(MyProjects);
