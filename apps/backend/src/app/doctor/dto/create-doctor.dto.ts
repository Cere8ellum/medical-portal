import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateDoctorDto {
    id: number

    @IsEmail()
    email: string

}
