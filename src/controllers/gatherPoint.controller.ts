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
import { UpdateGatherPointDto } from '../dto/GatherPoint/updateGatherPoint.dto';

import { GatherPointService } from '../services/gatherPoint.service';
import { CreateGatherPointDto } from '../dto/GatherPoint/createGatherPoint.dto';

@Controller('gatherPoints')
export class GatherPointController {
    constructor(private readonly gatherControllerService: GatherPointService) {}

    @Get()
    async getAll(@Res() res: Response) {
        try {
            const listGatherPoints = await this.gatherControllerService.getAll();
            return res.status(HttpStatus.OK).json({
                message: 'Get list gather points successfully',
                data: listGatherPoints
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                data: null
            })
        }
    }

    @Get(':id')
    async getById(@Param('id') id: string, @Res() res: Response) {
        try {
            const gatherPoint = await this.gatherControllerService.getById(+id);
            return res.status(HttpStatus.OK).json({
                message: `Get gather point with id: ${id} successfully!`,
                data: gatherPoint
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                data: null
            }) 
        }
    }

    @Post()
    async create(@Body() createGatherPointDto: CreateGatherPointDto, @Res() res: Response) {
        try {
            const newGatherPoint = await this.gatherControllerService.create(createGatherPointDto);
            return res.status(HttpStatus.OK).json({
                message: 'Create new gather point successfully!',
                data: newGatherPoint
            });
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                data: null
            })
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateGatherPointDto: UpdateGatherPointDto,
        @Res() res: Response
    ) {
        try {
            const updatedGatherPoint = await this.gatherControllerService.update(+id, updateGatherPointDto);
            return res.status(HttpStatus.OK).json({
                message: 'Update gather point successfully!',
                data: updatedGatherPoint
            });
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                data: null
            });
        }
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        try {
            const deletedGatherPoint = await this.gatherControllerService.delete(+id);
            return res.status(HttpStatus.OK).json({
                message: 'Delete gather point successfully!',
                data: deletedGatherPoint
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                data: null,
            })
        }
    }
}