import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../infrastructure/api';
import { AppointmentForm } from './components/AppointmentForm';
import { User } from './components/AppointmentForm/AppointmentForm';
import FormWrapper from './components/FormWrapper';
import PatientInfo from './components/PatientInfo';
import PatientSearchForm from './components/PatientSearchForm';
import HeaderTableCell from './HeaderTableCell';

enum Status {
  Waiting = 'Waiting',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
  Started = 'Started',
}

interface Opinion {
  id: number;
  disease_conclusion: string;
  patient_complaint: string;
  time_start: string;
  treatment_plan: string;
}

interface Appointment {
  id: number;
  date: string;
  doctor: string;
  patient: string;
  speciality: string;
  status: Status;
  opinion: Opinion;
}

const AppointmentTab: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchAppointments = useCallback(async () => {
    if (!user) return;

    const { data }: { data: Appointment[] } = await api.get(
      `appointments/patient/${user.id}`
    );

    const actualAppointments = data.filter(
      (appointment) => appointment.status === Status.Waiting
    );

    setAppointments(actualAppointments);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user, fetchAppointments]);

  if (!user) {
    return <PatientSearchForm onSubmit={(user) => setUser(user)} />;
  }

  const handleCloseCreate = () => {
    setCreateOpen(false);
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
          <Typography variant="h5">Создание новой записи</Typography>
          <AppointmentForm
            userId={user.id}
            onSuccess={() => {
              handleCloseCreate();
              fetchAppointments();
            }}
          />
        </FormWrapper>
      </Modal>
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
                    disabled
                  >
                    Изменить
                  </Button>
                  <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    sx={{ height: '40px' }}
                    disabled
                  >
                    Удалить
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AppointmentTab;
