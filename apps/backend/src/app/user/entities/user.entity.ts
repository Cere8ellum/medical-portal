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

  @Column('varchar',{nullable:false})
  @ApiProperty({
    type: 'varchar',
    description: 'firstname',
  })
  firstname: string;

  @Column('varchar')
  @ApiProperty({
    type: 'varchar',
    description: 'lastname',
  })
  lastname: string;

  @Column('varchar')
  @IsEnum(Gender)
  @ApiProperty({
    type: 'string',
    enum: ['Male', 'Female'],
    description: 'gender - male, female',
    default: 'male'
  })
  gender: string;

  @Column('varchar',{nullable: true})
  @ApiProperty({
    type: 'varchar',
    description: 'birthdate',
  })
  birthdate: string;

  @Column()
  @ApiProperty({
    type: 'varchar',
    description: 'email',
  })
  email: string;

  @Column('varchar',{nullable: true})
  @ApiProperty({
    type: 'varchar',
    description: 'address',
  })
  address: string;

  // @Column('string',{nullable: true})
  // @ApiProperty({
  //   type: 'varchar',
  //   description: 'photo or avatar',
  //   example: 'url'
  // })
  // avatar: string;

  @Column('varchar',{nullable: true})
  @ApiProperty({
    type: 'varchar',
    description: 'mobile',
  })
  mobile: string;

  @Column()
  @ApiProperty({
    type: 'varchar',
    description: 'password',
  })
  password: string;

  @Column('varchar')
  @IsEnum(Role)
  @ApiProperty({
    type: 'varchar',
    enum: ['Admin', 'Doctor', 'Patient'],
    description: 'email',
    default: 'patient'
  })
  role: string;

  // @OneToOne(() => DoctorEntity, (doctor) => doctor.id)
  // @OneToOne(() => PatientEntity, (patient) => patient.id)
  // @JoinColumn()
  // @ApiProperty({
  //     type: ()=> AppointmentEntity,
  //     description: 'Визит к врачy',
  //     default: null
  //   })
  // profile: DoctorEntity | PatientEntity;

  // @OneToMany(()=> AppointmentEntity,(appointment)=> appointment.id, {nullable: true})
  // @ApiProperty({
  //   type: ()=> AppointmentEntity,
  //   description: 'Визит к врачy',
  //   default: null
  // })
  // appointment: AppointmentEntity[]
}
