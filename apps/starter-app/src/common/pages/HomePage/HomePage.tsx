import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Page, StyleVariables } from '@alcumus/components';
import Message from '../../components/Message';

const useStyles = makeStyles(() => ({
  title: {
    color: StyleVariables.colors.action.primary.default,
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <Page>
      <Typography variant="h1" className={classes.title}>
        Welcome to Starter App
      </Typography>
      <Message />
    </Page>
  );
}
