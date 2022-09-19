import { EntitySchema } from 'typeorm';
import { Customer } from '../entities/customer.entity';

export const CustomerSchema = new EntitySchema<Customer>({
    name: 'Customer',
    target: Customer,
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },

        name: {
            type: String,
        }, 

        idCardNumber: {
            type: String,
        },

        email: {
            type: String,
            unique: true,
        },

        username: {
            type: String,
            unique: true,
        },

        password: {
            type: String,
        },

        address: {
            type: String,
        }, 

        phone: {
            type: String,
        },

        isEcoparkMember: {
            type: Boolean,
        },

        ecoparkId: {
            type: String,
        },

        status: {
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
})