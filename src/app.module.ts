import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GatherPoint } from './entities/gatherPoint.entity';
import { Bike } from './entities/bike.entity';
import { Customer } from './entities/customer.entity';

import { GatherPointModule } from './modules/gatherPoint.module';
import { BikeModule } from './modules/bike.module';
import { CustomerModule } from './modules/customer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'bike',
      entities: [GatherPoint, Bike, Customer],
      synchronize: true,
      autoLoadEntities: true,
    }),
    GatherPointModule,
    BikeModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
