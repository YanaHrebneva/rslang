import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#e76f51',
    },
    secondary: {
      main: '#219ebc',
    },
  },
  typography: {
    error: {
      color: '#d90429',
    },
    fontFamily: [
      'Gilroy',
    ].join(','),
  },
});
