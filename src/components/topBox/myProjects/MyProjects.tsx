// import { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import './myProjects.scss';
// import { formatDateWithDateTime } from '../../../services/DateService';
// import { useStore } from '../../../Store/store';
// import { useNavigate } from 'react-router';

// function MyProjects() {
//   const store = useStore();
//   const {projectStore} = store;
//   const {projectsByDeadline, loadProjects, loading} = projectStore;
//   const navigate = useNavigate();
  

//   useEffect(() => {
//     if (projectsByDeadline.length === 0) loadProjects(); // Load projects if they haven't been loaded
//   }, [projectsByDeadline.length, loadProjects]);

  
//   if (loading) return <p>Loading...</p>;
//   // if (error) return <p>{error}</p>;

//   return (
//     <div className='recent-projects-list'>
//       {projectsByDeadline?.length > 0 ? (
//         projectsByDeadline.map((project) => (
//           <div className='list-item'  key={`${project.projectID}`}>
//             <span className='project-name'>{project.projectName}</span>
//             <div dir="rtl" className="project-details">           
//               <div className="project-description">{project.projectDescription}</div>
//               <span className="project-dl">DL: {formatDateWithDateTime(project.deadline)}</span>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No projects found.</p>
//       )}
//     </div>
//   );
// }

// export default observer(MyProjects);
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './myProjects.scss';
import { formatDateWithDateTime } from '../../../services/DateService';
import { useStore } from '../../../Store/store';
import ModalBox from '../../modals/ModalBox';
//import ProjectDetails from './ProjectDetails'; // Assume this is a new component for displaying project details
import { useNavigate } from 'react-router';
import ProjectDetails from '../../../pages/projects/ProjectDetails';

function MyProjects() {
  const store = useStore();
  const { projectStore } = store;
  const { projectsByDeadline, loadProjects, loading, loadProject, selectedProject } = projectStore;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (projectsByDeadline.length === 0) loadProjects(); // Load projects if they haven't been loaded
  }, [projectsByDeadline.length, loadProjects]);

  const toggleModal = async (projectId: number | null) => {
    if (projectId !== null) {
      await loadProject(projectId); // Load the specific project details
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  
  return (
    <div className='recent-projects-list'>
      {projectsByDeadline?.length > 0 ? (
        projectsByDeadline.map((project) => (
          <div className='list-item' onClick={() => toggleModal(project.projectID)} key={project.projectID}>
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

      <ModalBox isVisible={isModalVisible} onClose={() => toggleModal(null)}>
        {selectedProject && <ProjectDetails project={selectedProject}/>}
      </ModalBox>
    </div>
  );
}

export default observer(MyProjects);
