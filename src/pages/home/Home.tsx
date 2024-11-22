import Box from '../../components/topBox/Box';
import LastChats from '../../components/topBox/lastChats/LastChats';
import MyProjects from '../../components/topBox/myProjects/MyProjects';
import './home.scss';
//import SearchChildren from '../../components/modals/childrens/search/SearchChildren';
import Chart from '../../components/chart/Chart';
import { useStore } from '../../Store/store';
import Slider from 'react-slick';
import MyBids from '../../components/topBox/lastBids/MyBids';

const Home = () => {


  const {windowStore} = useStore();
  const {isMobile} = windowStore;


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
  };

  if (isMobile) {
    return (
      <div className="home-mobile">
        <Slider {...sliderSettings}>
          <div className="box">
            <Box
              title={'Last Chats'}
              className='chats-grid-layout'            
            >
              <div className="box-content">
                <LastChats />
              </div>
            </Box>
          </div>

          <div className="box">
            <Box
              title={'My Projects'}
              className='Projects-grid-layout'          
            >
              <div className="box-content">
                <MyProjects />
              </div>
            </Box>
          </div>

          <div className="box">
            <Box
              title={'Last Bids'}
              className='Projects-grid-layout'             
            >
              <div className="box-content">
              <MyBids/>
              </div>
            </Box>
          </div>
         
        </Slider>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="top-boxes">
        <div className="box box1">
          <Box
            title={'Last Chats'}
            className='chats-grid-layout'
            // leftIcon='./search.svg'
            // rightIcon='./order.svg'
            // leftIconTooltip='Search Chat'
            // rightIconTooltip='Order Projects'
            // leftIconAction={() => console.log('Left icon action triggered')}
            // leftIconChildren={<SearchChildren onSearch={(query) => console.log(query)} />}
            // rightIconAction={() => console.log('Right icon action triggered')}
            // rightIconChildren={<div>Right Icon Modal Content</div>}
          >
            <div className="box-content">
              <LastChats />
            </div>
          </Box>
        </div>

        <div className="box box2">
          <Box
            title={'My Projects'}
            className='Projects-grid-layout'
            // leftIcon='./search.svg'
            // leftIconTooltip='Search Project'
            // rightIcon='./order.svg'
            // rightIconAction={() => console.log('Right icon action triggered')}
            // rightIconChildren={<div>Right Icon Modal Content</div>}
          >
            <div className="box-content">
              <MyProjects  />
            </div>
          </Box>
        </div>

        <div className="box box3">
          <Box
            title={'Last Bids'}
            className='Projects-grid-layout'
            // leftIcon='./search.svg'
            // leftIconTooltip='Search Project'
            // rightIcon='./order.svg'
          >
            <div className="box-content">
              <MyBids/>
            </div>
          </Box>
        </div>


      </div>

     
    </div>
  );
};

export default Home;




{/* <div className="bottom-boxes">
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
//     </div>
//   </Box>
// </div>

// <div className="box box6">
//   <Box title={'Notifications'}>
//     <div className="box-content">
//     <LastChats  />
//     </div>
//   </Box>
// </div>
// </div> 
