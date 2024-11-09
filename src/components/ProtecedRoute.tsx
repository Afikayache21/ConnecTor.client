import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
//import { useStore } from '../Store/store';
//import LoadingSpinner from '../components/LoadingSpinner'; // Optional, for a loading state

const ProtectedRoute = observer(() => {

  //const {authStore} = useStore();
  const gg = localStorage.getItem('isLoggedIn')
  if (!gg) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
});

export default ProtectedRoute;
