import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './myProjects.scss';
import { formatDate } from '../../../services/DateService';
import { useStore } from '../../../Store/store';
import ModalBox from '../../modals/ModalBox';
//import { useNavigate } from 'react-router';
import ProjectDetails from '../../../pages/projects/ProjectDetails';
// import LoadingCompnent from '../../LoadingComponent';

function MyProjects() {
  const store = useStore();
  const { projectStore } = store;
  const { projectsByDeadline, loadProjects, loading, loadProject, selectedProject } = projectStore;
  const [isModalVisible, setIsModalVisible] = useState(false);
  //const navigate = useNavigate();

  useEffect(() => {
    if (projectsByDeadline.length === 0) loadProjects(); 
  }, [projectsByDeadline.length, loadProjects]);

  const toggleModal = async (projectId: number | null) => {
    if (projectId !== null) {
      await loadProject(projectId);
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  };

  if (loading) return "loading";
  
  return (
    <div className='recent-projects-list'>
      {projectsByDeadline?.length > 0 ? (
        projectsByDeadline.map((project) => (
          <div className='list-item' onClick={() => toggleModal(project.projectID)} key={project.projectID}>
            <span className='project-name'>{project.projectName}</span>
            <div dir="rtl" className="project-details">           
              <div className="project-description">{project.projectDescription}</div>
              <span className="project-dl">DL: {formatDate(project.deadline.toDateString())}</span>
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
