import Box from '../../components/topBox/Box';
import LastChats from '../../components/topBox/lastChats/LastChats';
import MyProjects from '../../components/topBox/myProjects/MyProjects';
import LastBids from '../../components/topBox/lastBids/LastBids';
import './home.scss';
import SearchChildren from '../../components/modals/childrens/search/SearchChildren';
import Chart from '../../components/chart/Chart';

const Home = () => {
  const userid = 1;

  return (
    <div className="home">
      <div className="top-boxes">
        <div className="box box1">
          <Box
            title={'Last Chats'}
            className='chats-grid-layout'
            leftIcon='./search.svg'
            rightIcon='./order.svg'
            leftIconTooltip='Search Chat'
            rightIconTooltip='Order Projects'
            leftIconAction={() => console.log('Left icon action triggered')}
            leftIconChildren={<SearchChildren onSearch={(query) => console.log(query)} />}
            rightIconAction={() => console.log('Right icon action triggered')}
            rightIconChildren={<div>Right Icon Modal Content</div>}
          >
            <div className="box-content">
              <LastChats userId={userid} />
            </div>
          </Box>
        </div>

        <div className="box box2">
          <Box
            title={'My Projects'}
            className='Projects-grid-layout'
            leftIcon='./search.svg'
            leftIconTooltip='Search Project'
            rightIcon='./order.svg'
            rightIconAction={() => console.log('Right icon action triggered')}
            rightIconChildren={<div>Right Icon Modal Content</div>}
          >
            <div className="box-content">
              <MyProjects userId={userid} />
            </div>
          </Box>
        </div>

        <div className="box box3">
          <Box
            title={'Last Bids'}
            className='Projects-grid-layout'
            leftIcon='./search.svg'
            leftIconTooltip='Search Project'
            rightIcon='./order.svg'
          >
            <div className="box-content">
              <LastBids userId={userid} />
            </div>
          </Box>
        </div>


      </div>

      <div className="bottom-boxes">
        <div className="box box4">
          <Box
            title={'Statistics'}
            className='Projects-grid-layout'           
          >
            <div className="box-content">
            <Chart/>
            </div>
          </Box>
        </div>
        <div className="box box5">
          <Box title={'Recent Activity'}>
            <div className="box-content">
              {/* Insert box content here */}
            </div>
          </Box>
        </div>

        <div className="box box6">
          <Box title={'Notifications'}>
            <div className="box-content">
            <LastChats userId={userid} />
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Home;
