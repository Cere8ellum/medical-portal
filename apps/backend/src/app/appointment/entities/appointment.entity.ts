import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  Timestamp,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';
import { Status } from '../status/status.enum';
import { DoctorEntity } from '../../doctor/entities/doctor.entity';
import { PatientEntity } from '../../patient/entities/patient.entity';
import { MedicalHistoryEntity } from '../../medical-history/entities/medical-history.entity';


@Entity('appointments')
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: Number,
    description: 'id appointment, pk'})
  id: number;

  @ManyToOne(()=>UserEntity, (doctor) => doctor.appointment)
  @JoinColumn()
  @IsNotEmpty()
  @ApiProperty({ type: () => UserEntity,description: 'Врач' })
  doctor: UserEntity;

  @ManyToOne(()=> UserEntity, (patient) => patient.appointment)
  @JoinColumn()
  @IsNotEmpty()
  @ApiProperty({ type: () => UserEntity, description: 'Пациент',})
  patient: UserEntity

  @Column('timestamp')
  @IsNotEmpty()
  @ApiProperty({
    type: Timestamp,
    description: 'Дата и время начала приема'
  })
  date_start: Date;


  @Column('varchar')
  @IsNotEmpty()
  @IsEnum(Status)
  @ApiProperty({
    enum: ['Waiting', 'Cancelled', 'Completed','Started'],
    description: 'Status визита',
    default: 'waiting'
  })
  status: Status

  @OneToOne(()=> MedicalHistoryEntity, (medical_history) => medical_history.appointment, {nullable: true})
  @JoinColumn()
  @ApiProperty({
    type: () => MedicalHistoryEntity,
    description: 'Медицинское заключение визита',
    default: null
  })
  medical_history: MedicalHistoryEntity

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    type: Date,
    description: 'Дата бронирования'
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    type: Date,
    description: 'Дата внесения изменений'
  })
  updatedAt: Date;
}


