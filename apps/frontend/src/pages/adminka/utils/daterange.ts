import dayjs from 'dayjs';
import { AbsenceSchedule } from '../interfaces/AbsenceSchedule.dto';

export function groupDatesByPeriod(absences: AbsenceSchedule[]) {

  if (absences.length === 0) {
    return [];
  }
 const groupedAbsences: { ids: number[]; range: string; cause: string }[] = [];

  const groupedDates:Array<{range: string,
  ids: number[],
  cause: string}> = [];
  const groupedId: number[] = [];
  let startDate = dayjs(absences[0].date);
  let endDate = dayjs(absences[0].date);
  let cause = absences[0].cause;
  let ids: number[] = [absences[0].id];

  for (let i = 1; i < absences.length; i++) {

    const currentDate = dayjs(absences[i].date);
    const nextDate = dayjs(absences[i - 1].date);
    const oneDay = 1; // один день в dayjs

    if (currentDate.diff(nextDate, 'day') === oneDay && absences[i].cause === cause) {
      // Даты следуют друг за другом в том же периоде
      endDate = currentDate;
      ids.push(absences[i].id);
    } else {
      // Даты не следуют друг за другом, создаем новый период
      groupedDates.push({
        range: formatDateRange(startDate, endDate),
        ids: ids,
        cause: cause
      });
      startDate = currentDate;
      endDate = currentDate;
      cause = absences[i].cause
      ids = [absences[i].id];
    }
  }

  // Добавляем последний период
  groupedDates.push({
    range: formatDateRange(startDate, endDate),
    ids: ids,
    cause: cause
  });

  return groupedDates;
}

function formatDateRange(startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) {
  // Форматируем даты и создаем строку периода
  const startDateStr = startDate.format('MM/DD/YYYY');
  const endDateStr = endDate.format('MM/DD/YYYY');
  return `${startDateStr} - ${endDateStr}`;
}
