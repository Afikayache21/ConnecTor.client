import { useNavigate } from 'react-router';
import Box from '../../components/topBox/Box';
//import './projects.scss';
//import AllProjects from './allProjects/AllProjects';
import MyProjects from '../../components/topBox/myProjects/MyProjects';
import { useStore } from '../../Store/store';
const Projects = () => {
  const {userStore} = useStore();
  const navigate = useNavigate();

  if(userStore.user?.userTypeID == 1)
  return (
    <Box
    title={'My Projects'}
    className='all-projects-grid-layout'  
    rightIcon='./add.svg' 
    rightIconAction={() =>navigate('createProject')}
    rightIconTooltip='Create Project'
    
  >
    <div className="box-content">
      <MyProjects/>
    </div>
  </Box>
  )
  else return (
    <Box
    title={'My Projects'}
    className='all-projects-grid-layout'
 
    
  >
    <div className="box-content">
      <MyProjects/>
    </div>
  </Box>
  )
}

export default Projects
