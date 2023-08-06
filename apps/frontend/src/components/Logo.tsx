import { Box, Typography } from '@mui/material';

const Logo = () => {
  return (
    <Box sx={{ display: 'flex', columnGap: '5px' }}>
      <Typography variant="h2" color="primary.light">
        Medical
      </Typography>
      <Typography
        variant="h2"
        component="span"
        color="common.white"
        sx={{
          backgroundColor: ({ palette }) => palette.primary.light,
          borderRadius: '9px',
        }}
      >
        online
      </Typography>
    </Box>
  );
};

export default Logo;
