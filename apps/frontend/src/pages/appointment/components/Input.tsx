import { styled, TextField } from '@mui/material';

export default styled(TextField)(({ theme }) => ({
  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  background: theme.palette.common.white,
  borderRadius: '10px',

  '& .MuiInputBase-root': {
    width: '100%',
    height: '67px',
    color: theme.palette.primary.main,
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: 'normal',
  },

  '& fieldset': {
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
    borderRadius: '10px',
  },
}));
