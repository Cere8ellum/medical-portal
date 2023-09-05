import { useEffect, useState, createContext } from 'react';
import styles from './styles/profile.module.css';
import TabsPersonalAccountPatient from './components/TabsPersonalAccountPatient';
import PersonalDataField from './components/PersonalDataField';
import PersonalDataButton from './components/PersonalDataButton';
import api from '../../infrastructure/api';
import { MyGlobalContext } from './MyGlobalContext';

function ProfileScreen() {
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
  }, []);
  async function getUser() {
    try {
      const response = await api.get(`user/`);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function ActiveTab() {
    const [isEditable, setisEditable] = useState<boolean>(false);
    if (idx === 1)
      return (
        <MyGlobalContext.Provider value={{ isEditable, setisEditable }}>
          <div className={styles['content-form']}>
            <div className={styles['persdata-form']}>
              <PersonalDataField data={userData} />
              <PersonalDataButton />
            </div>
          </div>
        </MyGlobalContext.Provider>
      );
    else if (idx === 2) {
      return <div>информация о записи</div>;
    } else if (idx === 3) {
      return <div>медицинская история</div>;
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
