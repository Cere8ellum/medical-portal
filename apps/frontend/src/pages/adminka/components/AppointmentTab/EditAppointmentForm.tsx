/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { Button, Typography } from '@mui/material';
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
import api from 'apps/frontend/src/infrastructure/api';
import { snackbarStore } from 'apps/frontend/src/stores';
import { Absence, Option } from 'apps/frontend/src/types';
import { Form } from 'apps/frontend/src/components';
import {
  createTimeSlotOptions,
  getTimeInterval,
} from 'apps/frontend/src/pages/adminka/utils/timeSlots';
import {
  appointmentReducer,
  Field,
  FormState,
  Status,
} from '../../reducers/appointmentReducer';
import editAppointmentSchema from '../../schemas/editAppointmentSchema';
import { Appointment } from './AppointmentTab';
import WrappedAutoComplete from './Autocomplete';

type EditFormState = Pick<FormState, 'absences' | 'timeSlots' | 'status'>;

interface FormikValues {
  appointmentDate: Dayjs | null;
  appointmentTime: Option | null;
}

interface Props {
  appointment: Appointment;
  onSuccess: () => void;
}

const initialState: Pick<FormState, 'absences' | 'timeSlots' | 'status'> = {
  absences: [],
  timeSlots: [],
  status: Status.Idle,
};

const EditAppointmentForm: React.FC<Props> = ({
  appointment: {
    date,
    doctor,
    doctorId,
    id,
    opinion,
    speciality,
    status,
    time,
  },
  onSuccess,
}) => {
  const [state, dispatch] = useReducer(
    appointmentReducer<EditFormState>,
    initialState
  );
  const formikRef = useRef<FormikProps<FormikValues>>(null);
  const dateRef = useRef<Dayjs | null>(null);

  const fetchDoctorAppointments = useCallback(
    async (date: string): Promise<void> => {
      try {
        dispatch({ type: 'FETCH' });

        const { data: bookedTimeSlots }: { data: string[] } = await api.get(
          `appointments/booked/doctor/${doctorId}?date=${date}`
        );

        const timeInterval = getTimeInterval(dayjs(date));
        const timeSlotsOptions = createTimeSlotOptions(timeInterval);

        const freeTimeSlotsOptions = timeSlotsOptions.filter((option) => {
          const isBooked = bookedTimeSlots.some(
            (slot) => slot === option.label
          );

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
    },
    [doctorId]
  );

  useEffect(() => {
    const fetchAbsences = async (): Promise<void> => {
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

    fetchAbsences();
    fetchDoctorAppointments(date);
  }, [doctorId, date, fetchDoctorAppointments]);

  const handleSubmit = async (
    { appointmentDate, appointmentTime }: FormikValues,
    { resetForm, setSubmitting, setFieldError }: FormikHelpers<FormikValues>
  ) => {
    try {
      setSubmitting(true);

      const [hour, minute] = appointmentTime!.label.split(':');
      const date = appointmentDate!
        .hour(Number(hour))
        .minute(Number(minute))
        .format('YYYY-MM-DD HH:mm:ss.SSS');

      await api.patch(`appointments/update/${id}/newvisit`, {
        doctor_id: String(doctorId),
        date_start: date,
        status,
        ...(opinion?.id && { opinion_id: opinion.id }),
      });

      resetForm();
      onSuccess();

      snackbarStore.setContent({
        severity: 'success',
        message: 'Изменения сохранены',
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
    <Formik
      innerRef={formikRef}
      initialValues={useMemo(() => {
        const [hour, minute] = time.split(':');
        const appointmentDate = dayjs(date)
          .set('hour', Number(hour))
          .set('minute', Number(minute));

        const isAfter = appointmentDate.isAfter(dayjs(), 'minute');

        return {
          appointmentDate: isAfter ? appointmentDate : null,
          appointmentTime: null,
        };
      }, [date, time])}
      enableReinitialize
      validate={(values) => {
        const validationSchema = editAppointmentSchema;

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
        values: { appointmentDate, appointmentTime },
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
          <Typography>Доктор: {doctor}</Typography>
          <Typography sx={{ textTransform: 'capitalize' }}>
            Специальность: {speciality}
          </Typography>
          <DatePicker
            label="Выберите день записи"
            value={appointmentDate}
            disabled={
              state.status === Status.Loading || state.status === Status.Error
            }
            disablePast
            maxDate={dayjs().add(3, 'month')}
            onChange={(value) => {
              setFieldValue('appointmentTime', null);
              setFieldValue('appointmentDate', value);
            }}
            onClose={() => {
              setFieldTouched('appointmentDate', true, false);
            }}
            onAccept={(value) => {
              if (value !== null && dayjs(value).isValid()) {
                dateRef.current = value;

                fetchDoctorAppointments(value.format('YYYY-MM-DD'));
              }
            }}
            shouldDisableDate={(date: unknown): boolean => {
              if (dayjs.isDayjs(date)) {
                return state.absences.some(
                  (el) => el.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
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
                    appointmentDate !== null &&
                    dayjs(appointmentDate).isValid() &&
                    dateRef.current !== appointmentDate
                  ) {
                    dateRef.current = appointmentDate;
                    setFieldValue('appointmentTime', null);

                    fetchDoctorAppointments(
                      appointmentDate.format('YYYY-MM-DD')
                    );
                  }
                },
              },
            }}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: ({ palette }) => palette.common.white,
                borderRadius: '10px',
              },

              '& fieldset': {
                borderColor: ({ palette }) => palette.primary.main,
                borderWidth: '2px',
                borderRadius: '10px',
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
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              borderRadius: '10px',
              width: '100%',
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: 'normal',
            }}
            disabled={!(isValid && dirty) || isSubmitting}
          >
            Сохранить
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditAppointmentForm;
