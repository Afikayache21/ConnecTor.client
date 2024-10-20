import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from '../Store/AuthStore';
//import LoadingSpinner from '../components/LoadingSpinner'; // Optional, for a loading state

const ProtectedRoute = observer(() => {
  // if (!authStore.isLoggedIn) {
  //   return <Navigate to="/login" replace />;
  // }

  return <Outlet />;
});

export default ProtectedRoute;
