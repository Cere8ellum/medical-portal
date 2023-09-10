import api from "apps/frontend/src/infrastructure/api";

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
