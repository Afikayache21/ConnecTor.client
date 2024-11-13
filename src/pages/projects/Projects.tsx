import { useNavigate } from 'react-router';
import Box from '../../components/topBox/Box';
//import './projects.scss';
import AllProjects from './allProjects/AllProjects';
import MyProjects from '../../components/topBox/myProjects/MyProjects';
const Projects = () => {
  const navigate = useNavigate();
  return (
    <Box
    title={'My Projects'}
    className='all-projects-grid-layout'
     leftIcon='./search.svg'
    leftIconTooltip='Search Chat'
    leftIconAction={() =>navigate('createProject')}  
    rightIcon='./search.svg' 
    rightIconAction={() =>navigate('createProject')}
    rightIconTooltip='Create Project'
    
  >
    <div className="box-content">
      <MyProjects/>
    </div>
  </Box>
  )
}

export default Projects
