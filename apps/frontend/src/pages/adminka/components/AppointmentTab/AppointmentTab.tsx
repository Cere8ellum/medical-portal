/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useEffect, useReducer } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { isAxiosError } from 'axios';
import { AppointmentStatus } from 'apps/frontend/src/utils/constants/appointment';
import api from 'apps/frontend/src/infrastructure/api';
import { snackbarStore } from 'apps/frontend/src/stores';
import { ConfirmationDialog, Snackbar } from 'apps/frontend/src/components';
import CreateAppointmentForm from '../../../appointment/components/CreateAppointmentForm';
import PatientInfo from './PatientInfo';
import PatientSearchForm from './PatientSearchForm';
import HeaderTableCell from './HeaderTableCell';
import EditAppointmentForm from './EditAppointmentForm';
import AppointmentModal from './Modal';
import {
  appointmentTabReducer,
  Field,
  FormState,
} from '../../reducers/appointmentTabReducer';

interface Opinion {
  id: number;
  disease_conclusion: string;
  patient_complaint: string;
  time_start: string;
  treatment_plan: string;
}

export interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
  doctorId: number;
  patient: string;
  speciality: string;
  status: AppointmentStatus;
  opinion: Opinion;
}

const initialState: FormState = {
  user: null,
  appointments: [],
  currentAppointment: null,
  createOpen: false,
  editOpen: false,
  deleteOpen: false,
};

const AppointmentTab: React.FC = () => {
  const [
    {
      user,
      appointments,
      currentAppointment,
      createOpen,
      editOpen,
      deleteOpen,
    },
    dispatch,
  ] = useReducer(appointmentTabReducer, initialState);

  const fetchAppointments = useCallback(async () => {
    if (!user) return;

    const { data }: { data: Appointment[] } = await api.get(
      `appointments/patient/${user.id}`
    );

    const actualAppointments = data.filter(
      (appointment) => appointment.status === AppointmentStatus.Waiting
    );

    dispatch({
      type: 'set_data',
      field: Field.Appointments,
      payload: actualAppointments,
    });
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user, fetchAppointments]);

  const handleOpenCreate = () => {
    dispatch({
      type: 'open_modal',
      field: Field.Create,
    });
  };

  const handleCloseCreate = () => {
    dispatch({
      type: 'close_modal',
      field: Field.Create,
    });
  };

  const handleOpenEdit = useCallback(
    (id: number) => {
      const currentAppointment = appointments.find(
        (appointment) => appointment.id === id
      );

      if (currentAppointment) {
        dispatch({
          type: 'set_data',
          field: Field.CurrentAppointment,
          payload: currentAppointment,
        });
        dispatch({
          type: 'open_modal',
          field: Field.Edit,
        });
      }
    },
    [appointments]
  );

  const handleCloseEdit = () => {
    dispatch({
      type: 'close_modal',
      field: Field.Edit,
    });
  };

  const handleOpenDelete = useCallback(
    (id: number) => {
      const currentAppointment = appointments.find(
        (appointment) => appointment.id === id
      );

      if (currentAppointment) {
        dispatch({
          type: 'set_data',
          field: Field.CurrentAppointment,
          payload: currentAppointment,
        });
        dispatch({
          type: 'open_modal',
          field: Field.Delete,
        });
      }
    },
    [appointments]
  );

  const handleCloseDelete = () => {
    dispatch({
      type: 'close_modal',
      field: Field.Delete,
    });
  };

  const handleAppointmentDelete = async () => {
    if (!currentAppointment) return;

    try {
      await api.patch(`appointments/update/${currentAppointment.id}`, {
        status: 'Cancelled',
      });
      handleCloseDelete();
      snackbarStore.setContent({
        severity: 'success',
        message: 'Запись успешно отменена',
      });
      snackbarStore.handleOpen();
      fetchAppointments();
    } catch (error) {
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

  if (!user) {
    return (
      <>
        <PatientSearchForm
          onSubmit={(user) =>
            dispatch({
              type: 'set_data',
              field: Field.User,
              payload: user,
            })
          }
        />
        <Snackbar />
      </>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '40px',
      }}
    >
      <PatientInfo
        user={user}
        hide={() =>
          dispatch({
            type: 'set_data',
            field: Field.User,
            payload: null,
          })
        }
      />
      <Button
        type="button"
        color="primary"
        variant="contained"
        sx={{ width: '350px', height: '50px' }}
        onClick={handleOpenCreate}
      >
        Создать новую запись на прием
      </Button>
      <AppointmentModal
        open={createOpen}
        title="Создание новой записи"
        onClose={handleCloseCreate}
      >
        <CreateAppointmentForm
          userId={user.id}
          onSuccess={() => {
            handleCloseCreate();
            fetchAppointments();
          }}
        />
      </AppointmentModal>
      <AppointmentModal
        open={editOpen}
        title="Редактирование записи"
        onClose={handleCloseEdit}
      >
        <EditAppointmentForm
          appointment={currentAppointment!}
          onSuccess={() => {
            handleCloseEdit();
            fetchAppointments();
          }}
        />
      </AppointmentModal>
      <ConfirmationDialog
        open={deleteOpen}
        message="Вы действительно хотите отменить запись?"
        onConfirm={handleAppointmentDelete}
        onClose={handleCloseDelete}
      />
      <Typography
        variant="h5"
        align="left"
        sx={{ width: '100%', marginTop: '20px' }}
      >
        Список предстоящих приемов
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderTableCell>Дата</HeaderTableCell>
            <HeaderTableCell>Доктор</HeaderTableCell>
            <HeaderTableCell>Специальность</HeaderTableCell>
            <HeaderTableCell align="center">Действия</HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                {dayjs(appointment.date).format('DD.MM.YYYY, HH:mm')}
              </TableCell>
              <TableCell>{appointment.doctor}</TableCell>
              <TableCell>{appointment.speciality}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', columnGap: '15px' }}>
                  <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    sx={{ height: '40px' }}
                    onClick={() => handleOpenEdit(appointment.id)}
                  >
                    Изменить
                  </Button>
                  <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    sx={{ height: '40px' }}
                    onClick={() => handleOpenDelete(appointment.id)}
                  >
                    Отменить
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar />
    </Box>
  );
};

export default AppointmentTab;
