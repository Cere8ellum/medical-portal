import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
// import { IntegerType } from 'typeorm'

export class CreateUserDto {
    firstname: string
    lastname: string
    gender: string
    birthdate: string
    role: string
    @IsEmail()
    email: string
    address: string
    mobile: string
    @IsNotEmpty()
    @IsString()
    password: string
}
