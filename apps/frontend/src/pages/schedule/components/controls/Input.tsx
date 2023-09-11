import React from 'react';
import { TextField } from '@mui/material';

export default function Input(props: {
  [x: string]: any;
  name: any;
  label: any;
  value: any;
  error?: null | undefined;
  onChange: any;
}) {
  const { name, label, value, error = null, onChange, ...other } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
    />
  );
}
