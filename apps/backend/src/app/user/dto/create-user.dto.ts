import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
// import { IntegerType } from 'typeorm'

export class CreateUserDto {
    id: number
    uuid: string
    firstname: string
    lastname: string
    gender: string
    birthdate: string
    @IsEmail()
    email: string
    address: string
    mobile: string
    @IsNotEmpty()
    @IsString()
    password: string
    status: string
    created: string
    updated: string
}
