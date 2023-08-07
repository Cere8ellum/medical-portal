import * as yup from 'yup';

export default yup.object({
  email: yup
    .string()
    .email('Введите корректный адрес электронной почты')
    .required('Электронная почта обязательна'),
  password: yup
    .string()
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .required('Пароль обязателен'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Пожалуйста, повторно введите свой пароль'),
  privacyAgreement: yup.boolean().required(),
});
