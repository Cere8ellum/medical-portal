import { ThemeProvider, createTheme } from '@mui/material/styles';

const themeChangePass = createTheme({
  components: {
    // Name of the component
    MuiTextField: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: '#8095BD',
          width: '332px',
          border: 'none',
          //border: '3px solid #8095BD',
          borderRadius: '10px',
          marginBottom: '18px'
        },
      },
    },
  },
});
export default themeChangePass;
