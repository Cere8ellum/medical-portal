import { useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FormControlLabel,
  styled,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { isAxiosError } from 'axios';
import api from '../../infrastructure/api';
import PasswordField from '../../components/PasswordField';
import WhiteTextField from '../../components/WhiteTextField';
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
      try {
        const {
          request: { statusText },
        } = await api.post(`http://localhost:3000/api/user/register`, {
          email,
          password,
        });

        alert(statusText);
        resetForm();
        navigate('/login');
      } catch (err) {
        if (
          isAxiosError(err) &&
          err.response !== null &&
          err.response !== undefined
        ) {
          alert(err.response.data.message);
        } else {
          console.error(err);
        }
      }
    },
  });

  return (
    <Form id="signupForm" method="post" onSubmit={formik.handleSubmit}>
      <Typography
        variant="h5"
        color="common.white"
        sx={{ textTransform: 'uppercase' }}
      >
        регистрация
      </Typography>
      <WhiteTextField
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
      <PasswordField
        TextField={WhiteTextField}
        id="password"
        name="password"
        label="Пароль"
        variant="standard"
        fullWidth
        required
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <PasswordField
        TextField={WhiteTextField}
        id="confirmPassword"
        name="confirmPassword"
        label="Повторите пароль"
        variant="standard"
        fullWidth
        required
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
