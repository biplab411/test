import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Corear } from './entity/corear.entity';
import { CreateCorearDto } from './dto/create-corear.dto';

@Injectable()
export class CorearService {
  constructor(
    @InjectRepository(Corear)
    private readonly corearRepo: Repository<Corear>,
  ) {}

  async create(dto: CreateCorearDto) {
    try {
      const corear = this.corearRepo.create({
        ...dto,
        isAvailable: true,
      });

      return await this.corearRepo.save(corear);
    } catch (error) {
      console.error('Create corear error:', error);
      throw new InternalServerErrorException('Failed to create corear');
    }
  }

  async findAvailableCorears(): Promise<Corear[]> {
    try {
      return await this.corearRepo.find({
        where: { isAvailable: true },
      });
    } catch (error) {
      console.error('Find available corears error:', error);
      throw new InternalServerErrorException(
        'Failed to fetch available corears',
      );
    }
  }

  async markUnavailable(corear: Corear) {
    corear.isAvailable = false;
    return this.corearRepo.save(corear);
  }

  async releaseCorear(corear: Corear) {
    corear.isAvailable = true;
    return this.corearRepo.save(corear);
  }

  async updateLocation(id: number, lat: number, lng: number) {
    try {
      const corear = await this.corearRepo.findOne({
        where: { id },
      });

      if (!corear) {
        throw new NotFoundException('Corear not found');
      }

      corear.lat = lat;
      corear.lng = lng;

      return await this.corearRepo.save(corear);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error('Update corear location error:', error);
      throw new InternalServerErrorException(
        'Failed to update corear location',
      );
    }
  }

  async findAll() {
    try {
      return await this.corearRepo.find();
    } catch (error) {
      console.error('Find all corears error:', error);
      throw new InternalServerErrorException('Failed to fetch corears');
    }
  }
}
