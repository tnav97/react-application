import React from 'react';
import { render, screen } from '@testing-library/react';
import FreeTrialExpiredPage from './FreeTrialExpiredPage';
import { ExplicitRounded } from '@material-ui/icons';
describe('FreeTrialExpiredPage tests', () => {
  test('it renders', () => {
    render(<FreeTrialExpiredPage t={(x) => x} tReady={true} />);
    expect(screen.getByTestId('img')).toHaveAttribute(
      'src',
      '/images/expired_trial.svg'
    );
  });
});
