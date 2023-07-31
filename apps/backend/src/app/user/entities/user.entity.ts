import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    firstname: string
    @Column()
    lastname: string
    @Column()
    gender: string
    @Column()
    birthdate: string
    @Column()
    email: string
    @Column()
    address: string
    @Column()
    mobile: string
    @Column()
    password: string

    // @CreateDateColumn()
    // createdAt: Date

    // @UpdateDateColumn()
    // updataAt: Date
}
