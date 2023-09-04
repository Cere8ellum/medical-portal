export interface OpinionDto {
  id: number;
  patient_complaint: string;
  treatment_plan: string;
  disease_conclusion: string;
  time_start: Date;
}

export interface AppointmentDto {
  date: string;
    doctor: string;
    speciality: string;
    patient: string;
    bday: string;
    category: string;
    status: string;
    id: number;
    opinion: OpinionDto;
}


