import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DoctorEntity } from '../../doctor/entities/doctor.entity';
import { PatientEntity } from '../../patient/entities/patient.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profile_id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  gender: string;

  @Column()
  birthday: string;

  @Column()
  address: string;

  @Column()
  avatar: string;

  @Column()
  mobile: string;

  @Column()
  role: string;

  @OneToOne(() => DoctorEntity, (doctor) => doctor.id)
  doctor: DoctorEntity;

  @OneToOne(() => PatientEntity, (patient) => patient.id)
  patient: PatientEntity;
}
