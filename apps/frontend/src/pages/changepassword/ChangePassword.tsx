import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import api from '../../infrastructure/api';
import FormWrapper from '../adminka/components/FormWrapper';
import { useGlobalContext } from '../profile/MyGlobalContext';

const ChangePassword = () => {
  const initialState = {
    email: '',
    oldpass: '',
    newpass: '',
    confpass: '',
  };

  const [formData, setFormData] = useState(initialState);
  const { setIsChangePass } = useGlobalContext();

  const change = async () => {
    try {
      await api({
        method: 'patch',
        url: '/user/change/password',
        params: {
          email: formData.email,
          newpass: formData.newpass,
          oldpass: formData.oldpass,
        },
      })
        .then(({ data, status }) => {
          if (status === 200) {
            console.log(data);
            setIsChangePass(false);
          }
        })
        .catch((error: Error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    // <Container
    //   sx={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //   }}
    // >
    <FormWrapper>
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
            //height: '46px',
            marginBottom: '18px',
          }}
          id="email"
          label="*email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          sx={{
            border: '3px solid #8095BD',
            borderRadius: '10px',
            width: '332px',
            //height: '46px',
            marginBottom: '18px',
          }}
          id="old-password"
          label="*старый пароль"
          variant="outlined"
          name="oldpass"
          value={formData.oldpass}
          onChange={handleChange}
        />
        <TextField
          sx={{
            border: '3px solid #8095BD',
            borderRadius: '10px',
            width: '332px',
            //height: '46px',
            marginBottom: '18px',
          }}
          id="new-password"
          label="*новый пароль"
          variant="outlined"
          name="newpass"
          value={formData.newpass}
          onChange={handleChange}
        />
        <TextField
          sx={{
            border: '3px solid #8095BD',
            borderRadius: '10px',
            width: '332px',
            //height: '46px',
            marginBottom: '18px',
          }}
          id="confirm-password"
          label="*подтверждение пароля"
          variant="outlined"
          name="confpass"
          value={formData.confpass}
          onChange={handleChange}
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
        onClick={change}
      >
        ИЗМЕНИТЬ
      </Button>
    </FormWrapper>
  );
};

export default ChangePassword;
