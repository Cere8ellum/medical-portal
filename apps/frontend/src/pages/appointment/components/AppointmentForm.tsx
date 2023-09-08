/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SyntheticEvent, useEffect, useReducer, useRef } from 'react';
import { Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  validateYupSchema,
  yupToFormErrors,
} from 'formik';
import { isAxiosError } from 'axios';
import api from '../../../infrastructure/api';
import { snackbarStore } from '../../../stores';
import { Form, Snackbar } from '../../../components';
import { Field, formReducer, FormState, Status } from '../reducers/formReducer';
import appointmentSchema from '../schemas/appointmentSchema';
import WrappedAutoComplete from './Autocomplete';

export type Option = {
  value: string;
  label: string;
};

interface User {
  firstname: string;
  lastname: string;
}

interface Doctor {
  id: number;
  user: User;
}

interface Absence {
  id: number;
  doctor_id: number;
  date: Date;
}

const initialState: FormState = {
  specialities: [],
  doctors: [],
  absences: [],
  timeSlots: [],
  status: Status.Idle,
};

interface FormikValues {
  speciality: string | null;
  doctor: Option | null;
  appointmentDate: Dayjs | null;
  appointmentTime: Option | null;
}

const initialValues: FormikValues = {
  speciality: null,
  doctor: null,
  appointmentDate: null,
  appointmentTime: null,
};

const createTimeSlotsOptions = (startTime: Dayjs, endTime: Dayjs): Option[] => {
  const timeSlotsOptions = [];
  let index = 0;

  while (endTime.diff(startTime, 'minute') >= 30) {
    timeSlotsOptions.push({
      value: `${index++}`,
      label: startTime.format('HH:mm'),
    });

    startTime = startTime.add(30, 'minute');
  }

  return timeSlotsOptions;
};

const getTimeSlotsOptions = (date: Dayjs): Option[] => {
  let startTime = dayjs().startOf('minute');
  const endTime = dayjs().set('hour', 20).startOf('hour');
  const isToday = dayjs().isSame(date, 'day');

  if ((isToday && startTime.hour() < 8) || !isToday) {
    startTime = startTime.set('hour', 8).startOf('hour');

    return createTimeSlotsOptions(startTime, endTime);
  }

  if (startTime.minute() >= 30) {
    startTime = startTime.add(1, 'hour').set('minute', 0);
  } else {
    startTime = startTime.set('minute', 30);
  }

  return createTimeSlotsOptions(startTime, endTime);
};

const AppointmentForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const formikRef = useRef<FormikProps<FormikValues>>(null);
  const dateRef = useRef<Dayjs | null>(null);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        dispatch({ type: 'FETCH' });

        const { data } = await api.get('doctors/all/specialities');

        dispatch({
          type: 'SET_DATA',
          field: Field.Specialities,
          payload: data,
        });
        dispatch({ type: 'RESOLVE' });
      } catch (error) {
        dispatch({ type: 'REJECT' });

        if (isAxiosError(error)) {
          snackbarStore.setContent({
            severity: 'error',
            message: error.request.data.message,
          });

          snackbarStore.handleOpen();
        } else {
          console.error(error);
        }
      }
    };

    fetchSpecialities();
  }, []);

  const fetchDoctors = async (speciality: string): Promise<void> => {
    try {
      dispatch({ type: 'FETCH' });

      const res = await api.get(`doctors/speciality/?speciality=${speciality}`);
      const doctors = res.data.map((el: Doctor) => ({
        value: el.id.toString(),
        label: `${el.user.firstname} ${el.user.lastname}`,
      }));

      dispatch({
        type: 'SET_DATA',
        field: Field.Doctors,
        payload: doctors,
      });
      dispatch({ type: 'RESOLVE' });
    } catch (error) {
      dispatch({ type: 'REJECT' });

      if (
        isAxiosError(error) &&
        error.response !== null &&
        error.response !== undefined
      ) {
        snackbarStore.setContent({
          severity: 'error',
          message: error.request.data.message,
        });

        snackbarStore.handleOpen();
      } else {
        console.error(error);
      }
    }
  };

  const fetchAbsences = async (doctorId: string): Promise<void> => {
    try {
      dispatch({ type: 'FETCH' });

      const { data }: { data: Absence[] } = await api.get(
        `absence-schedule/doctor/?doctorId=${doctorId}`
      );

      const absences = data.map((el) => dayjs(el.date));

      dispatch({
        type: 'SET_DATA',
        field: Field.Absences,
        payload: absences,
      });
      dispatch({ type: 'RESOLVE' });
    } catch (error) {
      dispatch({ type: 'REJECT' });

      if (
        isAxiosError(error) &&
        error.response !== null &&
        error.response !== undefined
      ) {
        snackbarStore.setContent({
          severity: 'error',
          message: error.request.data.message,
        });

        snackbarStore.handleOpen();
      } else {
        console.error(error);
      }
    }
  };

  const fetchDoctorAppointments = async (
    doctorId: string,
    date: string
  ): Promise<void> => {
    try {
      dispatch({ type: 'FETCH' });

      const { data: bookedTimeSlots }: { data: string[] } = await api.get(
        `appointments/booked/doctor/${doctorId}?date=${date}`
      );

      const timeSlotsOptions = getTimeSlotsOptions(dayjs(date));

      const freeTimeSlotsOptions = timeSlotsOptions.filter((option) => {
        const isBooked = bookedTimeSlots.some((slot) => slot === option.label);

        return !isBooked;
      });

      dispatch({
        type: 'SET_DATA',
        field: Field.TimeSlots,
        payload: freeTimeSlotsOptions,
      });

      dispatch({ type: 'RESOLVE' });
    } catch (error) {
      dispatch({ type: 'REJECT' });

      if (
        isAxiosError(error) &&
        error.response !== null &&
        error.response !== undefined
      ) {
        snackbarStore.setContent({
          severity: 'error',
          message: error.request.data.message,
        });

        snackbarStore.handleOpen();
      } else {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (
    { doctor, appointmentDate, appointmentTime }: FormikValues,
    { resetForm, setSubmitting, setFieldError }: FormikHelpers<FormikValues>
  ) => {
    try {
      setSubmitting(true);

      const [hour, minute] = appointmentTime!.label.split(':');
      const date = appointmentDate!
        .hour(Number(hour))
        .minute(Number(minute))
        .format('YYYY-MM-DD HH:mm:ss.SSS	');

      await api.post(`appointments/create`, {
        doctor_id: doctor!.value,
        date_start: date,
      });

      resetForm();

      snackbarStore.setContent({
        severity: 'success',
        message:
          'Вы успешно записались на прием. Ожидайте письмо на электронную почту',
      });

      snackbarStore.handleOpen();
    } catch (err) {
      if (
        isAxiosError(err) &&
        err.response !== null &&
        err.response !== undefined
      ) {
        const { message } = err.response.data;

        if (Array.isArray(message)) {
          snackbarStore.setContent({
            severity: 'error',
            message: message.join('. '),
          });

          snackbarStore.handleOpen();
          return;
        }

        if (typeof message === 'string') {
          snackbarStore.setContent({
            severity: 'error',
            message: message,
          });

          snackbarStore.handleOpen();
        }
      } else {
        console.error(err);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        enableReinitialize
        validate={(values) => {
          const validationSchema = appointmentSchema;

          try {
            validateYupSchema<FormikValues>(values, validationSchema, true, {
              absences: state.absences,
            });
          } catch (err) {
            return yupToFormErrors(err);
          }

          return {};
        }}
        onSubmit={handleSubmit}
      >
        {({
          values: { speciality, doctor, appointmentDate, appointmentTime },
          errors,
          touched,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          resetForm,
          isSubmitting,
          isValid,
          dirty,
        }) => (
          <Form
            method="post"
            sx={{
              width: '342px',
              display: 'flex',
              flexDirection: 'column',
              rowGap: '26px',
            }}
            onSubmit={handleSubmit}
          >
            <WrappedAutoComplete
              id="speciality-select"
              name="speciality"
              label="Специальность"
              options={state.specialities}
              value={speciality}
              error={touched.speciality && Boolean(errors.speciality)}
              helperText={touched.speciality && errors.speciality}
              disabled={
                state.status === Status.Loading || state.status === Status.Error
              }
              onChange={(event: SyntheticEvent, speciality) => {
                resetForm();
                setFieldValue('speciality', speciality);

                if (speciality !== null) {
                  fetchDoctors(speciality);
                }
              }}
              onBlur={handleBlur}
            />
            <WrappedAutoComplete
              id="doctor-select"
              name="doctor"
              label="Врач"
              options={state.doctors}
              value={doctor}
              error={touched.doctor && Boolean(errors.doctor)}
              helperText={touched.doctor && errors.doctor}
              disabled={
                state.status === Status.Loading ||
                state.status === Status.Error ||
                !speciality
              }
              onChange={(event: SyntheticEvent, option) => {
                setFieldValue('appointmentDate', null);
                setFieldValue('appointmentTime', null);

                if (option === null) {
                  setFieldValue('doctor', null);
                  return;
                }

                setFieldValue('doctor', option);

                if (typeof option !== 'string') {
                  fetchAbsences(option.value);
                }
              }}
              onBlur={handleBlur}
            />
            <DatePicker
              label="Выберите день записи"
              value={appointmentDate}
              disabled={
                state.status === Status.Loading ||
                state.status === Status.Error ||
                !speciality ||
                !doctor
              }
              disablePast
              maxDate={dayjs().add(3, 'month')}
              onChange={(value) => {
                setFieldValue('appointmentDate', value);
              }}
              onClose={() => {
                setFieldTouched('appointmentDate', true, false);
              }}
              onAccept={(value) => {
                if (doctor && value !== null && dayjs(value).isValid()) {
                  dateRef.current = value;

                  fetchDoctorAppointments(
                    doctor.value,
                    value.format('YYYY-MM-DD')
                  );
                }
              }}
              shouldDisableDate={(date: unknown): boolean => {
                if (dayjs.isDayjs(date)) {
                  return state.absences.some(
                    (el) =>
                      el.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
                  );
                }

                return false;
              }}
              slotProps={{
                textField: {
                  name: 'appointmentDate',
                  error:
                    touched.appointmentDate && Boolean(errors.appointmentDate),
                  helperText: touched.appointmentDate && errors.appointmentDate,
                  onBlur: (e) => {
                    handleBlur(e);

                    if (
                      doctor &&
                      appointmentDate !== null &&
                      dayjs(appointmentDate).isValid() &&
                      dateRef.current !== appointmentDate
                    ) {
                      dateRef.current = appointmentDate;
                      setFieldValue('appointmentTime', null);

                      fetchDoctorAppointments(
                        doctor.value,
                        appointmentDate.format('YYYY-MM-DD')
                      );
                    }
                  },
                },
              }}
              sx={{
                '& .MuiInputBase-root': {
                  width: '100%',
                  backgroundColor: ({ palette }) => palette.common.white,
                  borderRadius: '10px',
                },

                '& fieldset': {
                  borderColor: ({ palette }) => palette.primary.main,
                  borderWidth: '2px',
                  borderRadius: '10px',
                  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                },

                '& .MuiSvgIcon-root ': {
                  fill: ({ palette }) => palette.primary.main,
                },
              }}
            />
            <WrappedAutoComplete
              id="appointmentTime"
              name="appointmentTime"
              label="Время записи"
              options={state.timeSlots}
              value={appointmentTime}
              error={touched.appointmentTime && Boolean(errors.appointmentTime)}
              helperText={touched.appointmentTime && errors.appointmentTime}
              disabled={
                state.status === Status.Loading ||
                state.status === Status.Error ||
                !speciality ||
                !doctor ||
                !appointmentDate ||
                Boolean(errors.appointmentDate)
              }
              onChange={(event: SyntheticEvent, time) => {
                setFieldValue('appointmentTime', time);
              }}
              onBlur={handleBlur}
              noOptionsText={
                state.timeSlots.length === 0
                  ? 'Выберите другой день'
                  : 'Ничего не найдено'
              }
            />
            <Button
              color="primary"
              variant="contained"
              sx={{
                borderRadius: '10px',
                width: '100%',
                fontSize: '14px',
                fontWeight: '600',
                lineHeight: 'normal',
              }}
              type="submit"
              disabled={!(isValid && dirty) || isSubmitting}
            >
              Записаться на прием
            </Button>
          </Form>
        )}
      </Formik>
      <Snackbar />
    </>
  );
};

export default AppointmentForm;
