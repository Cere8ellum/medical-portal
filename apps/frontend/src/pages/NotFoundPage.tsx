import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <Box
    sx={{
      marginTop: '50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      rowGap: '15px',
    }}
  >
    <Typography variant="h5" color="primary">
      Такой страницы не существует!
    </Typography>
    <Link to="/">Вернуться на главную страницу</Link>
  </Box>
);

export default NotFoundPage;
