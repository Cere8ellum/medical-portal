import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    primary: {
      main: '#3d537c',
      contrastText: '#ffffff',
      light: '#8095bd',
    },
    secondary: {
      main: '#e3ecfc',
      contrastText: '#3d537c',
    }
  },
  typography: {
    fontFamily: [`'Inter', sanf-serif`].join(','),
    h4: {
      textTransform: 'uppercase',
      fontSize: '36px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 'normal',
    }
  },
  spacing: 4,
});

export default defaultTheme;
