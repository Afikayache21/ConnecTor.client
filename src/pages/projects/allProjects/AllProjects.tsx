import './allProjects.scss';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { formatDateWithDateTime } from '../../../services/DateService';
import { useStore } from '../../../Store/store';

function AllProjects() {
  const store = useStore();
  const {projectStore} = store;
  const { projects, loadAllProjects, loading } = projectStore;
  

  useEffect(() => {
    if (projects.length === 0) loadAllProjects(); // Load projects if they haven't been loaded
  }, [projects.length, loadAllProjects]);

  console.log(projects);
  
  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <div className='recent-projects-list'>
      {projects?.length > 0 ? (
        projects.map((project) => (
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

export default observer(AllProjects);
