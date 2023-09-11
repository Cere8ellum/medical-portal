import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

//окно добавления

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any }) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: '0px',
  },
}));

export default function Popup(props: {
  title: any;
  children: any;
  openPopup: any;
  setOpenPopup: any;
}) {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h4" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <button
            onClick={() => {
              setOpenPopup(false);
            }}
          >
          </button>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
