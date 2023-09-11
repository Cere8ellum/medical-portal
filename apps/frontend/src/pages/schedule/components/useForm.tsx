/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';

export function useForm(
  initialFValues: {
    id: number;
    departmentId: string;
    startDate: Date;
    hireDate: Date;
    isPermanent: boolean;
  },
  validateOnChange = false,
  validate: {
    (fieldValues?: any): boolean | undefined;
    (arg0: { [x: number]: any }): void;
  }
) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any }) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props: { [x: string]: any; children: any }) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
