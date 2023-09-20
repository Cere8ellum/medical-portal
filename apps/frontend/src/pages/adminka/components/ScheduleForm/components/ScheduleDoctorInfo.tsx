import * as React from 'react';
import styles from '../styles/scheduledatepicker.module.css';
import { DoctorDto } from '../../../interfaces/Doctor.dto';
import { useLinkClickHandler } from 'react-router-dom';

interface DoctorInfoProps {
  doctor: DoctorDto | undefined;
  getDoctor: (doctor: DoctorDto | undefined) => void;
}

const ScheduleDoctorInfo: React.FC<DoctorInfoProps> = ({
  doctor,
  getDoctor,
}: DoctorInfoProps) => {
  const handlerClick = () => {
    getDoctor(undefined);
  };

  return (
    <div className={styles['doctor']}>
      <img
        src="../../../../assets/images/adminka/back.png"
        alt="back"
        className={styles['doctor-back']}
        onClick={handlerClick}
      />
      {doctor ? (
        <img
          src={`http://localhost:3000/${doctor?.photo}`}
          alt="photo"
          className={styles['doctor-photo']}
        />
      ) : (
        ''
      )}
      <div className={styles['doctor-info']}>
        <p
          className={styles['doctor-info-name']}
        >{`${doctor?.user.firstname} ${doctor?.user.lastname}`}</p>
        <p className={styles['doctor-info-speciality']}>
          {`Врач - ${doctor?.speciality.toLowerCase()}`}
        </p>
      </div>
    </div>
  );
};

export default ScheduleDoctorInfo;
