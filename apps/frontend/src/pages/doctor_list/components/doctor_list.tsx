import styles from '../styles/doctor_list.module.css';
import DoctorCard from './doctor_card';

const DoctorList = () => {
  return (
    <main className={styles['doctors']}>
      <h1 className={styles['doctors_title']}>СПИСОК ВРАЧЕЙ</h1>
      <div className={`${styles['doctors_search']} ${styles['filter']}`}>
        <p className={styles['filter_title']}>Фильтр врачей по специализации</p>
        <div className={styles['filter_select']}></div>
      </div>
      <div className={styles['doctors_card']}>
        <DoctorCard></DoctorCard>
      </div>
    </main>
  );
};

export default DoctorList;
