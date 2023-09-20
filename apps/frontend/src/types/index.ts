import { Dayjs } from 'dayjs';

export type Option = {
  value: string;
  label: string;
};

export type TimeInterval = {
  startTime: Dayjs;
  endTime: Dayjs;
};

export type Absence = {
  id: number;
  cause: string;
  date: Date;
  doctor_id: number;
};
