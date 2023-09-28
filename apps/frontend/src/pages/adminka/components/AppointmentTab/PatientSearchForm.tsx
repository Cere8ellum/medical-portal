/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef } from 'react';
import { Button, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Formik, FormikProps } from 'formik';
import { Dayjs } from 'dayjs';
import { isAxiosError } from 'axios';
import api from 'apps/frontend/src/infrastructure/api';
import { Form } from 'apps/frontend/src/components';
import { snackbarStore } from 'apps/frontend/src/stores';
import patientSearchSchema from '../../schemas/patientSearchSchema';
import TextField from './TextField';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string;
}

interface Props {
  onSubmit: (user: User) => void;
}

interface FormikValues {
  firstName: string;
  lastName: string;
  dateOfBirth: Dayjs | null;
}

const initialValues: FormikValues = {
  firstName: '',
  lastName: '',
  dateOfBirth: null,
};

const PatientSearchForm: React.FC<Props> = ({ onSubmit }) => {
  const formikRef = useRef<FormikProps<FormikValues>>(null);

  const handleSubmit = async ({
    firstName,
    lastName,
    dateOfBirth,
  }: FormikValues) => {
    try {
      const { data: user } = await api.get(
        `user/admin/search?firstname=${firstName}&lastname=${lastName}&bday=${dateOfBirth!.format(
          'DD.MM.YYYY'
        )}`
      );

      onSubmit(user);
    } catch (error) {
      if (isAxiosError(error)) {
        snackbarStore.setContent({
          severity: 'error',
          message: error.response?.data,
        });

        snackbarStore.handleOpen();
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={patientSearchSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({
        values: { firstName, lastName, dateOfBirth },
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        isValid,
        dirty,
      }) => (
        <Form
          method="post"
          sx={{
            width: '342px',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '26px',
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" align="center">
            Введите данные пациента
          </Typography>
          <TextField
            id="firstName"
            name="firstName"
            label="Имя"
            variant="outlined"
            type="text"
            fullWidth
            required
            value={firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Фамилия"
            variant="outlined"
            type="text"
            fullWidth
            required
            value={lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />
          <DatePicker
            label="Выберите дату рождения"
            value={dateOfBirth}
            disableFuture
            onChange={(value) => {
              setFieldValue('dateOfBirth', value);
            }}
            onClose={() => {
              setFieldTouched('dateOfBirth', true, false);
            }}
            slotProps={{
              textField: {
                name: 'dateOfBirth',
                error: touched.dateOfBirth && Boolean(errors.dateOfBirth),
                helperText: touched.dateOfBirth && errors.dateOfBirth,
                onBlur: (e) => handleBlur(e),
              },
            }}
            sx={{
              '& .MuiInputBase-root': {
                width: '100%',
                backgroundColor: ({ palette }) => palette.common.white,
                borderRadius: '10px',
              },

              '& fieldset': {
                borderColor: ({ palette }) => palette.primary.main,
                borderWidth: '2px',
                borderRadius: '10px',
              },

              '& .MuiSvgIcon-root ': {
                fill: ({ palette }) => palette.primary.main,
              },
            }}
          />
          <Button
            color="primary"
            variant="contained"
            sx={{
              borderRadius: '10px',
              width: '100%',
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: 'normal',
            }}
            type="submit"
            disabled={!(isValid && dirty) || isSubmitting}
          >
            Найти пациента
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PatientSearchForm;
