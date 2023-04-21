import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  containerImage: {
    backgroundImage: `url(/images/manvanLogo.png)`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
    minHeight: '100vh',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      backgroundImage: `url(/images/tablet_man_van.png)`,
      backgroundSize: `cover`,
      minHeight: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
    },
  },
}));

export default function RightHomeSection() {
  const classes = useStyles();
  return <Grid item md={4} lg={6} className={classes.containerImage}></Grid>;
}
