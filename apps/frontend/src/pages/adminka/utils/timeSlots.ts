import { Option, TimeInterval } from 'apps/frontend/src/types';
import dayjs, { Dayjs } from 'dayjs';

export const getTimeInterval = (date: Dayjs): TimeInterval => {
  let startTime = dayjs().startOf('minute');
  const endTime = dayjs().set('hour', 20).startOf('hour');
  const isToday = dayjs().isSame(date, 'day');

  if ((isToday && startTime.hour() < 8) || !isToday) {
    startTime = startTime.set('hour', 8).startOf('hour');

    return { startTime, endTime };
  }

  if (startTime.minute() >= 30) {
    startTime = startTime.add(1, 'hour').set('minute', 0);
  } else {
    startTime = startTime.set('minute', 30);
  }

  return { startTime, endTime };
};

export const createTimeSlotOptions = ({
  startTime,
  endTime,
}: TimeInterval): Option[] => {
  const timeSlotsOptions = [];
  let index = 0;

  while (endTime.diff(startTime, 'minute') >= 30) {
    timeSlotsOptions.push({
      value: `${index++}`,
      label: startTime.format('HH:mm'),
    });

    startTime = startTime.add(30, 'minute');
  }

  return timeSlotsOptions;
};
