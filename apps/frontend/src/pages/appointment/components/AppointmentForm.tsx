import React, { useState } from 'react';
import { Button, SelectChangeEvent } from '@mui/material';
import Form from './Form';
import SingleSelect from './Select';
import DateTimePicker from './DateTimePicker';
import DatePicker from './DatePicker';
import Input from './Input';
import dayjs, { Dayjs } from 'dayjs';

// Временные опции для наглядности
const doctors = [
  {
    label: 'Егорова Ирина Николаевна',
    value: '1',
  },
  {
    label: 'Семенов Роман Валерьевич',
    value: '2',
  },
  {
    label: 'Зайцева Екатерина Леонидовна',
    value: '3',
  },
];

const appointmentPeriod = {
  from: 8,
  to: 20,
};

const getInitialAppointment = (): Dayjs => {
  const hour = dayjs().hour();

  if (hour < appointmentPeriod.from) {
    return dayjs().hour(appointmentPeriod.from).minute(0);
  }

  if (hour >= appointmentPeriod.to - 1) {
    return dayjs().add(1, 'd').hour(appointmentPeriod.from).minute(0);
  }

  return dayjs().add(1, 'h').minute(0);
};

const AppointmentForm = () => {
  const [doctor, setDoctor] = useState('');
  const [dateOfAppointment, setDateOfAppointment] = useState<Dayjs | null>(
    getInitialAppointment()
  );
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const [name, setName] = useState('');

  const handleSelectChange = (event: SelectChangeEvent): void => {
    setDoctor(event.target.value as string);
  };

  const handleDateOfAppointmentChange = (newValue: Dayjs | null): void => {
    setDateOfAppointment(newValue);
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setName(event.target.value);
  };

  const handleBirthdayChange = (newValue: Dayjs | null): void => {
    setBirthday(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form
      method="post"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '26px',
        width: '342px',
      }}
      onSubmit={handleSubmit}
    >
      <SingleSelect
        options={doctors}
        value={doctor}
        onChange={handleSelectChange}
      />
      <DateTimePicker
        value={dateOfAppointment}
        onChange={handleDateOfAppointmentChange}
      />
      <Input
        label="ФИО"
        color="primary"
        required
        value={name}
        onChange={handleNameChange}
      />
      <DatePicker value={birthday} onChange={handleBirthdayChange} />
      <Button
        color="primary"
        variant="contained"
        sx={{
          borderRadius: '10px',
          width: '100%',
          height: '67px',
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: 'normal',
        }}
        type="submit"
      >
        Записаться на прием
      </Button>
    </Form>
  );
};

export default AppointmentForm;
