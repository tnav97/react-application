import React from 'react';
import Chip, { ChipProps } from './Chip';
import { Story } from '@storybook/react';
import DeleteIcon from '@material-ui/icons/Delete';
import FaceIcon from '@material-ui/icons/Face';

export default {
  component: Chip,
  title: 'Components/Chip',
};

const Template: Story<ChipProps> = (args) => <Chip {...args}>Chip</Chip>;

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  label: 'Chip',
  deleteIcon: <DeleteIcon />,
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  label: 'Chip',
  icon: <FaceIcon />,
};
