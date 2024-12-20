import { Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Projects from './pages/projects/Projects';
import Users from './pages/users/Users';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import './styles/global.scss';
import './components/modals/modalBox.scss'
import Menu from './components/menu/Menu';
import Login from './pages/login/Login';
import ProtectedRoute from './components/ProtecedRoute';
import { observer } from 'mobx-react-lite';
import Register from './pages/rgister/register';
import Profile from './pages/profile/Profile';
import BidsPage from './pages/bids/bidsPage';
import LastChats from './components/topBox/lastChats/LastChats';
import CreateProject from './pages/projects/CreateProject';
import { useStore } from './Store/store';
import { useEffect } from 'react';
import signalRService from './services/signalRService';
import { getUserId } from './Api/agent';
import ViewProfile from './pages/profile/ViewProfile';
import AllProjectsPage from './pages/projects/AllProjectsPage';
import ChatsPage from './pages/chats/ChatsPage';


const App = observer(() => {

  const currentUserId = Number(getUserId());
  const handleMessageReceived = async (message: any) => {
    if (currentUserId != message.value.senderId)
      alert("You have New Message: " + message.value.content);

  };

  const handleNotificationReceived = async (message: any) => {

    console.log(message);

    if (message)
      alert("Notification: " + message.value.label);

  };



  useEffect(() => {
    // Start the SignalR connection when the component mounts

    const connect = () => {
      signalRService.startConnection();
      signalRService.onMessageReceived(handleMessageReceived);
      //signalRService.onNotificationReceived(handleNotificationReceived);

    }

    connect();
    // Cleanup when the component unmounts
    return () => {
      signalRService.offMessageReceived();
      //signalRService.offNotificationReceived();
      signalRService.stopConnection();
    };
  }, []);


  const { windowStore } = useStore();
  const { isMobile } = windowStore;

  const MainLayout = () => {
    return (
      <div className="my-app-layout">
        <Navbar />
        <div className="my-app-container">
          <div className={isMobile ? "my-menu-container-mobile" : "my-menu-container"}>
            <Menu />
          </div>
          <div className="my-app-layout-content">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const MinimalLayout = () => {
    return (
      <div className="my-app-layout">
        <Navbar />
        <div className="my-app-layout-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  };

  return (
    <Routes>
      {/* Protected routes for authenticated users */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="allProjects" element={<AllProjectsPage />} />
          <Route path="projects/createProject" element={<CreateProject />} />

          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
          <Route path="view" element={<ViewProfile />} />
          <Route path="bids" element={<BidsPage />} />
          <Route path="chats" element={<ChatsPage />} />

        </Route>
      </Route>

      {/* Public route for login */}
      <Route path="/login" element={<MinimalLayout />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/register" element={<MinimalLayout />}>
        <Route index element={<Register />} />
      </Route>

      {/* 404 Not Found Route */}
      <Route path="*" element={<h1>Not Found - 404</h1>} />
    </Routes>
  );
});

export default App;
