import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('schedule-setup')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: 'number',
    description: 'id of Shedule, pk',
  })
  id: number;

  @Column({ type: 'integer', nullable: false })
  @ApiProperty({
    type: 'number',
    description: 'ID of a Doctor',
  })
  doctor_id: number;

  @Column({ type: 'timestamp', nullable: false })
  @ApiProperty({
    type: 'timestamp',
    description: 'Date of Shedule',
  })
  date: Date;

  @Column({ type: 'time', nullable: false })
  @ApiProperty({
    type: 'time',
    description: 'Start time of appointment',
  })
  time_start: string;

  @Column({ type: 'time', nullable: false })
  @ApiProperty({
    type: 'time',
    description: 'End time of appointment',
  })
  time_finish: string;

  @Column({ type: 'integer', nullable: false })
  @ApiProperty({
    type: 'time',
    description: 'End time of appointment',
  })
  step: number;
}
