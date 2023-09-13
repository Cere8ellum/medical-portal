import { styled, TextField } from '@mui/material';

export default styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.common.white,
    borderRadius: '10px',
  },

  '& fieldset': {
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
    borderRadius: '10px',
  },
}));
