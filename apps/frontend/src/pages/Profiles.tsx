import { authStore } from '../stores';
import AdminkaScreen from './adminka/AdminkaScreen';
import ProfileScreen from './profile/ProfileScreen';

const Profiles: React.FC = () => {
  if (!authStore.userIsAuthorized) {
    return null;
  }

  if (authStore.currentAccount.role === 'doctor') {
    //return <DoctorPersonalOffice />;
    return <></>;
  }

  if (authStore.currentAccount.role === 'admin') {
    return <AdminkaScreen />;
  }

  return <ProfileScreen />;
};

export default Profiles;
