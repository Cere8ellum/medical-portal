import { Snackbar } from '@mui/material';
import { snackbarStore } from '../../../../stores';
import * as React from 'react';
import { DoctorDto } from '../../interfaces/Doctor.dto';
import DoctorFind from '../DoctorForm/DoctorFind';
import NewSchedule from './components/ScheduleDatePicker';
import ScheduleList from './components/ScheduleList';
import styles from './styles/scheduledatepicker.module.css';
import ScheduleDoctorInfo from './components/ScheduleDoctorInfo';
import api from 'apps/frontend/src/infrastructure/api';
import { groupDatesByPeriod } from '../../utils/daterange';
import { AbsenceSchedule } from '../../interfaces/AbsenceSchedule.dto';

export default function ScheduleScreen() {
  const [doctor, setDoctor] = React.useState<DoctorDto | undefined>(undefined);
  const [schedules, setSchedules] = React.useState<
    Array<{
      range: string;
      cause: string;
      ids: number[];
    }>
  >([]);
  const selectSpecialityRef = React.useRef<HTMLSelectElement | null>(null);

  const getDoctor = (doctor: DoctorDto | undefined): void => {
    setDoctor(doctor);
  };

  const handleSchedule = async (
    start: Date | null,
    end: Date | null,
    cause: string
  ) => {
    try {
      await api({
        method: 'post',
        url: `/absence-schedule`,
        data: {
          doctor_id: doctor?.id,
          date_start: start,
          date_end: end,
          cause: cause,
        },
      })
        .then(({ data, status }) => {
          console.log('status', status);
          if (status === 201) {
            snackbarStore.setContent({
              severity: 'success',
              message: `${cause} добавлен`,
            });
            snackbarStore.handleOpen();
          }
        })
        .catch((error) => {
          snackbarStore.setContent({
            severity: 'error',
            message: `Произошла ошибка: ${error}`,
          });
          snackbarStore.handleOpen();
        });
    } catch (error) {
      snackbarStore.setContent({
        severity: 'error',
        message: `Произошла ошибка: ${error}`,
      });
      snackbarStore.handleOpen();
    }
  };

  React.useEffect(() => {
    setDoctor(undefined);
  }, []);

  React.useEffect(() => {
    if (doctor) {
      try {
        api(`/absence-schedule/doctor?doctorId=${doctor?.id}`)
          .then(({ data }: { data: AbsenceSchedule[] }) => {
            setSchedules(groupDatesByPeriod(data));
          })
          .catch((error) => {
            console.log('error get Schedule', error);
          });
      } catch (error) {
        console.log('error get Schedule', error);
      }
    }
  }, [doctor, handleSchedule]);

  return (
    <div className={styles['schedule']}>
      <div className={styles['schedule-doctor']}>
        <div
          className={styles['schedule-doctor-find']}
          style={{ display: !doctor ? 'flex' : 'none' }}
        >
          <h3>Выберите врача</h3>
          <DoctorFind getDoctor={getDoctor} ref={selectSpecialityRef} />
        </div>
        <div style={{ display: doctor ? 'flex' : 'none' }}>
          <ScheduleDoctorInfo doctor={doctor} getDoctor={getDoctor} />
        </div>
      </div>
      <div
        style={{ display: doctor ? 'flex' : 'none' }}
        className={styles['schedule-doctor-list']}
      >
        <NewSchedule doctorId={doctor?.id} handleSchedule={handleSchedule} />
        <ScheduleList schedules={schedules}></ScheduleList>
      </div>
      <Snackbar />
    </div>
  );
}
