import Box from '../../components/topBox/Box';
import Chats from './Chats';

const ChatsPage = () => {
  return (
    <Box
    title={'Chats Page'}
    className='all-projects-grid-layout'
  >
    <div className="box-content">
        <Chats/>
    </div>
  </Box>
  )
}

export default ChatsPage
