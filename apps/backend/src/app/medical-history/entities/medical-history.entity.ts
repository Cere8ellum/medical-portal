import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('medical-history')
export class MedicalHistoryEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: 'number',
    description: 'id of Medical History',
  })
  id: number;

  @Column('varchar', { nullable: false })
  @ApiProperty({
    type: 'string',
    description: 'Complaint of Patient',
  })
  patient_complaint: string;

  @Column('varchar', { nullable: false })
  @ApiProperty({
    type: 'string',
    description: 'Plan of Treatment',
  })
  treatment_plan: string;

  @Column('varchar', { nullable: false })
  @ApiProperty({
    type: 'string',
    description: 'Disease Conclusion',
  })
  disease_conclusion: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  @ApiProperty({
    type: Date,
    description: 'Appointment start time',
  })
  time_start: Date;
}
