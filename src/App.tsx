import { Route, Outlet, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Projects from './pages/projects/Projects';
import Users from './pages/users/Users.tsx';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import './styles/global.scss'
import Menu from './components/menu/Menu.tsx';

function App() {
  const Layout = () => {
    return (
      <div className="app-layout">
        <Navbar />
        <div className="container">
          <div className="menu-container">
            <Menu />
          </div>
          <div className="app-layout-content">
            <Outlet /> {/* This will render the nested routes */}
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  return (
    <>
      <Routes>
        {/* Main layout route */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes without leading "/" */}
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* 404 Not Found route */}
        <Route path="*" element={<h1>Not Found - 404</h1>} />
      </Routes>
    </>
  );
}

export default App;
