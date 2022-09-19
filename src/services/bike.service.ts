import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BikeStatus } from 'src/constants/EntityConstant';
import { CreateBikeDto } from 'src/dto/Bike/createBike.dto';
import { UpdateBikeDto } from 'src/dto/Bike/updateBike.dto';
import { GatherPoint } from 'src/entities/gatherPoint.entity';
import { Repository } from 'typeorm';

import { Bike } from '../entities/bike.entity';

@Injectable()
export class BikeService {
    constructor(
        @InjectRepository(Bike)
        private readonly bikeRepo: Repository<Bike>,

        @InjectRepository(GatherPoint)
        private readonly gatherPointRepo: Repository<GatherPoint>
    ) {}

    async getAll() {
        const bikes = await this.bikeRepo.find();
        return bikes;
    }

    async getById(id: number) {
        const bike = await this.bikeRepo.findOne({
            where: {
                id: id
            }
        });

        if(!bike) {
            throw new Error('Cannot find bike with id: ' + id);
        }

        return bike;
    }

    async create(createBikeDto: CreateBikeDto) {
        createBikeDto.createdAt = new Date();
        const gatherPoint = await this.gatherPointRepo.findOne({
            where: {
                id: createBikeDto.gatherPointId
            }
        });
        const newBike = {
            ...createBikeDto,
            gatherPoint: gatherPoint
        };
        const bike = await this.bikeRepo.save(newBike);
        if(!bike) {
            throw new Error('Create new bike fail!');
        }

        return bike;
    }

    async update(id: number, updateBikeDto: UpdateBikeDto) {
        let updatedBike = await this.bikeRepo.findOne({
            where: {
                id: id
            }
        });

        if(!updatedBike) {
            throw new Error('Cannot find bike with id: ' + id);
        }

        if(updateBikeDto.gatherPointId) {
            const gatherPoint = await this.gatherPointRepo.findOne({
                where: {
                    id: updateBikeDto.gatherPointId
                }
            });

            updatedBike.gatherPoint = gatherPoint;
        }

        updatedBike.updatedAt = new Date();

        updatedBike.status = updateBikeDto.status ? updateBikeDto.status : updatedBike.status;
        updatedBike.isDeleted = updateBikeDto.isDeleted ? updateBikeDto.isDeleted : updatedBike.isDeleted;
        
        return await this.bikeRepo.save(updatedBike);
    }
    
    async delete(id: number) {
        const deletedBike = await this.bikeRepo.findOne({
            where: {
                id: id
            }
        });
        if(!deletedBike) {
            throw new Error('Cannot find bike with id: ' + id);
        }

        deletedBike.isDeleted = Boolean(BikeStatus.DELETED);
        deletedBike.updatedAt = new Date();

        await this.bikeRepo.save(deletedBike);
        return deletedBike;
    }
} 