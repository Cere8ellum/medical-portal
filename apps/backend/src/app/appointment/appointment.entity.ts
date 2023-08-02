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
} from 'typeorm';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { Status } from './status/status.enum';

class Medical_history {

}

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: Number,})
  id: number;

  @OneToOne(()=>User, (doctor) => doctor.appointment)
  @JoinColumn()
  @ApiProperty({ type: () => User,description: 'Врач' })
  doctor: User;

  @OneToOne(()=> User, (patient) => patient.appointment)
  @JoinColumn()
  @ApiProperty({ type: () => User, description: 'Пациент',})
  patient: User

  @Column('timestamp')
  @ApiProperty({
    type: Timestamp,
    description: 'Дата и время начала приема'
  })
  date_start: Date;


  @Column('varchar')
  @IsEnum(Status)
  @ApiProperty({
    enum: ['Waiting', 'Cancelled', 'Completed','Started'],
    description: 'Status визита',
    default: 'waiting'
  })
  status: Status

  @OneToOne(()=> Medical_history, (medical_history) => medical_history.appointment, {nullable: true})
  @JoinColumn()
  @ApiProperty({
    type: () => Medical_history,
    description: 'Медицинское заключение визита',
    default: null
  })
  medical_history: Medical_history
}


