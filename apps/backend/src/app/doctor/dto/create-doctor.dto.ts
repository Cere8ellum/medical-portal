import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator'
import { Gender } from '../../user/enum/gender.enum'
import { QualificationCategory } from '../enum/category.enum'
import { Speciality } from '../enum/speciality.enum'
import { DoctorType } from '../enum/type.enum'

export class CreateDoctorDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'firstname',
  })
  firstname: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'lastname',
  })
  lastname: string

  @IsNotEmpty()
  @IsEnum(Gender)
  @ApiProperty({
    type: 'string',
    description: 'gender',
    default: 'male'
  })
  gender: Gender


  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'email'
  })
  email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'mobile',
  })
  mobile: string

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'address',
  })
  @ValidateIf((o) => o.address)
  address: string

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'password',
  })
  @IsNotEmpty()
  password: string

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'birthdate',
  })
  @ValidateIf((o) => o.birthdate)
  birthdate: string

  @IsNotEmpty()
  @IsEnum(Speciality)
  @ApiProperty({
    type: 'string',
    description: 'специализация врача',
    default: null
  })
  speciality: Speciality

  @IsEnum(QualificationCategory)
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    enum: ['Second','First','Highest'],
    description: 'вторая, первая или высшая категории',
    default: 'Second'
  })
  category: QualificationCategory


  @IsEnum(DoctorType)
  @ApiProperty({
    type: 'string',
    enum: ['Adult', 'Child'],
    description: 'Взрослый или детский врач',
    default: 'взрослый '
  })
  @ValidateIf((o) => o.type)
  type: DoctorType

  @ApiProperty({
    type: 'string',
    description: 'Год начала практики',
    default: null
  })
  @IsString()
  @IsNotEmpty()
  startWorking: string


  @ApiProperty({
    type: 'string',
    description: 'Информация о враче',
    example: 'Врач общей практики. Доктор Николай Димитр родился в 1975 году в Пирее.В 1992 году окончил 7-ю среднюю школу в Пирее и продолжил обучение в Румынии, где в 1999 году окончил Медицинский университет в Яссах.',
    default: null
  })
  @IsString()
  @ValidateIf((o) => o.info)
  info: string

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Цена за 1 прием',
    default: 2000
  })
  @ValidateIf((o) => o.price)
  price: string

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'ссылка на фото врача',
  })
  @ValidateIf((o) => o.photo)
  photo: string
}
