import React from 'react';
import QuestionnaireTile, { QuestionnaireTileProps } from './QuestionnaireTile';
import { Story } from '@storybook/react';
import { Page } from '@alcumus/components';
import { makeStyles } from '@material-ui/core';

export default {
  component: QuestionnaireTile,
  title: 'Components/QuestionnaireTile',
};

const useStyles = makeStyles({
  page: {
    background: 'white',
  },
});

const Template: Story<QuestionnaireTileProps> = (args) => {
  const classes = useStyles();

  return (
    <Page className={classes.page}>
      <QuestionnaireTile {...args} />
    </Page>
  );
};

export const Standard = Template.bind({});
Standard.args = {
  title: 'Safety Director',
};

export const WithIllustration = Template.bind({});
WithIllustration.args = {
  title: 'Construction',
  illustration: '/images/illustrations/construction.svg',
};
