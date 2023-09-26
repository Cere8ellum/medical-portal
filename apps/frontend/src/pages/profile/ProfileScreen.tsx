import { useEffect, useState, createContext } from 'react';
import styles from './styles/profile.module.css';
import TabsPersonalAccountPatient from './components/TabsPersonalAccountPatient';
import PersonalDataField from './components/PersonalDataField';
import PersonalDataButton from './components/PersonalDataButton';
import { AppointmentInfo } from './components/AppointmentInfo';
import api from '../../infrastructure/api';
import { MyGlobalContext } from './MyGlobalContext';
import { userStore } from '../../stores';
import ChangePassword from '../changepassword/ChangePassword';
import FormWrapper from '../adminka/components/FormWrapper';
import { Box, Modal, Typography } from '@mui/material';
import { Snackbar } from '../../components';

function ProfileScreen() {
  const [changeOpen, setChangeOpen] = useState<boolean>(false);
  const { idx, Tabs } = TabsPersonalAccountPatient();
  const [userData, setUserData] = useState({
    id: 0,
    firstname: '',
    lastname: '',
    mobile: '',
    birthdate: '',
    address: '',
    email: '',
    gender: '',
  });

  useEffect(() => {
    getUser();
  }, [idx]);

  async function getUser() {
    try {
      const response = await api.get(`user/`);
      setUserData(response.data);
      userStore.userIdSet(response.data.id);
    } catch (error) {
      console.error(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function ActiveTab(): any {
    const [isEditable, setisEditable] = useState<boolean>(false);
    const [isChangePass, setIsChangePass] = useState<boolean>(false);
    console.log('isChangePass', isChangePass);
    if (idx === 1)
      return (
        <MyGlobalContext.Provider
          value={{ isEditable, setisEditable, isChangePass, setIsChangePass }}
        >
          <div className={styles['content-form']}>
            <div className={styles['persdata-form']}>
              <PersonalDataField data={userData} />
              <PersonalDataButton />
            </div>
          </div>
          <Modal
            open={isChangePass}
            onClose={() => setIsChangePass(false)}
            slotProps={{
              backdrop: {
                sx: {
                  backgroundColor: 'rgba(255, 255, 255, 0.80)',
                  backdropFilter: 'blur(3px)',
                },
              },
            }}
          >
            <ChangePassword />
          </Modal>
          <Snackbar />
        </MyGlobalContext.Provider>
      );
    else if (idx === 2) {
      return <AppointmentInfo></AppointmentInfo>;
    }
  }

  return (
    <main className={styles['content']}>
      {Tabs}
      <ActiveTab></ActiveTab>
    </main>
  );
}

export default ProfileScreen;
