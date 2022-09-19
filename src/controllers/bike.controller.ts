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
import { CreateBikeDto } from 'src/dto/Bike/createBike.dto';
import { UpdateBikeDto } from 'src/dto/Bike/updateBike.dto';

import { BikeService } from 'src/services/bike.service';

@Controller('bike')
export class BikeController {
    constructor(private readonly bikeService: BikeService) {}

    @Get()
    async getAll(@Res() res: Response) {
        try {
            const listBikes = await this.bikeService.getAll();
            return res.status(HttpStatus.OK).json({
                message: 'Get list bikes successfully!',
                data: listBikes
            });
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message, 
                data: null
            });
        }
    }

    @Get(':id')
    async getById(@Param('id') id: string, @Res() res: Response) {
        try {
            const bike = await this.bikeService.getById(+id);
            if(!bike) {
                throw new Error('Cannot find bike with id: ' + id);
            }
            return res.status(HttpStatus.OK).json({
                message: `Get bike with id ${id} successfully!`,
                data: bike
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message, 
                data: null
            });
        }
    }

    @Post()
    async create(@Body() createBikeDto: CreateBikeDto, @Res() res: Response) {
        try {
            const newBike = await this.bikeService.create(createBikeDto);
            return res.status(HttpStatus.OK).json({
                message: 'Create new bike successfully!',
                data: newBike
            });
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message, 
                data: null
            });
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateBikeDto: UpdateBikeDto,
        @Res() res: Response
    ) {
        try {
            const updatedBike = await this.bikeService.update(+id, updateBikeDto);
            return res.status(HttpStatus.OK).json({
                message: `Update bike with id ${id} successfully!`,
                data: updatedBike
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
            const deletedBike = await this.bikeService.delete(+id);
            return res.status(HttpStatus.OK).json({
                message: `Delete bike with id: ${id} successfully!`,
                data: deletedBike
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                data: null,
            })
        }
    }
}