import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";

@Entity("doctors")
export class DoctorEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    speciality: string

    @Column()
    category: string

    @Column()
    type: number

    @Column()
    startWorking: number

    @Column()
    info: string

    @Column()
    price: number

}
