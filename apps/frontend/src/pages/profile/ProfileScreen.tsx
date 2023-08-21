import MainLayout from 'apps/frontend/src/app/MainLayout/';
import { useEffect, useState } from 'react';
import styles from './styles/profile.module.css';
import axios from 'axios';
import TabsPersonalAccountPatient from './components/TabsPersonalAccountPatient';
import PersonalDataField from './components/PersonalDataField';
import PersonalDataButton from './components/PersonalDataButton';

function ProfileScreen() {
  const { idx, Tabs } = TabsPersonalAccountPatient();
  useEffect(() => {
    getUser();
  }, []);
  async function getUser() {
    try {
      const response = await axios.get('http://localhost:3000/api/user/1');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  function ActiveTab() {
    if (idx === 1)
      return (
        <div className={styles['content-form']}>
          <form className={styles['persdata-form']} action="#">
            <PersonalDataField />
            <PersonalDataButton />
          </form>
        </div>
      );
    else if (idx === 2) {
      return <div>информация о записи</div>;
    } else if (idx === 3) {
      return <div>медицинская история</div>;
    }
  }

  return (
    <MainLayout>
      <main className={styles['content']}>
        {Tabs}
        <ActiveTab></ActiveTab>
      </main>
    </MainLayout>
  );
}

export default ProfileScreen;
