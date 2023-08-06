import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  styled,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import TextField from '../../components/WhiteTextField';
import signupSchema from './schemas/signupSchema';

const Form = styled('form')({
  width: '332px',
  background: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  rowGap: '22px',
});

const SignupForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      privacyAgreement: false,
    },
    validationSchema: signupSchema,
    onSubmit: async ({ email, password }, { resetForm }) => {
      const formData = new FormData();

      formData.append('email', email);
      formData.append('password', password);

      // Следующие поля добавлены временно
      formData.append('firstname', 'Ivan');
      formData.append('lastame', 'Ivanov');
      formData.append('gender', 'male');
      formData.append('birthdate', '1691335349443');
      formData.append('address', 'World');
      formData.append('mobile', '+71234567890');

      const response = await fetch(`http://localhost:3000/api/user`, {
        method: 'POST',
        body: formData,
      });

      // if (!response.ok) {
      //
      // }

      // resetForm();
      // navigate('/');
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Form id="signupForm" method="post" onSubmit={formik.handleSubmit}>
      <Typography
        variant="h5"
        color="common.white"
        sx={{ textTransform: 'uppercase' }}
      >
        регистрация
      </Typography>
      <TextField
        id="email"
        name="email"
        label="email"
        variant="standard"
        type="email"
        fullWidth
        required
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        id="password"
        name="password"
        label="Пароль"
        variant="standard"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff sx={{ color: 'common.white' }} />
                ) : (
                  <Visibility sx={{ color: 'common.white' }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <TextField
        id="confirmPassword"
        name="confirmPassword"
        label="Повторите пароль"
        variant="standard"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff sx={{ color: 'common.white' }} />
                ) : (
                  <Visibility sx={{ color: 'common.white' }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
      />
      <FormControlLabel
        control={
          <Checkbox
            id="privacyAgreement"
            name="privacyAgreement"
            value={formik.values.privacyAgreement}
            onChange={formik.handleChange}
            sx={{
              color: ({ palette }) => palette.common.white,
              '& .MuiSvgIcon-root': { fontSize: 24 },
              '&.Mui-checked': {
                color: ({ palette }) => palette.common.white,
              },
            }}
          />
        }
        label={
          <Typography
            variant="body1"
            sx={{
              color: ({ palette }) => palette.common.white,
            }}
          >
            Я согласен на обработку персональных данных
          </Typography>
        }
      />
      <Button
        color="primary"
        variant="contained"
        sx={{
          borderRadius: '10px',
          width: '100%',
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: 'normal',
          textTransform: 'none',
        }}
        type="submit"
        form="signupForm"
        disabled={!formik.values.privacyAgreement}
      >
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default SignupForm;
