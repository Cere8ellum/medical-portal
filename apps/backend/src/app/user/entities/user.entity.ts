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

  @Column({ type: 'varchar', nullable: false })
  firstname: string;

  @Column({ type: 'varchar', nullable: false })
  lastname: string;

  @Column({ type: 'varchar', nullable: false })
  @IsEnum(Gender)
  gender: string;

  @Column({ type: 'varchar', nullable: false })
  birthdate: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  // @Column('string',{nullable: true})
  // avatar: string;

  @Column({ type: 'varchar', nullable: false })
  mobile: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  @IsEnum(Role)
  role: string;

  // @OneToOne(() => DoctorEntity, (doctor) => doctor.id)
  // @OneToOne(() => PatientEntity, (patient) => patient.id)
  // @JoinColumn()
  // profile: DoctorEntity | PatientEntity;

  // @OneToMany(()=> AppointmentEntity,(appointment)=> appointment.patient, {nullable: true})
  // @ApiProperty({
  //   type: ()=> AppointmentEntity,
  //   description: 'Визит к врачy',
  //   default: null
  // })
  // appointment: AppointmentEntity[]
}
