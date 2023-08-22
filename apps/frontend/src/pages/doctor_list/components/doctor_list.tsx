import { useEffect, useState } from 'react';
import styles from '../styles/doctor_list.module.css';
import DoctorCard from './doctor_card';
import axios from 'axios';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  async function getDoctors() {
    try {
      const response = await axios.get('http://localhost:3000/api/doctors/all');
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <main className={styles['doctors']}>
      <h1 className={styles['doctors_title']}>СПИСОК ВРАЧЕЙ</h1>
      <div className={`${styles['doctors_search']} ${styles['filter']}`}>
        <p className={styles['filter_title']}>Фильтр врачей по специализации</p>
        <div className={styles['filter_select']}></div>
      </div>
      <div className={styles['doctors_card']}>
        {doctors.map((doc) => {
          return <DoctorCard doctor={doc}></DoctorCard>;
        })}
      </div>
    </main>
  );
};

export default DoctorList;
