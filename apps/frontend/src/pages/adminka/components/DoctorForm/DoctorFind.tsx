import React, { useEffect, useRef, useState } from 'react';
import { DoctorDto } from '../../interfaces/Doctor.dto';
import styles from '../../styles/adminka.module.css';
import { getDocId, getDoctors, getSpeciality } from '../../utils/doctors';

interface DoctorFindProps {
  getDoctor: (doctor: DoctorDto | undefined) => void;
}

const DoctorFind: React.FC<DoctorFindProps> = ({
  getDoctor,
}: DoctorFindProps) => {
  const initialState = {
    speciality: 'all',
    family: 'all',
  };

  const [specialities, setSpecialities] = useState<Array<string>>([]);
  const [doctors, setDoctors] = useState<Array<DoctorDto>>([]);
  const [selects, setSelects] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === 'speciality') {
      setSelects({ ...selects, [name]: value, ['family']: 'all' });
    } else {
      setSelects({ ...selects, [name]: value });
      doctors.map((doc: DoctorDto) => {
        if (doc.id === getDocId(value)) {
          getDoctor(doc);
        }
      });
    }
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
    getDoctors(selects.speciality)
      .then((data: DoctorDto[]) => {
        setDoctors(data);
      })
      .catch((error: Error) => {
        setDoctors([]);
        console.log(error);
      });
  }, []);

  return (
    <div className={styles['doctors-speciality']}>
      <select
        name="speciality"
        id="speciality"
        className={styles['doctors-select']}
        value={selects.speciality}
        onChange={handleChange}
      >
        <option value="all">Специальность</option>
        {specialities
          ? specialities.map((spec: string) => {
              return <option value={`${spec}`}>{spec}</option>;
            })
          : ''}
      </select>
      <select
        name="family"
        id="family"
        className={styles['doctors-select']}
        value={selects.family}
        onChange={handleChange}
      >
        <option value="0">ФИО ВРАЧА</option>
        {doctors.map((doc: DoctorDto) => {
          const FIO = `${doc?.user?.firstname} ${doc?.user?.lastname}`;
          if (selects.speciality === 'all') {
            return <option value={`docId-${doc.id}`}>{FIO}</option>;
          } else {
            if (selects.speciality === doc?.speciality) {
              return <option value={`docId-${doc.id}`}>{FIO}</option>;
            }
          }
        })}
      </select>
    </div>
  );
};

export default DoctorFind;
