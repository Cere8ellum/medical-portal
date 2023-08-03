import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('patients')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parent_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  birthday: Date;

  @Column()
  address: string;
}
