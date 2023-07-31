import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker as MuiDatetimePicker } from '@mui/x-date-pickers';

interface Props {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

const DateTimePicker: React.FC<Props> = ({ value, onChange }) => (
  <MuiDatetimePicker
    disablePast
    minTime={dayjs().add(1, 'h').minute(0) }
    maxTime={dayjs().hour(20)}
    label="Время записи"
    value={value}
    onChange={onChange}
    minutesStep={60}
    slotProps={{
      textField: {
        required: true,
        helperText: 'Запись осуществляется на  в период с 8:00 до 20:00',
        sx: {
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
        },
      },
    }}
  />
);

export default DateTimePicker;
