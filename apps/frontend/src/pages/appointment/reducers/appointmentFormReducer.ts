import { Dayjs } from 'dayjs';
import { Option } from 'apps/frontend/src/types';
import { FormStatus } from 'apps/frontend/src/utils/constants/form';

export enum Field {
  Specialities = 'specialities',
  Doctors = 'doctors',
  Absences = 'absences',
  TimeSlots = 'timeSlots',
}

export type FormState = {
  specialities: string[];
  doctors: Option[];
  absences: Dayjs[];
  timeSlots: string[];
  status: FormStatus;
};

type FormAction = {
  type: string;
  field?: Field;
  payload?: Option[] | Dayjs[] | string[];
};

export const appointmentFormReducer = <S>(state: S, action: FormAction) => {
  switch (action.type) {
    case 'SET_DATA': {
      if (!action.field) return state;

      return {
        ...state,
        [action.field]: action.payload,
      };
    }
    case 'FETCH': {
      return {
        ...state,
        status: FormStatus.Loading,
      };
    }
    case 'RESOLVE': {
      return {
        ...state,
        status: FormStatus.Success,
      };
    }
    case 'REJECT': {
      return {
        ...state,
        status: FormStatus.Error,
      };
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
};
