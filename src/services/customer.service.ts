import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { Customer } from '../entities/customer.entity';
import { RegisterCustomerDto } from '../dto/Customer/registerCustomer.dto';
import { LoginCustomerDto } from '../dto/Customer/loginCustomer.dto';
import { CustomerStatus } from 'src/constants/EntityConstant';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepo: Repository<Customer>,
    ) {}

    async register(registerCustomerDto: RegisterCustomerDto) {
        const existedCustomer = await this.customerRepo.findOne({
            where: {
                email: registerCustomerDto.email
            }
        });

        if(existedCustomer) {
            throw new Error(`User with email ${registerCustomerDto.email} is existed. Please choose another email!`);
        }

        if(registerCustomerDto.password !== registerCustomerDto.confirmedPassword) {
            throw new Error('Password and Confirmed Password must be equal');
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(registerCustomerDto.password, salt);

        const registerInput = {
            ...registerCustomerDto,
            password: hashedPassword,
            createdAt: new Date(),
            status: CustomerStatus.PENDING
        };
        
        const customer = await this.customerRepo.save(registerInput);
        return customer;
    }

    async login(loginCustomerDto: LoginCustomerDto) {

    }

} 