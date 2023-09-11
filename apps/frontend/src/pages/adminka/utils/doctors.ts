import api from "apps/frontend/src/infrastructure/api";
import { DoctorDto } from "../interfaces/Doctor.dto";

export  const getSpeciality = async (): Promise<Array<string>> => {
  let specialities: Array<string> = [];
  await api('/doctors/all/specialities')
    .then(({ data }) => {
      specialities = data
    })
    .catch((error) => {
      console.log(error);
      specialities = [];
    });
    return specialities;
};

export const getDoctors = async (speciality: string) : Promise<DoctorDto[]> => {
  let doctorList: DoctorDto[] = [];
  if(speciality === 'all') {
    await api({
      method:'get',
      url: `/doctors/all/`,
      })
    .then(({data}:{data: DoctorDto[]})=> {
      doctorList = data;
    })
    .catch((error: Error)=> {
       console.log(error);
    })
  } else {
    await api({
      method:'get',
      url: `/doctors/speciality?speciality=${speciality}`
      })
      .then(({data}:{data: DoctorDto[]}) => {
        doctorList = data;
      })
      .catch((error: Error)=> {
        console.log(error);
     });
  }
  return doctorList
}

export const getDocId = (value: string): number | null =>{
  const match = value.match(/\d+/);
  if (match) {
    const id = parseInt(match[0], 10);
    return id;
  }
  return null
}
