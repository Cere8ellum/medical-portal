import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'timestamp', nullable: false })
  @ApiProperty({
    type: 'timestamp',
    description: 'Date of Shedule',
  })
  date: Date;
}
