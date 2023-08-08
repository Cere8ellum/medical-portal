import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
// import { IntegerType } from 'typeorm'

export class CreateUserDto {
    id: number

    @IsNotEmpty()
    firstname: string

    @IsNotEmpty()
    lastname: string

    @IsNotEmpty()
    gender: string

    @IsNotEmpty()
    birthdate: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    address: string

    @IsNotEmpty()
    mobile: string

    @IsNotEmpty()
    @IsString()
    password: string
}
