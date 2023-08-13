import { Box, Container, Typography } from '@mui/material';
import { Logo } from '../../components';
import LoginForm from './LoginForm';

const LoginScreen = () => (
  <Box sx={{ backgroundColor: '#d9d9d9', height: '100vh' }}>
    <Container
      disableGutters
      sx={{
        position: 'relative',
        maxWidth: '1345px !important',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '954px', height: '610px', display: 'flex' }}>
        <Box
          sx={{
            width: '425px',
            height: '610px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '90px',
            padding: '49px 0 0 0',
            backgroundColor: ({ palette }) => palette.common.white,
          }}
        >
          <Logo />
          <Box
            sx={{
              width: '345px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              rowGap: '18px',
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              color="primary.light"
              sx={{ textTransform: 'uppercase', textAlign: 'center' }}
            >
              электронная регистратура
            </Typography>
            <Typography
              variant="body1"
              color="primary"
              sx={{ textAlign: 'center' }}
            >
              Сервис позволяет записаться на приём к врачу в поликлинику,
              перенести и отменить запись к врачу, просматривать направления,
              записаться на приём по направлению, просматривать рецепты.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: '528px',
            height: '610px',
            padding: '88px 0 0 72px',
            boxSizing: 'border-box',
            backgroundColor: ({ palette }) => palette.primary.light,
          }}
        >
          <LoginForm />
        </Box>
      </Box>
    </Container>
  </Box>
);

export default LoginScreen;
