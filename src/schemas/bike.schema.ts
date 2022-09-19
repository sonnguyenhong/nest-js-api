import { EntitySchema } from 'typeorm';
import { Bike } from '../entities/bike.entity';

export const BikeSchema = new EntitySchema<Bike>({
    name: 'Bike',
    target: Bike,
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },

        status: {
            type: Number,
            default: 1
        },

        createdAt: {
            type: Date,
        },

        updatedAt: {
            type: Date,
            nullable: true,     
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    relations: {
        gatherPoint: {
            type: 'many-to-one',
            target: 'GatherPoint',
        }
    }
})