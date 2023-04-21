import React from 'react';
import { render } from '@testing-library/react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Typography from '@material-ui/core/Typography';
import AlcumusTheme from './theme';

describe('theme', () => {
  test('it provides Alcumus theme correctly', () => {
    const { container } = render(
      <ThemeProvider theme={AlcumusTheme}>
        <Typography variant="h1">Hello World</Typography>
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
