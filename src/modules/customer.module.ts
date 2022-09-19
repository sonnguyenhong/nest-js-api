import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerSchema } from '../schemas/customer.schema';
import { CustomerController } from '../controllers/customer.controller';
import { CustomerService } from '../services/customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerSchema])],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
