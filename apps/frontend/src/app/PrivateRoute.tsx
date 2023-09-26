import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { authStore } from '../stores';

// С типизацией компонента возникли трудности, исправлю позже
const PrivateRoute: React.FC<any> = ({ children }) => {
  const location = useLocation();

  if (!authStore.userIsAuthorized) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default observer(PrivateRoute);
