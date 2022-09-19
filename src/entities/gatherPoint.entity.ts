import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Bike } from './bike.entity';

@Entity()
export class GatherPoint {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    location: string;

    @Column()
    numberOfBikes: number;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

    @Column({ default: false }) 
    isDeleted: boolean;

    @OneToMany(() => Bike, (bike) => bike.gatherPoint)
    bikes: Bike[];
}