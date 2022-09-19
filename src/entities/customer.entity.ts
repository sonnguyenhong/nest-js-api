import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    idCardNumber: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column() 
    password: string;

    @Column() 
    address: string;

    @Column()
    phone: string;

    @Column({ default: false })
    isEcoparkMember: boolean;

    @Column({ nullable: true })
    ecoparkId: string;

    @Column()
    status: number;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

    @Column({ default: false }) 
    isDeleted: boolean;
}