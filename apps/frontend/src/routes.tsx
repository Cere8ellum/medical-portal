import { RouteObject } from 'react-router-dom';
import AppointmentScreen from './pages/appointment/';
import ProfileScreen from './pages/profile/ProfileScreen';
import MainScreen from './pages/main/';
import LoginScreen from './pages/auth';
import SignupScreen from './pages/signup';
import DoctorListScreen from './pages/doctor_list/DoctorListScreen';
import NotFoundPage from './pages/NotFoundPage';
import OpinionDocument from './pages/opinion/opinion_doc';
import OpinionForm from './pages/opinion/opinion_form';
import Contacts from './pages/contactpage/Contacts';
import DoctorPersonalOffice from './pages/doctor_personal_office/DoctorPersonalOffice';
import DoctorOneList from './pages/doctor_personal_office/component/DoctorOneList';
import DoctorTwoList from './pages/doctor_personal_office/component/DoctorTwoList';
import DoctorThreeList from './pages/doctor_personal_office/component/DoctorThreeList';

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
  {
    path: '/contacts',
    element: <Contacts />,
    isPublic: true,
  },
  {
    path: '/doctor-personal-office',
    element: <DoctorPersonalOffice />,
    isPublic: true,
  },
  {
    path: '/doctorOneList',
    element: <DoctorOneList />,
    isPublic: true,
  },
  {
    path: '/doctorTwoList',
    element: <DoctorTwoList />,
    isPublic: true,
  },
  {
    path: '/doctorThreeList',
    element: <DoctorThreeList />,
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
  {
    path: '/opinion/:appointmentId',
    element: <OpinionDocument />,
    isPublic: true,
  },
  {
    path: '/opinionform/:appointmentId',
    element: <OpinionForm />,
    isPublic: true,
  },
];
