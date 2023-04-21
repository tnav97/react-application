import React from 'react';
import { Done } from '@material-ui/icons';
import { makeStyles, Box } from '@material-ui/core';
import { StyleVariables, Text } from '@alcumus/components';

const useStyles = makeStyles({
  done: {
    color: StyleVariables.colors.text.success,
    marginRight: '0.688rem',
  },
  featureText: {
    fontSize: StyleVariables.fonts.size.regular,
    color: StyleVariables.colors.text.default,
  },
});
export interface FeaturesListItemProps {
  featureText: string;
  className?: string;
}
export default function FeatureListItem({
  featureText,
  className,
}: FeaturesListItemProps) {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="row" className={className}>
      <Done className={classes.done} />
      <Text className={classes.featureText}>{featureText}</Text>
    </Box>
  );
}
