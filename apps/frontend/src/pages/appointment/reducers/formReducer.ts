import { Dayjs } from 'dayjs';
import { Option } from '../components/AppointmentForm';

export enum Field {
  Specialities = 'specialities',
  Doctors = 'doctors',
  Absences = 'absences',
  TimeSlots = 'timeSlots',
}

export enum Status {
  Loading,
  Success,
  Error,
  Idle,
}

export type FormState = {
  specialities: string[];
  doctors: Option[];
  absences: Dayjs[];
  timeSlots: string[];
  status: Status;
};

type FormAction = {
  type: string;
  field?: Field;
  payload?: Option[] | Dayjs[] | string[];
};

export const formReducer = (state: FormState, action: FormAction) => {
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
        status: Status.Loading,
      };
    }
    case 'RESOLVE': {
      return {
        ...state,
        status: Status.Success,
      };
    }
    case 'REJECT': {
      return {
        ...state,
        status: Status.Error,
      };
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
};
