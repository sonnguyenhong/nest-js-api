import { EntitySchema } from 'typeorm';
import { GatherPoint } from '../entities/gatherPoint.entity';

export const GatherPointSchema = new EntitySchema<GatherPoint>({
    name: 'GatherPoint',
    target: GatherPoint,
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        location: {
            type: String,
        },

        numberOfBikes: {
            type: Number,
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
        }
    },
    relations: {
        bikes: {
            type: 'one-to-many',
            target: 'Bike',
        }
    }
})