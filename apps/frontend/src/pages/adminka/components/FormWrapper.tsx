import { Box, styled } from '@mui/material';

export default styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '26px',
  backgroundColor: theme.palette.common.white,
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '10px',
}));
