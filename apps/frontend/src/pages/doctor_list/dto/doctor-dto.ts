export interface DoctorDTO {
  id: number;
  category: string;
  speciality: string;
  type: string;
  startWorking: string;
  info: string;
  price: string;
  photo: string;
  user: {
    id: number;
    firstname: string;
    lastname: string;
    gender: string;
  };
}
