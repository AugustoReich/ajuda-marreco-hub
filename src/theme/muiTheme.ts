import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1a365d',
      light: '#2c5282',
      dark: '#0d1b2a',
    },
    secondary: {
      main: '#4a5568',
      light: '#718096',
      dark: '#2d3748',
    },
    background: {
      default: '#0d1b2a',
      paper: '#1a2332',
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#a0aec0',
    },
    success: {
      main: '#48bb78',
    },
    warning: {
      main: '#ed8936',
    },
    error: {
      main: '#fc8181',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});
