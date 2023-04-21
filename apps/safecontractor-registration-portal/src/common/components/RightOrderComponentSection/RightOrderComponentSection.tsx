import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  containerImage: {
    backgroundImage: `url(/images/manvanLogo.png)`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
    minHeight: '100vh',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.down('lg')]: {
      backgroundSize: 'cover',
    },
  },
}));

export default function RightOrderComponentSection() {
  const classes = useStyles();
  return <Grid item md={6} className={classes.containerImage}></Grid>;
}
