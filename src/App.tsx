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


const App = observer(() => {
  const MainLayout = () => {
    return (
      <div className="my-app-layout">
        <Navbar />
        <div className="my-app-container">
          <div className="my-menu-container">
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
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />          
          <Route path="bids" element={<BidsPage />} />          

        </Route>
      </Route>

      {/* Public route for login */}
      <Route path="/login" element={<MinimalLayout />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/register" element={<MinimalLayout />}>
        <Route index element={<Register/>} />
      </Route>

      {/* 404 Not Found Route */}
      <Route path="*" element={<h1>Not Found - 404</h1>} />
    </Routes>
  );
});

export default App;
