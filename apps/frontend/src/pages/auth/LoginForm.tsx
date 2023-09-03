import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Box, Button, Link, styled, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { authStore } from '../../stores';
import { PasswordField, WhiteTextField } from '../../components';
import loginSchema from './schemas/loginSchema';

const Form = styled('form')({
  width: '332px',
  background: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  rowGap: '22px',
});

interface Values {
  email: string;
  password: string;
}

const initialValues: Values = { email: '', password: '' };

const LoginForm: React.FC = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';

  const handleSubmit = async (
    { email, password }: FormikValues,
    { resetForm, setSubmitting, setFieldError }: FormikHelpers<Values>
  ) => {
    setSubmitting(true);

    try {
      await authStore.login(email, password);
      resetForm();
      navigate(fromPage);
    } catch (err) {
      if (
        isAxiosError(err) &&
        err.response !== null &&
        err.response !== undefined
      ) {
        if (err.response.data.message === 'User not found') {
          setFieldError('email', err.response.data.message);
        }

        if (err.response.data.message === 'Incorrect password') {
          setFieldError('password', err.response.data.message);
        }
      } else {
        console.error(err);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        values: { email, password },
        isValid,
        isSubmitting,
        dirty,
        handleSubmit,
        handleChange,
        handleBlur,
      }) => (
        <Form id="loginForm" method="post" onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            color="common.white"
            sx={{ textTransform: 'uppercase' }}
          >
            авторизация
          </Typography>
          <WhiteTextField
            id="email"
            name="email"
            label="email"
            variant="standard"
            type="email"
            fullWidth
            required
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <PasswordField
            TextField={WhiteTextField}
            id="password"
            name="password"
            label="Пароль"
            variant="standard"
            fullWidth
            required
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Box
            sx={{
              marginTop: '18px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              rowGap: '38px',
            }}
          >
            <Button
              color="reversePrimary"
              variant="contained"
              sx={{
                width: '100%',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                lineHeight: 'normal',
                textTransform: 'none',
              }}
              type="submit"
              form="loginForm"
              disabled={!(isValid && dirty) || isSubmitting}
            >
              Войти
            </Button>
            <Link href="/signup" underline="none">
              <Typography
                variant="h5"
                component="span"
                color="common.white"
                sx={{
                  textTransform: 'uppercase',
                  '&:hover': {
                    color: 'reversePrimary.dark',
                  },
                }}
              >
                регистрация
              </Typography>
            </Link>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default observer(LoginForm);
