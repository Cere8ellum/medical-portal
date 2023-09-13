import * as Yup from 'yup';

export default Yup.object({
  firstName: Yup.string()
    .required('Имя пациента обязательно')
    .matches(/^\p{L}*$/u, 'Допускается ввод только букв'),
  lastName: Yup.string()
    .required('Фамилия пациента обязательна')
    .matches(/^\p{L}*$/u, 'Допускается ввод только букв'),
  dateOfBirth: Yup.date().required('Выбор даты приема обязателен'),
});
