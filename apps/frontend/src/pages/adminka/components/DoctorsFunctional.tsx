import api from 'apps/frontend/src/infrastructure/api';
import { set } from 'mobx';
import React, { useEffect, useRef, useState } from 'react';
import { DoctorDto } from '../interfaces/Doctor.dto';
import styles from '../styles/adminka.module.css';
import { getDoctors, getSpeciality } from '../utils/doctors';
import NewDoctorForm from './NewDoctorForm';

const DoctorsFunctional: React.FC = () => {
  const [specialities, setSpecialities] = useState<Array<string>>([]);
  const [doctors, setDoctors] = useState<Array<DoctorDto>>([]);
  const [speciality, setSpeciality] = useState<string>('all');

  const handleSpeciality = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpeciality = event.target.value;
    setSpeciality(selectedSpeciality);
  };

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

  useEffect(() => {
    getDoctors(speciality)
      .then((data: DoctorDto[]) => {
        setDoctors(data);
      })
      .catch((error: Error) => {
        setDoctors([]);
        console.log(error);
      });
  }, [speciality]);

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
              onChange={handleSpeciality}
            >
              <option value="all">Специальность</option>
              {specialities
                ? specialities.map((spec: string, index: number) => {
                    return <option value={`${spec}`}>{spec}</option>;
                  })
                : ''}
            </select>
            <select
              name="family"
              id="family"
              className={styles['doctors-select']}
            >
              <option value="0">ФИО ВРАЧА</option>
              {doctors.map((doc: DoctorDto) => {
                const FIO = `${doc?.user?.firstname} ${doc?.user?.lastname}`;
                return <option value={`docId-${doc.id}`}>{FIO}</option>;
              })}
            </select>
          </div>
        </div>
        <NewDoctorForm />
      </div>
    </div>
  );
};

export default DoctorsFunctional;
