import { Box, Container, styled, Typography } from '@mui/material';
import MainLayout from '../../app/MainLayout';
import AppointmentForm from './components/AppointmentForm';

const BackGroundImg = styled('img')({
  position: 'absolute',
  bottom: 0,
  right: '-190px',
  width: '918px',
  height: '588px',
  opacity: '0.55',
});

const AppointmentScreen = () => {
  return (
    <MainLayout>
      <Container
        disableGutters
        sx={{ position: 'relative', maxWidth: '1345px !important' }}
      >
        <Box
          sx={{
            height: '686px',
            position: 'relative',
            padding: '19px 0 30px 174px',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          <Box
            sx={{
              width: '440px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 2,
              position: 'relative',
            }}
          >
            <Typography
              variant="h4"
              color="primary.main"
              sx={{
                width: '440px',
                marginBottom: '35px',
                textAlign: 'center',
              }}
            >
              электронная регистрация
            </Typography>
            <AppointmentForm />
          </Box>
        </Box>
        <BackGroundImg
          src="../../assets/images/main-image.png"
          alt="doctors"
        />
      </Container>
    </MainLayout>
  );
};

export default AppointmentScreen;
