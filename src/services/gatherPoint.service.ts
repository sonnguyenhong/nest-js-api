import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GatherPoint } from '../entities/gatherPoint.entity';
import { CreateGatherPointDto } from '../dto/GatherPoint/createGatherPoint.dto';
import { UpdateGatherPointDto } from '../dto/GatherPoint/updateGatherPoint.dto';
import { GatherPointStatus } from 'src/constants/EntityConstant';

@Injectable()
export class GatherPointService {
    constructor(
        @InjectRepository(GatherPoint)
        private readonly gatherPointRepo: Repository<GatherPoint>,
    ) {}

    async getAll(): Promise<GatherPoint[]> {
        return await this.gatherPointRepo.find();
    }

    async getById(id: number) {
        const gatherPoint = await this.gatherPointRepo.findOne({
            where: {
                id: id,
                isDeleted: Boolean(GatherPointStatus.ACTIVE)
            }
        });

        if(!gatherPoint) {
            throw new Error('Cannot find gather point with id: ' + id);
        }

        return gatherPoint;
    }

    async create(createGatherPointDto: CreateGatherPointDto) {
        createGatherPointDto.createdAt = new Date();
        const gatherPoint = await this.gatherPointRepo.save(createGatherPointDto);
        if(!gatherPoint) {
            throw new Error('Create new gather point fail!');
        }
        return gatherPoint;
    }

    async update(id: number, updateGatherPointDto: UpdateGatherPointDto) {
        const updatedGatherPoint = await this.gatherPointRepo.findOne({
            where: {
                id: id
            }
        });
        if(!updatedGatherPoint) {
            throw new Error('Cannot find gather point with id: ' + id);
        }

        updatedGatherPoint.location = updateGatherPointDto.location;
        updatedGatherPoint.numberOfBikes = updateGatherPointDto.numberOfBikes;
        updatedGatherPoint.isDeleted = updateGatherPointDto.isDeleted;
        updatedGatherPoint.updatedAt = new Date();

        await this.gatherPointRepo.save(updatedGatherPoint);
        return updatedGatherPoint;
    }

    async delete(id: number) {
        const deletedGatherPoint = await this.gatherPointRepo.findOne({
            where: {
                id: id
            }
        });
        if(!deletedGatherPoint) {
            throw new Error('Cannot find gather point with id: ' + id);
        }

        deletedGatherPoint.isDeleted = Boolean(GatherPointStatus.DELETED);
        deletedGatherPoint.updatedAt = new Date();

        await this.gatherPointRepo.save(deletedGatherPoint);
        return deletedGatherPoint;
    }
}