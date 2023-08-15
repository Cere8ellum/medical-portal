import MainLayout from 'apps/frontend/src/app/MainLayout';
import { useEffect, useState } from 'react';
import styles from './styles/profile.module.css';
import axios from 'axios';
import TabsPersonalAccountPatient from './components/TabsPersonalAccountPatient';
import PersonalDataField from './components/PersonalDataField';
import PersonalDataButton from './components/PersonalDataButton';

function ProfileScreen() {
  async function getUser() {
    try {
      const response = await axios.get('http://localhost:3000/api/user/1');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser;
  }, []);

  return (
    <MainLayout>
      <main className={styles['content']}>
        <TabsPersonalAccountPatient />

        <div className={styles['content-form']}>
          <form className={styles['persdata-form']} action="#">
            <PersonalDataField />
            <PersonalDataButton />
          </form>
        </div>
      </main>
    </MainLayout>
  );
}

export default ProfileScreen;
