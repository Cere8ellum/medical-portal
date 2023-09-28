export interface DoctorDto {
  id: number,
  speciality: string,
  category: string,
  type: string,
  startWorking: string,
  info: string,
  price: string,
  photo: string,
  user: UserDto,
 }

export interface UserDto {
      id: number,
      uuid: string,
      firstname: string,
      lastname: string,
      gender: string,
      birthdate: string,
      email: string,
      address: string,
      mobile: string,
      password: string,
      role: string,
      created: Date,
      updated: Date,
      status: string
}

