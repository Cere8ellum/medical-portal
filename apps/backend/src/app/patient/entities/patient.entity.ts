import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AppointmentEntity } from '../../appointment/entities/appointment.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('patients')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: 'number',
    description: 'id Patient, pk',
  })
  id: number;

  @Column({ type: 'character varying' || 'integer' })
  @ApiProperty({
    type: 'number',
    description: 'id of user entity',
  })
  user_id: number;

  @Column({ type: 'character varying' || 'integer' })
  @ApiProperty({
    type: 'number',
    description: 'id parent for child-Patient',
    default: null,
  })
  parent_id: number;

  @OneToOne(() => UserEntity, (user) => user)
  @ApiProperty({
    type: () => UserEntity,
    description: 'Личные данные пользователя patient',
    default: null,
  })
  user: UserEntity;
}
