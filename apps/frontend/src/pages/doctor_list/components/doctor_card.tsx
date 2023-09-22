import { useEffect, useState } from 'react';
import { DoctorDTO } from '../dto/doctor-dto';
import styles from '../styles/doctor_list.module.css';

export interface DoctorProps {
  doctor: DoctorDTO;
}

const DoctorCard = (props: DoctorProps) => {
  const [year, setYear] = useState(0);

  useEffect(() => {
    const now = new Date();
    const minus = now.getFullYear() - Number(props.doctor.startWorking);
    setYear(minus);
  }, []);

  return (
    <div className={styles['card']}>
      <div className={styles['card_photo']}>
        {props.doctor.photo ? (
          <img
            className={styles['photo']}
            src={`http://localhost:3000${props.doctor.photo}`}
            alt=""
          />
        ) : props.doctor.user.gender === 'Женщина' ? (
          <img
            className={styles['photo']}
            src="./assets/images/doctors/femalenophoto.png"
            alt="no photo"
          />
        ) : (
          <img
            className={styles['photo']}
            src="./assets/images/doctors/malenophoto.jpeg"
            alt=""
          />
        )}
      </div>
      <div className={`${styles['card_info']} ${styles['info']}`}>
        <div>
          <p className={styles['info_name']}>
            {props.doctor.user.firstname} {props.doctor.user.lastname}
          </p>
          <p className={styles['info_year']}>
            Стаж работы
            <span> {year} </span>
          </p>
        </div>
        <div>
          <p className={styles['info_title']}>Специальность</p>
          <p className={styles['info_about']}>{props.doctor.speciality}</p>
        </div>
        <div>
          <p className={styles['info_title']}>Категория</p>
          <p className={styles['info_about']}>{props.doctor.category}</p>
        </div>
        <div>
          <p className={styles['info_title']}>Тип</p>
          <p className={styles['info_about']}>{props.doctor.type}</p>
        </div>
        <div>
          <p className={styles['info_title']}>Образование</p>
          <p className={styles['info_study']}>{props.doctor.info}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
