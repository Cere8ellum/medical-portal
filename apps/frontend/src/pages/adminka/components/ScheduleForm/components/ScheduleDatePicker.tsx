import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import styles from '../styles/scheduledatepicker.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { Cause } from '../../../enum/cause.enum';
import { DoctorDto } from '../../../interfaces/Doctor.dto';
import api from 'apps/frontend/src/infrastructure/api';
import { snackbarStore } from 'apps/frontend/src/stores';
import { Snackbar } from 'apps/frontend/src/components';
registerLocale('ru', ru);

interface NewNewScheduleProps {
  doctorId: number | undefined;
  handleSchedule: (
    start: Date | null,
    end: Date | null,
    cause: string
  ) => Promise<void>;
  excludeDays: Date[];
}

export default function NewSchedule({
  doctorId,
  handleSchedule,
  excludeDays,
}: NewNewScheduleProps) {
  const [dateRange, setDateRange] = useState<Array<Date | null>>([null, null]);
  const [start, end] = dateRange;
  const [cause, setCause] = useState<string>('');
  const [isForm, setIsForm] = useState<boolean>(false);

  const onChange = (dates: Array<Date | null>) => {
    const [start, end] = dates;
    setDateRange(dates);
  };

  React.useEffect(() => {
    setIsForm(false);
  }, [doctorId]);

  const isValidForm = (): boolean => {
    if (start !== null && end !== null && cause !== '') {
      return true;
    }
    return false;
  };

  const handleCause = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCause(value);
  };

  const handleClick = () => {
    if (isValidForm()) {
      handleSchedule(start, end, cause);
      setIsForm(false);
      setDateRange([null, null]);
      setCause('');
    } else {
      snackbarStore.setContent({
        severity: 'warning',
        message: `Не вся информация заполнена`,
      });
      snackbarStore.handleOpen();
    }
  };

  return (
    <div className={styles['new-leave']}>
      <h3 className={styles['new-leave-title']}>График отсутствия врача</h3>
      {!isForm ? (
        <button
          className={styles['new-leave-create']}
          onClick={() => setIsForm(true)}
        >
          + ДОБАВИТЬ
        </button>
      ) : (
        <div className={styles['new-leave-form']}>
          <img
            className={styles['leave']}
            src="../../../../assets/images/close.png"
            alt="close"
            onClick={() => {
              setIsForm(false);
            }}
          />
          <DatePicker
            selectsRange={true}
            startDate={start}
            endDate={end}
            onChange={onChange}
            excludeDates={[...excludeDays]}
            isClearable={true}
            //selectsDisabledDaysInRange={true}
            locale="ru"
            className={styles['new-leave-calendar']}
            value="* Выберите даты"
          />
          <select
            name="cause"
            id="cause"
            value={cause}
            onChange={handleCause}
            className={styles['new-leave-cause']}
          >
            <option value="">* Причина отсутствия</option>
            {Object.entries(Cause).map(([key, value]) => {
              return (
                <option key={key} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
          <button className={styles['new-leave-add']} onClick={handleClick}>
            ДОБАВИТЬ
          </button>
        </div>
      )}
      <Snackbar />
    </div>
  );
}
