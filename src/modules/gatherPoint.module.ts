import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatherPointSchema } from '../schemas/gatherPoint.schema';
import { GatherPointController } from '../controllers/gatherPoint.controller';
import { GatherPointService } from '../services/gatherPoint.service';
import { BikeSchema } from 'src/schemas/bike.schema';

@Module({
  imports: [TypeOrmModule.forFeature([GatherPointSchema, BikeSchema])],
  providers: [GatherPointService],
  controllers: [GatherPointController],
})
export class GatherPointModule {}
