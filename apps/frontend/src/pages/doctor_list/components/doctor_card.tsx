import { useEffect, useState } from 'react';
import styles from '../styles/doctor_list.module.css';

export interface DoctorProps {
  doctor: {
    id: number;
    category: string;
    speciality: string;
    type: string;
    startWorking: string;
    info: string;
    price: string;
    photo: string;
    user: {
      id: number;
      firstname: string;
      lastname: string;
      gender: string;
    };
  };
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
      <div>
        <img
          className={styles['card_photo']}
          src={`http://localhost:3000${props.doctor.photo}`}
          alt=""
        />
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
          <p className={styles['info_about']}>{props.doctor.info}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
