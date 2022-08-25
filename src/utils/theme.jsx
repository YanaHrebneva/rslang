import { createTheme } from '@mui/material/styles';
import App from '../App.scss';

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: App.primary,
    },
    secondary: {
      main: App.secondary,
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
