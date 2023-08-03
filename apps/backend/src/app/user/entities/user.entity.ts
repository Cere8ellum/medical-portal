import { IsEnum } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DoctorEntity } from '../../doctor/entities/doctor.entity';
import { PatientEntity } from '../../patient/entities/patient.entity';
import { Gender } from '../enum/gender.enum';
import { Role } from '../enum/role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('string')
  firstname: string;

  @Column('string')
  lastname: string;

  @Column('string')
  @IsEnum(Gender)
  gender: string;

  @Column('string',{nullable: true})
  birthday: string;

  @Column('string',{nullable: true})
  address: string;

  @Column('string',{nullable: true})
  avatar: string;

  @Column('string',{nullable: true})
  mobile: string;

  @Column('string')
  @IsEnum(Role)
  role: string;

  @OneToOne(() => DoctorEntity, (doctor) => doctor.id,{nullable: true})
  doctor: DoctorEntity;

  @OneToOne(() => PatientEntity, (patient) => patient.id, {nullable: true})
  patient: PatientEntity;
}
