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
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppointmentEntity } from '../../appointment/entities/appointment.entity';

@Entity('medical_history')
export class MedicalHistoryEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: Number,
    description: 'id MedicalHistory, pk'})
  id: number;

  // дописать поля

  // @OneToOne(()=>AppointmentEntity, (appointment)=> appointment.medical_history,{nullable: true})
  // @ApiProperty({
  //   type: () => MedicalHistoryEntity,
  //   description: 'Медицинское заключение визита',
  //   default: null
  // })
  // appointment: AppointmentEntity

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    type: Date,
    description: 'Дата посещения врача'
  })
  createdAt: Date;

}
