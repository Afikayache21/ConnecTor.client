import Box from '../../components/topBox/Box';
//import './projects.scss';
import AllProjects from './allProjects/AllProjects';
const AllProjectsPage = () => {
  return (
    <Box
    title={'All Projects'}
    className='all-projects-grid-layout'
  >
    <div className="box-content">
      <AllProjects/>
    </div>
  </Box>
  )
}

export default AllProjectsPage
