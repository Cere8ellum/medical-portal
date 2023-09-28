import * as Yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';

dayjs.locale('ru');

export default Yup.object({
  appointmentDate: Yup.date()
    .required('Выбор даты приема обязателен')
    .typeError('Некорректная дата')
    .test({
      name: 'validator-custom-date',
      test: (value, ctx) => {
        const choosedDate = dayjs(value);
        const maxDate = dayjs().add(3, 'month');

        if (choosedDate.isAfter(maxDate)) {
          return ctx.createError({
            message: `Введите дату не позднее, чем ${maxDate.format(
              'D MMMM YYYY'
            )}`,
          });
        }

        const today = dayjs();

        if (choosedDate.isBefore(today.startOf('day'))) {
          return ctx.createError({
            message: 'Нельзя выбрать дату из прошлого',
          });
        }

        const absences: Dayjs[] = ctx.options.context?.absences;

        const booked = absences.some((el) => {
          return el.isSame(choosedDate);
        });

        if (
          booked ||
          (choosedDate.day() === today.startOf('day').day() &&
            today.isAfter(dayjs().hour(19).minute(30)))
        ) {
          return ctx.createError({
            message:
              'Отсутствует возможность записаться сегодня. Выберите другой день',
          });
        }

        return true;
      },
    }),
  appointmentTime: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }).required('Выбор времени приема обязателен'),
});
