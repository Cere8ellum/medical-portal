/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any }) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
}));

export default function ActionButton(props: {
  color: any;
  children: any;
  onClick: any;
}) {
  const { color, children, onClick } = props;
  const classes = useStyles();

  return (
    <Button className={`${classes.root}`} onClick={onClick}>
      {children}
    </Button>
  );
}
