import React, { useEffect, useRef, useState } from 'react';
import { DoctorDto } from '../interfaces/Doctor.dto';
import styles from '../styles/adminka.module.css';
import {
  getDocId,
  getDoctorById,
  getDoctors,
  getSpeciality,
} from '../utils/doctors';
import DoctorFind from './DoctorFind';
import DoctorForm from './NewDoctorForm';

const DoctorsFunctional: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorDto | undefined>(undefined);
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [isCreate, setIsCreate] = useState<boolean | null>(false);

  const handleDoctorId = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedDoctorId = getDocId(event.target.value);
    if (selectedDoctorId !== null) {
      getDoctorById(selectedDoctorId)
        .then((data) => {
          setDoctor(data);
        })
        .catch((error: Error) => {
          console.log(error);
          setDoctor(undefined);
        });
    } else {
      setDoctor(undefined);
    }
  };

  return (
    <div className={styles['doctors']}>
      <div className={styles['doctors-btn']}>
        <button onClick={() => setIsCreate(true)}>Добавить нового</button>
        <button
          onClick={() => {
            setIsCreate(false), setDoctorId(null);
          }}
        >
          Изменить
        </button>
      </div>
      <div className={styles['doctors-form']}>
        <div className={styles['doctors-form-update']}>
          <DoctorFind handleSetId={handleDoctorId} />
        </div>
        <DoctorForm doctor={doctor} isCreate={isCreate} />
      </div>
    </div>
  );
};

export default DoctorsFunctional;
