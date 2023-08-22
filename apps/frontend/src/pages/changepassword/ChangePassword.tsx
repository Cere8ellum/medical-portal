import { Box, Button, Container, TextField, Typography } from '@mui/material';

const ChangePassword = () => {
  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box sx={{ marginBottom: '20px' }}>
        <img src="../../assets/images/logo.png" alt="" />
      </Box>
      <Typography
        sx={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}
      >
        ИЗМЕНИТЬ ПАРОЛЬ
      </Typography>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '50px',
        }}
      >
        <TextField
          sx={{
            border: '3px solid #8095BD',
            borderRadius: '10px',
            width: '332px',
            height: '46px',
            marginBottom: '18px',
          }}
          id="email"
          label="*email"
          variant="outlined"
        />
        <TextField
          sx={{
            border: '3px solid #8095BD',
            borderRadius: '10px',
            width: '332px',
            height: '46px',
            marginBottom: '18px',
          }}
          id="old-password"
          label="*старый пароль"
          variant="outlined"
        />
        <TextField
          sx={{
            border: '3px solid #8095BD',
            borderRadius: '10px',
            width: '332px',
            height: '46px',
            marginBottom: '18px',
          }}
          id="new-password"
          label="*новый пароль"
          variant="outlined"
        />
        <TextField
          sx={{
            border: '3px solid #8095BD',
            borderRadius: '10px',
            width: '332px',
            height: '46px',
            marginBottom: '18px',
          }}
          id="confirm-password"
          label="*подтверждение пароля"
          variant="outlined"
        />
      </Container>
      <Button
        sx={{
          borderRadius: '10px',
          background: '#3D537C',
          color: '#fff',
          padding: '18px 117px 18px 117px',
          fontSize: '16px',
          fontWeight: '600',
        }}
      >
        Сохранить
      </Button>
    </Container>
  );
};

export default ChangePassword;
