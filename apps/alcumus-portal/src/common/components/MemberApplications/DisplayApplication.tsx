import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { Text } from '@alcumus/components';

const useStyles = makeStyles({
  alcumusLogo: {
    marginRight: '0.5rem',
  },
});

export const DisplayApplication = ({
  appName,
  className,
}: {
  appName: string;
  className?: string;
}) => {
  const classes = useStyles();
  return (
    <Box display="flex" className={className}>
      <img
        src="/images/alcumus-logo.svg"
        alt="alcumus logo"
        className={classes.alcumusLogo}
      />
      <Text data-testid={appName}>{appName}</Text>
    </Box>
  );
};
