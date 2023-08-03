import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppointmentEntity } from '../../appointment/entities/appointment.entity';
import { DoctorEntity } from '../../doctor/entities/doctor.entity';
import { PatientEntity } from '../../patient/entities/patient.entity';
import { Gender } from '../enum/gender.enum';
import { Role } from '../enum/role.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('string')
  firstname: string;

  @Column('string')
  lastname: string;

  @Column('string')
  @IsEnum(Gender)
  gender: string;

  @Column('string',{nullable: true})
  birthday: string;

  @Column()
  email: string;

  @Column('string',{nullable: true})
  address: string;

  // @Column('string',{nullable: true})
  // avatar: string;

  @Column('string',{nullable: true})
  mobile: string;

  @Column()
  password: string;

  @Column('string')
  @IsEnum(Role)
  role: string;

  @OneToOne(() => DoctorEntity, (doctor) => doctor.id)
  @OneToOne(() => PatientEntity, (patient) => patient.id)
  @JoinColumn()
  profile: DoctorEntity | PatientEntity;

  @OneToMany(()=> AppointmentEntity,(appointment)=> appointment.patient, {nullable: true})
  @ApiProperty({
    type: ()=> AppointmentEntity,
    description: 'Визит к врачy',
    default: null
  })
  appointment: AppointmentEntity[]
}
