import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity('absence-schedule')
export class AbsenceScheduleEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: 'number',
    description: 'id of Absence Shedule, pk',
  })
  id: number;

  @Column({ type: 'integer', nullable: false })
  @ApiProperty({
    type: 'number',
    description: 'ID of a Doctor',
  })
  doctor_id: number;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  @ApiProperty({
    type: Timestamp,
    description: 'Date of Absence',
  })
  date: Date;

  @Column('varchar', { nullable: false })
  @ApiProperty({
    type: 'string',
    description: 'Cause of Absence',
  })
  cause: string;
}
