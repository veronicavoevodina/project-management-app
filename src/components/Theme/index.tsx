import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#000000',
    },
    primary: {
      light: '#ffffff',
      main: '#e5e5e5',
      dark: '#b3b3b3',
      contrastText: '#000',
    },
    secondary: {
      light: '#425c69',
      main: '#18333e',
      dark: '#000c18',
      contrastText: '#fff',
    },
  },
});

export default theme;
