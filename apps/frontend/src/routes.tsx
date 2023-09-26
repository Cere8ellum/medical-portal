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
import AdminkaScreen from './pages/adminka/AdminkaScreen';
import InfoClinic from './pages/info_сlinic/info_clinic';
import ChangePassword from './pages/changepassword/ChangePassword';
import { authStore } from './stores';
import Feedback from './pages/feedback/feedback';
import Profiles from './pages/Profiles';

type Route = RouteObject & {
  isPublic: boolean;
};

const getJSXComponent = (): JSX.Element => {
  let jsx: JSX.Element = <MainScreen />;

  const user = authStore.userIsAuthorized;
  console.log('serIsAuthorized', user);
  if (user) {
    console.log('role', authStore.currentAccount.role);
    switch (authStore.currentAccount.role) {
      case 'patient':
        jsx = <ProfileScreen />;
        break;
      case 'admin':
        jsx = <AdminkaScreen />;
        break;
      case 'doctor':
        jsx = <></>;
        break;
      default:
        jsx = <></>;
    }
  }
  return jsx;
};

export const routes: Route[] = [
  {
    path: '/appointment',
    element: <AppointmentScreen />,
    isPublic: false,
  },
  {
    path: '/profile',
    element: <Profiles />,
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
  // {
  //   path: '/adminka',
  //   element: <AdminkaScreen />,
  //   isPublic: false,
  // },
  {
    path: '/infoclinic',
    element: <InfoClinic />,
    isPublic: true,
  },
  {
    path: '/feedback',
    element: <Feedback />,
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
    isPublic: false,
  },
  {
    path: '/opinionform/:appointmentId',
    element: <OpinionForm />,
    isPublic: false,
  },
];
