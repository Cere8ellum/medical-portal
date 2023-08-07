import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AppointmentEntity } from "../../appointment/entities/appointment.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Entity('patients')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: 'number',
    description: 'id Patient, pk',
  })
  id: number;

  @Column({ type: 'character varying' || 'integer' })
  @ApiProperty({
    type: 'number',
    description: 'id parent for child-Patient',
    default: null
  })
  parent_id: number;

  @Column({ type: 'varchar' })
  @ApiProperty({
    type: 'string',
    description: 'Адрес проживания пациента',
    default: null
  })
  address: string

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    type: 'string',
    description: 'avatar пациента',
    default: null
  })
  avatar: string

  // @OneToOne(()=> UserEntity, (user)=> (user.patient))
  // @ApiProperty({
  //   type: ()=> UserEntity,
  //   description: 'Личные данные пользователя patient',
  //   default: null
  // })
  // user: UserEntity
}
