import { Route, Routes } from 'react-router-dom';
import MainScreen from '../pages/main';
import AppointmentScreen from '../pages/appointment';
import ProfileScreen from '../pages/profile/ProfileScreen';
import { SignupScreen } from '../pages/signup';
import LoginScreen from '../pages/auth/LoginScreen';
import DoctorListScreen from '../pages/doctor_list/DoctorListScreen';
import ChangePassword from '../pages/changepassword/ChangePassword';
import OpinionForm from '../pages/opinion/opinion_form';
import OpinionDocument from '../pages/opinion/opinion_doc';
import { routes, routesWithoutLayout } from '../routes';
import PrivateRoute from './PrivateRoute';
import MainLayout from './MainLayout';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {routes.map(({ isPublic, path, element }) =>
          isPublic ? (
            <Route key={path as string} path={path} element={element} />
          ) : (
            <Route
              key={path as string}
              path={path}
              element={<PrivateRoute>{element}</PrivateRoute>}
            />
          )
        )}
      </Route>
      {routesWithoutLayout.map(({ isPublic, path, element }) =>
        isPublic ? (
          <Route key={path as string} path={path} element={element} />
        ) : (
          <Route
            key={path as string}
            path={path}
            element={<PrivateRoute>{element}</PrivateRoute>}
          />
        )
      )}
    </Routes>
  );
}

export default App;
