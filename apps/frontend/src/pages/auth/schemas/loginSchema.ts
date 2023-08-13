import * as Yup from 'yup';

export default Yup.object({
  email: Yup.string()
    .email('Введите корректный адрес электронной почты')
    .required('Электронная почта обязательна'),
  password: Yup.string()
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .required('Пароль обязателен'),
});
