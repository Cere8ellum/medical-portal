/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

//подтверждеение удаления

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any }) => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: 'center',
  },
  dialogContent: {
    textAlign: 'center',
  },
  dialogAction: {
    justifyContent: 'center',
  },
}));

export default function ConfirmDialog(props: {
  confirmDialog: any;
  setConfirmDialog: any;
}) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}></DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography>{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <button
          className="button-save"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          НЕТ
        </button>
        <button className="button-save" onClick={confirmDialog.onConfirm}>
          ДА
        </button>
      </DialogActions>
    </Dialog>
  );
}
