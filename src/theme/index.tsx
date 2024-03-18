'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const MuiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default MuiProvider;
