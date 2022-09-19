import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeSchema } from '../schemas/bike.schema';
import { BikeController } from '../controllers/bike.controller';
import { BikeService } from '../services/bike.service';
import { GatherPointSchema } from 'src/schemas/gatherPoint.schema';

@Module({
  imports: [TypeOrmModule.forFeature([BikeSchema, GatherPointSchema])],
  providers: [BikeService],
  controllers: [BikeController],
})
export class BikeModule {}
