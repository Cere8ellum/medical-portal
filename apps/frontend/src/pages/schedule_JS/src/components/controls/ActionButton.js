import React from 'react'
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
}))

export default function ActionButton(props) {

    const { color, children, onClick } = props;
    const classes = useStyles();

    return (
        <button
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}>
            {children}
        </button>
    )
}