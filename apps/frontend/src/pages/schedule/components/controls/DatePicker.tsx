/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@mui/x-date-pickers';

export default function DatePicker(props: {
  name: any;
  label: any;
  value: any;
  onChange: any;
}) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name: any, value: any) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="dd/MMM/yyyy"
        name={name}
        value={value}
        onChange={(date: any) => onChange(convertToDefEventPara(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}
