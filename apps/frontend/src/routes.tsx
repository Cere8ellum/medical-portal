import { RouteObject } from 'react-router-dom';
import AppointmentScreen from './pages/appointment/';
import ProfileScreen from './pages/profile/ProfileScreen';
import MainScreen from './pages/main/';
import LoginScreen from './pages/auth';
import SignupScreen from './pages/signup';
import DoctorListScreen from './pages/doctor_list/DoctorListScreen';
import NotFoundPage from './pages/NotFoundPage';

type Route = RouteObject & {
  isPublic: boolean;
};

export const routes: Route[] = [
  {
    path: '/appointment',
    element: <AppointmentScreen />,
    isPublic: false,
  },
  {
    path: '/profile',
    element: <ProfileScreen />,
    isPublic: false,
  },
  {
    path: '/',
    element: <MainScreen />,
    isPublic: true,
  },
  {
    path: '/doctors',
    element: <DoctorListScreen />,
    isPublic: true,
  },
];

export const routesWithoutLayout: Route[] = [
  {
    path: '/login',
    element: <LoginScreen />,
    isPublic: true,
  },
  {
    path: '/signup',
    element: <SignupScreen />,
    isPublic: true,
  },
  {
    path: '*',
    element: <NotFoundPage />,
    isPublic: true,
  },
];
