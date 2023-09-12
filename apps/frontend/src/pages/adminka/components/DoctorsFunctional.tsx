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

  const handleDoctorId = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedDoctorId = getDocId(event.target.value);
    setDoctorId(selectedDoctorId);
    console.log('id doctor *', selectedDoctorId, '*');
  };

  useEffect(() => {
    if (doctorId !== null) {
      getDoctorById(doctorId)
        .then((data) => {
          setDoctor(data);
          console.log('doctor', data);
        })
        .catch((error: Error) => {
          console.log(error);
          setDoctor(undefined);
        });
    }
  }, [doctorId]);

  return (
    <div className={styles['doctors']}>
      <div className={styles['doctors-btn']}>
        <button>Добавить нового</button>
        <button>Изменить</button>
      </div>
      <div className={styles['doctors-form']}>
        <div className={styles['doctors-form-update']}>
          <DoctorFind handleSetId={handleDoctorId} />
        </div>
        <DoctorForm doctor={doctor} />
      </div>
    </div>
  );
};

export default DoctorsFunctional;
