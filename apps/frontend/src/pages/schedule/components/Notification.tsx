/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any }) => ({
  root: {
    top: theme.spacing(9),
  },
}));

export default function Notification(props: { notify: any; setNotify: any }) {
  const { notify, setNotify } = props;
  const classes = useStyles();

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
    >
      <Alert severity={notify.type}>{notify.message}</Alert>
    </Snackbar>
  );
}
