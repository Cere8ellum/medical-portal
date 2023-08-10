import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator'
import { Gender } from '../../user/enum/gender.enum'
import { QualificationCategory } from '../enum/category.enum'
import { Speciality } from '../enum/speciality.enum'
import { DoctorType } from '../enum/type.enum'

export class UpdateDoctorDto {

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({
  //   type: 'number',
  //   description: 'id user',
  // })
  // userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'firstname',
  })
  @ValidateIf((o) => o.firstname)
  firstname: string

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'lastname',
  })
  @ValidateIf((o) => o.lastname)
  lastname: string


  @IsEnum(Gender)
  @ApiProperty({
    type: 'string',
    description: 'gender',
    default: 'male'
  })
  @ValidateIf((o) => o.gender)
  gender: string


  @IsEmail()
  @ApiProperty({
    type: 'string',
    description: 'email'
  })
  @ValidateIf((o) => o.email)
  email: string

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'mobile',
  })
  @ValidateIf((o) => o.mobile)
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
    description: 'birthdate',
  })
  @ValidateIf((o) => o.birthdate)
  birthdate: string

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'password',
  })
  @ValidateIf((o) => o.password)
  password: string

  @IsEnum(Speciality)
  @ApiProperty({
    type: 'string',
    description: 'специализация врача',
    default: null
  })
  @ValidateIf((o) => o.speciality)
  speciality: Speciality


  @IsEnum(QualificationCategory)
  @ApiProperty({
    type: 'string',
    enum: ['Second','First','Highest'],
    description: 'вторая, первая или высшая категории',
    default: 'Second'
  })
  @ValidateIf((o) => o.category)
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
  @IsNumber()
  @ValidateIf((o) => o.startWorking)
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

  @IsNumber()
  @ApiProperty({
    type: 'string',
    description: 'Цена за 1 прием',
    default: 0
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
