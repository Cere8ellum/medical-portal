import api from 'apps/frontend/src/infrastructure/api';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/adminka.module.css';
import { getSpeciality } from '../utils/doctors';

const DoctorsFunctional: React.FC = () => {
  const [specialities, setSpecialities] = useState<Array<string>>([]);

  useEffect(() => {
    getSpeciality()
      .then((data) => {
        setSpecialities(data);
      })
      .catch((error) => {
        console.log(error);
        setSpecialities([]);
      });
  }, []);

  return (
    <div className={styles['doctors']}>
      <div className={styles['doctors-btn']}>
        <button>Добавить нового</button>
        <button>Изменить</button>
      </div>
      <div className={styles['doctors-form']}>
        <div className={styles['doctors-form-update']}>
          <div className={styles['doctors-speciality']}>
            <select
              name="speciality"
              id="speciality"
              className={styles['doctors-select']}
            >
              <option value="0">Специальность</option>
              {specialities
                ? specialities.map((spec: string, index: number) => {
                    return <option value={`${index + 1}`}>{spec}</option>;
                  })
                : ''}
            </select>
            <select
              name="family"
              id="family"
              className={styles['doctors-select']}
            >
              <option value="0">ФИО ВРАЧА</option>
              {''}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsFunctional;
