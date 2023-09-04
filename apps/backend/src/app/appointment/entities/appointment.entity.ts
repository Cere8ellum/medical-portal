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
import { Status } from '../enum/status.enum';
import { MedicalHistoryEntity } from '../../medical-history/entities/medical-history.entity';
import { DoctorEntity } from '../../doctor/entities/doctor.entity';



@Entity('appointments')
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: Number,
    description: 'id appointment, pk'})
  id: number;

  @ManyToOne(()=>DoctorEntity, (doctor) => doctor.id)
  @JoinColumn()
  @IsNotEmpty()
  @ApiProperty({ type: () => DoctorEntity,description: 'Врач' })
  doctor: DoctorEntity;

  @ManyToOne(()=> UserEntity, (patient) => patient.id)
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
  status: Status;

  @OneToOne(()=> MedicalHistoryEntity, (medical_history) => medical_history.id)
  @JoinColumn()
  @ApiProperty({
    type: () => MedicalHistoryEntity,
    description: 'заключение визита',
    default: null
  })
  opinion: MedicalHistoryEntity;
}
