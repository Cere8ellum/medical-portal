import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AppointmentEntity } from "../../appointment/entities/appointment.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { Category } from "../enum/category.enum";
import { Speciality } from "../enum/speciality.enum";
import { DoctorType } from "../enum/type.enum";

@Entity("doctors")
export class DoctorEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({
      type: 'number',
      description: 'id Doctor, pk',
    })
    id: number

    @Column({ type: 'varchar', nullable: false })
    @IsEnum(Speciality)
    @ApiProperty({
      type: 'string',
      enum: [],
      description: 'специализация врача',
      default: null
    })
    speciality: Speciality

    @Column({ type: 'varchar', nullable: false })
    @IsEnum(Category)
    @ApiProperty({
      type: 'string',
      enum: [],
      description: 'вторая, первая или высшая категории',
      default: 'первая'
    })
    category: Category

    @Column({ type: 'varchar', nullable: false })
    @IsEnum(DoctorType)
    @ApiProperty({
      type: 'string',
      enum: ['Adult', 'Child'],
      description: 'Взрослый или детский врач',
      default: 'взрослый '
    })
    type: DoctorType

    @Column({ type: 'character varying' || 'integer' })
    @ApiProperty({
      type: 'number',
      description: 'Год начала практики',
      default: null
    })
    startWorking: number

    @Column({ type: 'varchar' })
    @ApiProperty({
      type: 'number',
      description: 'Информация о враче',
      example: 'Врач общей практики. Доктор Николай Димитр родился в 1975 году в Пирее.В 1992 году окончил 7-ю среднюю школу в Пирее и продолжил обучение в Румынии, где в 1999 году окончил Медицинский университет в Яссах.',
      default: null
    })
    info: string

    @Column({ type: 'character varying' || 'integer' })
    @ApiProperty({
      type: 'number',
      description: 'Цена за 1 прием',
      default: 0
    })
    price: number
}
