import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { PasswordField, Snackbar } from '../../components';
import api from '../../infrastructure/api';
import { snackbarStore } from '../../stores';
import themeChangePass from './theme';
import FormWrapper from '../adminka/components/FormWrapper';
import { useGlobalContext } from '../profile/MyGlobalContext';

const ChangePassword = () => {
  const initialState = {
    email: '',
    oldpass: '',
    newpass: '',
    confpass: '',
  };

  const initialCorrectState = {
    email: true,
    oldpass: true,
    newpass: true,
    confpass: true,
  };

  const [formData, setFormData] = useState(initialState);
  const { setIsChangePass } = useGlobalContext();
  const [isCorrectInput, setIsCorrectInput] = useState(initialCorrectState);
  const [isError, setIsError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const change = async () => {
    if (isFormValid()) {
      try {
        await api({
          method: 'patch',
          url: '/user/change/password',
          params: {
            email: formData.email,
            newpass: formData.newpass,
            oldpass: formData.oldpass,
          },
        }).then(({ data, status }) => {
          snackbarStore.setContent({
            severity: 'success',
            message: `${data}`,
          });
          snackbarStore.handleOpen();
          setIsChangePass(false);
        });
      } catch (error: any) {
        let report = '';
        switch (error.toString().slice(-3)) {
          case '404':
            report = 'Пользователь с таким email не обнаружен';
            setIsCorrectInput({ ...isCorrectInput, ['email']: false });
            break;
          case '400':
            report = 'Указанный старый пароль неверен';
            setIsCorrectInput({ ...isCorrectInput, ['oldpass']: false });
            break;
        }
        snackbarStore.setContent({
          severity: 'error',
          message: `${report}`,
        });
        snackbarStore.handleOpen();
      }
    }
  };

  const isFormEmpty = () => {
    let isEmpty = false;
    Object.values(formData).forEach((val) => {
      if (val === '') {
        isEmpty = true;
      }
    });
    return isEmpty;
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPass = (password: string): boolean => {
    return password.length >= 8;
  };

  const isNewPassEqual = () => {
    return formData.newpass === formData.confpass;
  };

  const isFormValid = () => {
    setIsError(false);

    if (isFormEmpty()) {
      snackbarStore.setContent({
        severity: 'warning',
        message: 'Все поля со * должны быть корректно заполнены',
      });
      snackbarStore.handleOpen();
      setIsError(true);
      return false;
    }

    if (!isValidEmail(formData.email)) {
      snackbarStore.setContent({
        severity: 'warning',
        message: 'Введите корректный адрес электронной почты',
      });
      snackbarStore.handleOpen();
      setIsError(true);
      setIsCorrectInput({ ...isCorrectInput, ['email']: false });
      return false;
    } else {
      setIsCorrectInput({ ...isCorrectInput, ['email']: true });
    }

    if (!isNewPassEqual()) {
      snackbarStore.setContent({
        severity: 'warning',
        message: 'Пароли не совпадают',
      });
      snackbarStore.handleOpen();
      setIsError(true);
      setIsCorrectInput({ ...isCorrectInput, ['confpass']: false });
      return false;
    } else {
      setIsCorrectInput({ ...isCorrectInput, ['confpass']: true });
    }

    if (!isValidPass(formData.newpass)) {
      snackbarStore.setContent({
        severity: 'warning',
        message: 'Пароль должен содержать не менее 8 символов',
      });
      snackbarStore.handleOpen();
      setIsCorrectInput({ ...isCorrectInput, ['newpass']: false });
      return false;
    } else {
      setIsCorrectInput({ ...isCorrectInput, ['newpass']: true });
    }
    return true;
  };

  const handleChange = async (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let { name, value } = event.target;
    switch (name) {
      case 'email':
        if (!isValidEmail(value)) {
          setIsCorrectInput({ ...isCorrectInput, [name]: false });
        } else {
          setIsCorrectInput({ ...isCorrectInput, [name]: true });
        }
        break;
      case 'oldpass':
        if (!isValidPass(value)) {
          setIsCorrectInput({ ...isCorrectInput, [name]: false });
        } else {
          setIsCorrectInput({ ...isCorrectInput, [name]: true });
        }
        break;
      case 'newpass':
        if (!isValidPass(value)) {
          setIsCorrectInput({ ...isCorrectInput, [name]: false });
        } else {
          setIsCorrectInput({ ...isCorrectInput, [name]: true });
        }
        break;
      case 'confpass':
        if (!isValidPass(value)) {
          setIsCorrectInput({ ...isCorrectInput, [name]: false });
        } else {
          setIsCorrectInput({ ...isCorrectInput, [name]: true });
        }
        break;
    }
    setFormData({ ...formData, [name]: value });
  };

  return (
    <ThemeProvider theme={themeChangePass}>
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
            id="email"
            label="*email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!isCorrectInput.email}
            helperText={
              !isValidEmail(formData.email) && formData.email !== ''
                ? 'Введите корректный адрес электронной почты'
                : ''
            }
          />
          <TextField
            id="old-password"
            type="password"
            label="*старый пароль"
            variant="outlined"
            name="oldpass"
            value={formData.oldpass}
            onChange={handleChange}
            error={!isCorrectInput.oldpass}
            helperText={
              !isValidPass(formData.oldpass) && formData.oldpass !== ''
                ? 'Пароль должен содержать не менее 8 символов'
                : ''
            }
          />
          <TextField
            id="new-password"
            type="password"
            label="*новый пароль"
            variant="outlined"
            name="newpass"
            value={formData.newpass}
            onChange={handleChange}
            error={!isCorrectInput.newpass}
            helperText={
              !isValidPass(formData.newpass) && formData.newpass !== ''
                ? 'Пароль должен содержать не менее 8 символов'
                : ''
            }
          />
          <TextField
            id="confirm-password"
            type="password"
            label="*подтверждение пароля"
            variant="outlined"
            name="confpass"
            value={formData.confpass}
            onChange={handleChange}
            error={!isCorrectInput.confpass}
            helperText={
              !isValidPass(formData.confpass) && formData.confpass !== ''
                ? 'Пароль должен содержать не менее 8 символов'
                : ''
            }
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
      <Snackbar />
    </ThemeProvider>
  );
};

export default ChangePassword;
