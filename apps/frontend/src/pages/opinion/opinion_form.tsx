import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/opinionForm.module.css';
import * as dayjs from 'dayjs';
import api from '../../infrastructure/api';
import { useParams } from 'react-router-dom';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import OpinionToPrint from './component/opinion_to_print';
import { AppointmentDto, OpinionDto } from './schemas/Appointment.dto';
import { snackbarStore } from '../../stores';
import { Form, Snackbar } from './../../components';

interface OpinionFormProps {
  appointment_id: number;
}

const OpinionForm: React.FC = () => {
  const date = dayjs();
  const { appointmentId } = useParams();

  const [complaint, setComplaint] = useState('');
  const [treatment, setTreatment] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [age, setAge] = useState(0);
  const [isSave, setIsSave] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isError, setIsError] = useState(false);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [appointment, setAppointment] = useState<AppointmentDto>();

  const verification = (data: FormData): Boolean => {
    let isValidate = true;

    if (data.get('patient_complaint') === '') {
      document
        .getElementsByName('patient_complaint')[0]
        .classList.add(`${styles['error']}`);
      isValidate = false;
    } else {
      document
        .getElementsByName('patient_complaint')[0]
        .classList.remove(`${styles['error']}`);
    }

    if (data.get('treatment_plan') === '') {
      document
        .getElementsByName('treatment_plan')[0]
        .classList.add(`${styles['error']}`);
      isValidate = false;
    } else {
      document
        .getElementsByName('treatment_plan')[0]
        .classList.remove(`${styles['error']}`);
    }

    if (data.get('disease_conclusion') === '') {
      document
        .getElementsByName('disease_conclusion')[0]
        .classList.add(`${styles['error']}`);
      isValidate = false;
    } else {
      document
        .getElementsByName('disease_conclusion')[0]
        .classList.remove(`${styles['error']}`);
    }

    return isValidate;
  };

  const createOpinion = async (formData: FormData) => {
    await api({
      method: 'patch',
      url: `/appointments/${appointmentId}/addOpinion`,
      data: {
        patient_complaint: formData.get('patient_complaint'),
        treatment_plan: formData.get('treatment_plan'),
        disease_conclusion: formData.get('disease_conclusion'),
        time_start: date,
      },
    })
      .then(async function ({ data }) {
        setAppointment(data);
        setIsSave(true);
        setIsCreate(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateOpinion = async (formData: FormData) => {
    try {
      await api({
        method: 'patch',
        url: `/medical-history/update/${appointment?.opinion.id}`,
        data: {
          patient_complaint: formData.get('patient_complaint'),
          treatment_plan: formData.get('treatment_plan'),
          disease_conclusion: formData.get('disease_conclusion'),
        },
      })
        .then(({ data }: { data: OpinionDto }) => {
          setAppointment((prevAppointment) => {
            if (prevAppointment) {
              return {
                ...prevAppointment,
                opinion: data,
              };
            }
            return prevAppointment;
          });
          setIsSave(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (!verification(formData)) {
      setIsError(true);
    } else {
      try {
        setIsError(false);
        if (!isCreate) {
          createOpinion(formData);
        } else {
          console.log('update form');
          updateOpinion(formData);
        }
      } catch (error) {
        console.log(`${error}`);
      }
    }
  };

  const handleClose = () => {
    if (isSave) {
      window.history.back();
    } else {
      snackbarStore.setContent({
        severity: 'warning',
        message: 'Чтобы закрыть форму необходимо сохранить все обновления',
      });

      snackbarStore.handleOpen();
    }
  };

  const culcAge = (bday: string) => {
    const birthdate = dayjs(bday, 'DD.MM.YYYY');
    const currentDate = dayjs();
    const ageInYears = currentDate.diff(birthdate, 'year');
    setAge(Math.abs(ageInYears));
  };

  useEffect(() => {
    async function getPatient() {
      try {
        await api(`/appointments/${appointmentId}`)
          .then(({ data, status }) => {
            setAppointment(data);
            culcAge(data?.bday);
          })
          .catch((error) => {
            snackbarStore.setContent({
              severity: 'error',
              message:
                'Произошла ошибка. Не удалось обнаружить запись. Попробуйте еще раз.',
            });

            snackbarStore.handleOpen();
            setTimeout(() => {
              window.history.back();
            }, 2000);
          });
      } catch (error) {
        console.log(error);
      }
    }
    getPatient();
  }, []);

  return (
    <>
      <div className={styles['consultative-report']}>
        <img
          src="../../../assets/images/close.png"
          alt="close window"
          className={styles['close']}
          onClick={handleClose}
        />
        <form
          className={styles['consultative-report-form']}
          onSubmit={handleSubmit}
          onChange={(e) => setIsSave(false)}
        >
          <header className={styles['header']}>
            <div className={styles['header-title']}>
              <h2 className={styles['header-title-medical']}>Medical</h2>
              <h2 className={styles['header-title-online']}>ONLINE</h2>
            </div>
            <h3 className={styles['consult-title']}>
              Консультативное заключение
            </h3>
            <ul className={styles['consult-date-list']}>
              <li>
                <p className={styles['consult-date-item']}>
                  Дата
                  <span className={styles['consult-date-input']}>
                    {date.format('DD.MM.YYYY')}
                  </span>
                </p>
              </li>
              <li className={styles['consult-date-item']}>
                <p className={styles['consult-date-item']}>
                  Время
                  <span className={styles['consult-time-input']}>
                    {date.format('HH:mm')}
                  </span>
                </p>
              </li>
            </ul>
          </header>

          <main className={styles['content']}>
            <ul className={styles['patient-list']}>
              <li
                className={`${styles['patient-item']} ${styles['patient-item-name']}`}
              >
                <p className={styles['patient-text-name']}>*Ф.И.О.</p>
                <p className={styles['patient-name-input']}>
                  {appointment?.patient}
                </p>
              </li>
              <li
                className={`${styles['patient-item']} ${styles['patient-item-birthday']}`}
              >
                <div>
                  <p className={styles['patient-text-name']}>*Дата рождения</p>
                  <p className={styles['patient-birthday-input']}>
                    {appointment?.bday}
                  </p>
                </div>
                <div>
                  <p className={styles['patient-text-name']}>*Возраст</p>
                  <p className={styles['patient-birthday-input']}>{age}</p>
                </div>
              </li>
              <li
                className={`${styles['patient-item']} ${styles['patient-item-survey']}`}
              >
                <p className={styles['patient-text-survey']}>
                  *Жалобы/протокол исследования
                </p>
                <textarea
                  name="patient_complaint"
                  className={styles['patient-survey-input']}
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                ></textarea>
              </li>
              <li
                className={`${styles['patient-item']} ${styles['patient-item-diagnosis']}`}
              >
                <p className={styles['patient-text-diagnosis']}>
                  *Заключение/диагноз
                </p>
                <textarea
                  name="disease_conclusion"
                  className={styles['patient-diagnosis-input']}
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                ></textarea>
              </li>
              <li
                className={`${styles['patient-item']} ${styles['patient-item-therapy']}`}
              >
                <p className={styles['patient-text-therapy']}>
                  *План обследования и лечения
                </p>
                <textarea
                  name="treatment_plan"
                  className={styles['patient-therapy-input']}
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                ></textarea>
              </li>
            </ul>
            <p
              id="error"
              style={{ display: isError ? 'inline' : 'none' }}
              className={styles['error_text']}
            >
              * Все поля должны быть заполнены
            </p>
            <div className={styles['report-btn']}>
              <input
                id="save"
                style={{ display: isSave ? 'none' : 'block' }}
                className={styles['report-btn-save']}
                type="submit"
                value="СОХРАНИТЬ"
              />
            </div>
          </main>
        </form>
        <button
          style={{ display: !isSave ? 'none' : 'block' }}
          className={styles['report-btn-print']}
          onClick={handlePrint}
        >
          ПЕЧАТЬ
        </button>
        <div style={{ display: 'none' }}>
          <OpinionToPrint ref={componentRef} appointment={appointment} />
        </div>
      </div>
      <Snackbar />
    </>
  );
};

export default OpinionForm;
