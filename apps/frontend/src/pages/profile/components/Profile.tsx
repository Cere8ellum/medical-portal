import { useEffect, useState } from 'react'
import styles from './styles/profile.module.css'

interface Appointment {
  user_name: string
  doctor_name: string
  date: string
  email: string
}

export function Profile() {

const [appointment,setAppointment] = useState<Appointment>();

useEffect(()=> {
  const storedData = localStorage.getItem('appointments');
    // Проверяем, есть ли данные в Local Storage
    if (storedData) {
      const dataToSend = JSON.parse(storedData);
      setAppointment(dataToSend);
      console.log('Прочитанные данные из Local Storage:', dataToSend);
    } else {
      console.log('В Local Storage нет сохраненных данных или они удалены.');
    }
},[])

  return (
<div className={styles['appointment']}>
  <h1 className={styles['appointment_title']}>Appointments</h1>
  <div className={styles['appointment_table_head']}>
    <div  className={styles['appointment_table_column_number']}>N</div>
    <div className={styles['appointment_table_column_doctor']}>Doctor</div>
    <div className={styles['appointment_table_column_date']}>Date</div>
    <div className={styles['appointment_table_column_status']}>Status</div>
    <div className={styles['appointment_table_column_summary']}>Summary</div>
    <div className={styles['appointment_table_column_cancel']}>Cancel</div>
  </div>
     { appointment? (
      <div className={styles['appointment_table_row']}>
          <div className={styles['appointment_table_column_number']}>1</div>
          <div className={styles['appointment_table_column_doctor']}>{appointment.doctor_name}</div>
          <div className={styles['appointment_table_column_date']}>{appointment.date}</div>
          <div className={styles['appointment_table_column_status']}>waiting</div>
          <div className={styles['appointment_table_column_summary']}></div>
          <div className={styles['appointment_table_column_cancel']}>X</div>
      </div>
     )
     : ''}
</div>
)}
