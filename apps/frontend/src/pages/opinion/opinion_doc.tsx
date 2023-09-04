import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../infrastructure/api';
import styles from './styles/opinionDoc.module.css';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { AppointmentDto, OpinionDto } from './schemas/Appointment.dto';
import OpinionToPrint from './component/opinion_to_print';

interface OpinionDocProps {
  appointment_id: number;
}

const OpinionDocument = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState<AppointmentDto | undefined>();
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleClose = () => {
    window.history.back();
  };

  useEffect(() => {
    api({
      method: 'get',
      url: `/appointments/${appointmentId}`,
    })
      .then(({ data, status }) => {
        console.log(status, data);
        setAppointment(data);
      })
      .catch((error) => {
        console.log(error);
        //setAppointment(undefined);
      });
  }, []);

  return appointment !== undefined ? (
    <div className={styles['consultative-report']}>
      <img
        src="../../../assets/images/close.png"
        alt="close window"
        className={styles['close']}
        onClick={handleClose}
      />
      <header className={styles['header']}>
        <div className={styles['header-title']}>
          <h2 className={styles['header-title-medical']}>Medical</h2>
          <h2 className={styles['header-title-online']}>ONLINE</h2>
        </div>

        <div className={styles['consult-header']}>
          <h3 className={styles['consult-title']}>
            Консультативное заключение
          </h3>
          <ul className={styles['consult-date-list']}>
            <li className={styles['consult-date-item']}>
              <p className={styles['consult-date-text']}>
                Дата:{' '}
                {dayjs(appointment?.opinion?.time_start).format('DD.MM.YYYY')}
              </p>
            </li>
            <li className={styles['consult-date-item']}>
              <p className={styles['consult-date-text']}>
                Время: {dayjs(appointment?.opinion?.time_start).format('HH:mm')}
              </p>
            </li>
          </ul>
        </div>
      </header>

      <main className={styles['content']}>
        <div className={styles['patient-info']}>
          <ul className={styles['patient-list']}>
            <li
              className={`${styles['patient-item']} ${styles['patient-item-name']}`}
            >
              <p className={styles['patient-text-name']}>
                ФИО пациента:{' '}
                <span className={styles['patient-text-name-field']}>
                  {appointment?.patient}
                </span>
              </p>
            </li>
            <li
              className={`${styles['patient-item']} ${styles['patient-item-birthday']}`}
            >
              <p className={styles['patient-text-birthday']}>
                Дата рождения:
                <span className={styles['patient-text-birthday-field']}>
                  {appointment?.bday}
                </span>
              </p>
            </li>
            <li
              className={`${styles['patient-item']} ${styles['patient-item-survey']}`}
            >
              <p className={styles['patient-text-survey']}>
                Жалобы/протокол исследования:
              </p>
              <p className={styles['patient-text-survey-field']}>
                {appointment?.opinion?.patient_complaint}
              </p>
            </li>
            <li
              className={`${styles['patient-item']} ${styles['patient-item-diagnosis']}`}
            >
              <p className={styles['patient-text-diagnosis']}>
                Заключение/диагноз:
              </p>
              <p className={styles['patient-text-diagnosis-field']}>
                {appointment?.opinion?.disease_conclusion}
              </p>
            </li>
            <li
              className={`${styles['patient-item']} ${styles['patient-item-therapy']}`}
            >
              <p className={styles['patient-text-therapy']}>
                План обследования и лечения:{' '}
              </p>
              <p className={styles['patient-text-therapy-field']}>
                {appointment?.opinion?.treatment_plan}
              </p>
            </li>
          </ul>
        </div>

        <div className={styles['doctor-info']}>
          <h4 className={styles['doctor-info-title']}>Консультант:</h4>
          <div className={styles['doctor-info-title']}>
            <h4>{appointment?.doctor}</h4>
            <h4
              className={`${styles['doctor-info-text']} ${styles['doctor-info-text-speciality']}`}
            >
              Врач - {appointment?.speciality}
            </h4>

            <h4
              className={`${styles['doctor-info-text']} ${styles['doctor-info-text-category']}`}
            >
              {appointment?.category}
            </h4>
          </div>
        </div>
        <button className={styles['report-btn-print']} onClick={handlePrint}>
          ПЕЧАТЬ
        </button>
        <div style={{ display: 'none' }}>
          <OpinionToPrint ref={componentRef} appointment={appointment} />
        </div>
      </main>
    </div>
  ) : (
    <div className={styles['not-found']}>
      <img src="../../../assets/images/not_found.jpeg" alt="" />
      <h3>Консультативное заключение не найдено</h3>
    </div>
  );
};

export default OpinionDocument;
