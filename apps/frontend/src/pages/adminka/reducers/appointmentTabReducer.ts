import { Appointment } from '../components/AppointmentTab/AppointmentTab';
import { User } from '../components/AppointmentTab/PatientSearchForm';

export type FormState = {
  user: User | null;
  appointments: Appointment[];
  currentAppointment: Appointment | null;
  createOpen: boolean;
  editOpen: boolean;
  deleteOpen: boolean;
};

export enum Field {
  User = 'user',
  Appointments = 'appointments',
  CurrentAppointment = 'currentAppointment',
  Create = 'createOpen',
  Edit = 'editOpen',
  Delete = 'deleteOpen',
}

type FormAction = {
  type: string;
  field: Field;
  payload?: User | Appointment[] | Appointment | null;
};

export const appointmentTabReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case 'set_data': {
      return {
        ...state,
        [action.field]: action.payload,
      };
    }
    case 'open_modal': {
      return {
        ...state,
        [action.field]: true,
      };
    }
    case 'close_modal': {
      return {
        ...state,
        [action.field]: false,
      };
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
};
