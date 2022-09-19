import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { GatherPoint } from './gatherPoint.entity';

@Entity()
export class Bike {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 1 })
    status: number;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

    @Column({ default: false }) 
    isDeleted: boolean;

    @ManyToOne(() => GatherPoint, gatherPoint => gatherPoint.bikes)
    gatherPoint: GatherPoint;
}