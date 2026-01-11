import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CorearService } from './corear.service';
import { CreateCorearDto } from './dto/create-corear.dto';
import { UpdateCorearLocationDto } from './dto/update-corear-location.dto';

@Controller('corears')
export class CorearController {
  constructor(private readonly corearService: CorearService) {}

  // CREATE COREAR
  @Post()
  async create(@Body() dto: CreateCorearDto) {
    try {
      return await this.corearService.create(dto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error('CorearController create error:', error);
      throw new InternalServerErrorException('Failed to create corear');
    }
  }

  // FIND ALL COREARS
  @Get()
  async findAll() {
    try {
      return await this.corearService.findAll();
    } catch (error) {
      console.error('CorearController findAll error:', error);
      throw new InternalServerErrorException(
        'Failed to fetch corears',
      );
    }
  }

  // UPDATE COREAR LOCATION
  @Patch(':id/location')
  async updateLocation(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCorearLocationDto,
  ) {
    try {
      return await this.corearService.updateLocation(
        id,
        dto.lat,
        dto.lng,
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error(
        'CorearController updateLocation error:',
        error,
      );
      throw new InternalServerErrorException(
        'Failed to update corear location',
      );
    }
  }
}
