import { Controller, 
    Get,
    Post,
    Put,
    Delete,
    Res,
    Body,
    Param } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Response } from 'express';

import { CustomerService } from '../services/customer.service';
import { RegisterCustomerDto } from '../dto/Customer/registerCustomer.dto';

@Controller('user')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post('register')
    async register(@Body() registerCustomerDto: RegisterCustomerDto, @Res() res: Response) {
        try {
            const customer = await this.customerService.register(registerCustomerDto);
            return res.status(HttpStatus.OK).json({
                message: 'Register customer successfully!',
                data: customer
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                data: null
            }) 
        }
    }

}