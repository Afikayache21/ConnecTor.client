import Box from '../../components/topBox/Box';
import AllProjects from './allProjects/allProjects';
import './projects.scss';
const Projects = () => {
  return (
    <Box
    title={'All projects'}
    className='all-projects-grid-layout'   
  >
    <div className="box-content">
      <AllProjects/>
    </div>
  </Box>
  )
}

export default Projects
