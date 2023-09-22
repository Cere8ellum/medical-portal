/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { isAxiosError } from 'axios';
import { AppointmentStatus } from 'apps/frontend/src/utils/constants/appointment';
import api from 'apps/frontend/src/infrastructure/api';
import { snackbarStore } from 'apps/frontend/src/stores';
import { ConfirmationDialog, Snackbar } from 'apps/frontend/src/components';
import CreateAppointmentForm from './CreateAppointmentForm';
import FormWrapper from '../FormWrapper';
import PatientInfo from './PatientInfo';
import PatientSearchForm, { User } from './PatientSearchForm';
import HeaderTableCell from './HeaderTableCell';
import EditAppointmentForm from './EditAppointmentForm';

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

const AppointmentTab: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentAppointment, setCurrentAppointment] =
    useState<Appointment | null>(null);

  const fetchAppointments = useCallback(async () => {
    if (!user) return;

    const { data }: { data: Appointment[] } = await api.get(
      `appointments/patient/${user.id}`
    );

    const actualAppointments = data.filter(
      (appointment) => appointment.status === AppointmentStatus.Waiting
    );

    setAppointments(actualAppointments);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user, fetchAppointments]);

  if (!user) {
    return (
      <>
        <PatientSearchForm onSubmit={(user) => setUser(user)} />
        <Snackbar />
      </>
    );
  }

  const handleCloseCreate = () => {
    setCreateOpen(false);
  };

  const handleOpenEdit = (id: number) => {
    const currentAppointment = appointments.find(
      (appointment) => appointment.id === id
    );

    if (currentAppointment) {
      setCurrentAppointment(currentAppointment);
      setEditOpen(true);
    }
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
  };

  const handleOpenDelete = (id: number) => {
    const currentAppointment = appointments.find(
      (appointment) => appointment.id === id
    );

    if (currentAppointment) {
      setCurrentAppointment(currentAppointment);
      setDeleteOpen(true);
    }
  };

  const handleAppointmentDelete = async () => {
    if (!currentAppointment) return;

    try {
      await api.patch(`appointments/update/${currentAppointment.id}`, {
        status: 'Cancelled',
      });
      setDeleteOpen(false);
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

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '40px',
      }}
    >
      <PatientInfo user={user} hide={() => setUser(null)} />
      <Button
        type="button"
        color="primary"
        variant="contained"
        sx={{ width: '350px', height: '50px' }}
        onClick={() => setCreateOpen(true)}
      >
        Создать новую запись на прием
      </Button>
      <Modal
        open={createOpen}
        onClose={handleCloseCreate}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(255, 255, 255, 0.80)',
              backdropFilter: 'blur(3px)',
            },
          },
        }}
      >
        <FormWrapper>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5">Создание новой записи</Typography>
            <IconButton onClick={handleCloseCreate}>
              <CloseIcon
                sx={{
                  width: '20px',
                  height: '20px',
                }}
              />
            </IconButton>
          </Box>
          <CreateAppointmentForm
            userId={user.id}
            isEdit={false}
            onSuccess={() => {
              handleCloseCreate();
              fetchAppointments();
            }}
          />
        </FormWrapper>
      </Modal>
      <Modal
        open={editOpen}
        onClose={handleCloseEdit}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(255, 255, 255, 0.80)',
              backdropFilter: 'blur(3px)',
            },
          },
        }}
      >
        <FormWrapper>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5">Редактирование записи</Typography>
            <IconButton onClick={handleCloseEdit}>
              <CloseIcon
                sx={{
                  width: '20px',
                  height: '20px',
                }}
              />
            </IconButton>
          </Box>
          {currentAppointment ? (
            <EditAppointmentForm
              appointment={currentAppointment}
              onSuccess={() => {
                handleCloseEdit();
                fetchAppointments();
              }}
            />
          ) : null}
        </FormWrapper>
      </Modal>
      <ConfirmationDialog
        message="Вы действительно хотите отменить запись?"
        open={deleteOpen}
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
