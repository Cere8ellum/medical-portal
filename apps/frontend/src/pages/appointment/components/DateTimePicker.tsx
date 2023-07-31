import React from 'react';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface Props {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

const DateTimePicker: React.FC<Props> = ({ value, onChange }) => (
  <MuiDateTimePicker
    disablePast
    minTime={dayjs('2023-07-30T08:00')}
    maxTime={dayjs('2023-07-30T19:59')}
    renderInput={(params) => (
      <TextField
        {...params}
        required
        inputProps={{
          ...params.inputProps,
          placeholder: 'дд.мм.гггг чч:мм',
        }}
        helperText="Запись только на время в период с 8:00 до 20:00"
        sx={{
          '.MuiInputBase-root': {
            width: '100%',
            height: '67px',
            backgroundColor: ({ palette }) => palette.common.white,
            borderRadius: '10px',
          },

          '& fieldset': {
            borderColor: ({ palette }) => palette.primary.main,
            borderWidth: '2px',
            borderRadius: '10px',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          },

          '.MuiSvgIcon-root ': {
            fill: ({ palette }) => palette.primary.main,
          },
        }}
      />
    )}
    label="Время записи"
    value={value}
    onChange={onChange}
  />
);

export default DateTimePicker;
