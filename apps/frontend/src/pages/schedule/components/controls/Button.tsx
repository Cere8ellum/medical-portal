import React from 'react';
import { Button as MuiButton, makeStyles } from '@mui/material';

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any; }) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: 'none',
  },
}));

export default function Button() {
  const classes = useStyles();
}
