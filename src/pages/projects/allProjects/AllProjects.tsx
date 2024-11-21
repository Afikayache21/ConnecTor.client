import './allProjects.scss';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { formatDateWithDateTime } from '../../../services/DateService';
import { useStore } from '../../../Store/store';
import ProjectDetails from '../../../pages/projects/ProjectDetails';
import ModalBox from '../../../components/modals/ModalBox';
import CreateBidForm from '../../../components/modals/childrens/CreateBidForm';
import { CreateBidDto } from '../../../Store/bidsStore';

function AllProjects() {
  const store = useStore();
  const { projectStore ,bidsStore} = store;
  const { projects, loadAllProjects, loading, loadProject, selectedProject } = projectStore;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateBidModalVisible, setIsCreateBidModalVisible] = useState(false);
  const [selectedProjectForBid, setSelectedProjectForBid] = useState<number | null>(null);


  useEffect(() => {
    if (projects.length === 0) loadAllProjects(); // Load projects if not already loaded
  }, [projects.length, loadAllProjects,loading]);

  const toggleModal = async (projectId: number | null) => {
    if (projectId !== null) {
      await loadProject(projectId); // Load selected project details
      setIsModalVisible(true); // Show modal
    } else {
      setIsModalVisible(false); // Hide modal
    }
  };

  //if (loading) return <p>Loading...</p>;

  const toggleCreateBidModal = (projectId: number | null) => {
    if (projectId !== null) {
      setSelectedProjectForBid(projectId);
     setIsModalVisible(false)
      setIsCreateBidModalVisible(true);
    } else {
      setIsCreateBidModalVisible(false);
    }
  };

  
  const handleCreateBid = async (bidData: CreateBidDto) => {
    try {
      const res = await bidsStore.createBid(bidData);
      console.log(res);
      
      
      setIsCreateBidModalVisible(false);
    } catch (error) {
      console.error('Error creating bid:', error);
    }
  };


  return (
    <div className='recent-projects-list'>
      {projects?.length > 0 ? (
        projects.map((project) => (
          
          <div
            className='list-item'
            onClick={() => toggleModal(project.projectID)}
            key={project.projectID}
          >
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
        {selectedProject && <ProjectDetails project={selectedProject} onBidStart={() => toggleCreateBidModal(selectedProject.projectID)}/>}
      </ModalBox>

      <ModalBox isVisible={isCreateBidModalVisible} onClose={() => toggleCreateBidModal(null)}>
        {selectedProject && (
          <CreateBidForm
            projectId={selectedProject?.projectID}
            contractorId={selectedProject?.contractorID??0}
            onSubmit={handleCreateBid}
            onClose={() => toggleCreateBidModal(null)}
          />
        )}
      </ModalBox>
    </div>
  );
}

export default observer(AllProjects);
