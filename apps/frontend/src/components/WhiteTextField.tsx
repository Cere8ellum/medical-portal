import { styled, TextField } from '@mui/material';

const WhiteTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.common.white,
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: 'normal',

    '&.Mui-focused': {
      color: theme.palette.common.white,
    }
  },

  '& .MuiInputBase-root': {
    color: theme.palette.common.white,
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: 'normal',

    '&:before': {
      borderBottom: `3px solid ${theme.palette.common.white}`,
    },

    '&:after': {
      borderBottom: `3px solid ${theme.palette.common.white}`,
    },
  },

  '& .MuiInput-underline:hover:before': {
    borderBottom: `3px solid ${theme.palette.common.white} !important`,
  },
}));

export default WhiteTextField;
