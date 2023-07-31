import React from 'react';
import { Dayjs } from 'dayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';

interface Props {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

const DatePicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <MuiDatePicker
      disableFuture
      label="Дата рождения"
      value={value}
      onChange={onChange}
      slotProps={{
        textField: {
          required: true,
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

            '& .MuiSvgIcon-root ': {
              fill: ({ palette }) => palette.primary.main,
            },
          },
        },
      }}
    />
  );
};

export default DatePicker;
