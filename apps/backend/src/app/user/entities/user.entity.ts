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
  @ApiProperty({
    type: 'number',
    description: 'id User, pk',
  })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({
    type: 'varchar',
    description: 'firstname',
  })
  firstname: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({
    type: 'varchar',
    description: 'lastname',
  })
  lastname: string;

  @Column({ type: 'varchar', nullable: false })
  @IsEnum(Gender)
  @ApiProperty({
    type: 'string',
    enum: ['Male', 'Female'],
    description: 'gender - male, female',
    default: 'male'
  })
  gender: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({
    type: 'varchar',
    description: 'birthdate',
  })
  birthdate: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({
    type: 'varchar',
    description: 'email',
  })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({
    type: 'varchar',
    description: 'address',
  })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({
    type: 'varchar',
    description: 'mobile',
  })
  mobile: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({
    type: 'varchar',
    description: 'password',
  })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  @IsEnum(Role)
  @ApiProperty({
    type: 'varchar',
    enum: ['Admin', 'Doctor', 'Patient'],
    description: 'email',
    default: 'patient'
  })
  role: string;

  @OneToOne(() => DoctorEntity, (doctor) => doctor.user)
  @JoinColumn()
  @ApiProperty({
      type: ()=> DoctorEntity,
      description: 'врач',
      default: null
    })
  doctor: DoctorEntity;

    // @OneToOne(() => PatientEntity, (patient) => patient.id)
    // @JoinColumn()
    // @ApiProperty({
    //     type: ()=> PatientEntity,
    //     description: ' patient',
    //     default: null
    //   })
    // patient: PatientEntity;
}
