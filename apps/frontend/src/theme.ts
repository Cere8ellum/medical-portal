import { alpha, createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    reversePrimary: Palette['primary'];
  }

  interface PaletteOptions {
    reversePrimary?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    reversePrimary: true;
  }
}

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
      main: '#8095bd',
      contrastText: '#ffffff',
    },
    reversePrimary: {
      main: '#ffffff',
      dark: alpha('#ffffff', 0.8),
      contrastText: '#3d537c',
    },
    error: {
      main: '#b71c1c',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: [`'Inter', sanf-serif`].join(','),
    h2: {
      fontSize: '40px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 'normal',
    },
    h3: {
      textTransform: 'uppercase',
      fontSize: '36px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 'normal',
    },
    h4: {
      fontSize: '32px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 'normal',
    },
    h5: {
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 'normal',
    },
    body1: {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: '300',
      lineHeight: 'normal',
    },
  },
  spacing: 4,
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' && {
            minWidth: '140px',
            height: '58px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: 'normal',
            whiteSpace: 'nowrap',
          }),
        }),
      },
    },
  },
});

export default defaultTheme;
