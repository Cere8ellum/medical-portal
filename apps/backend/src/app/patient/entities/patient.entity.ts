import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AppointmentEntity } from "../../appointment/entities/appointment.entity";

@Entity('patients')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: 'number',
    description: 'id Patient, pk',
  })
  id: number;

  @Column('number',{nullable: true})
  @ApiProperty({
    type: 'number',
    description: 'id parent for child-Patient',
    default: null
  })
  parent_id: number;

  @Column('string', {nullable: true})
  @ApiProperty({
    type: 'string',
    description: 'Адрес проживания пациента',
    default: null
  })
  address: string
}
