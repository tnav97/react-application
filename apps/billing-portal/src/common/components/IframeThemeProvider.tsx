import React, { ReactChild, ReactFragment, ReactPortal } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createTheme, Theme } from '@material-ui/core';
import { AlcumusTheme } from '@alcumus/components';

interface IframeThemeProviderProps {
  children: boolean | ReactChild | ReactFragment | ReactPortal;
}

export default function IframeThemeProvider({
  children,
}: IframeThemeProviderProps): JSX.Element {
  const themeWithTransparentBg: Theme = createTheme(AlcumusTheme, {
    palette: { background: { default: 'transparent' } },
  });

  return (
    <ThemeProvider theme={themeWithTransparentBg}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
