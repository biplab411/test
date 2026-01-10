// src/corear/corear.service.ts
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
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

  // ===============================
  // CREATE COREAR
  // ===============================
  async create(dto: CreateCorearDto) {
    try {
      // 1️⃣ Create corear entity
      const corear = this.corearRepo.create({
        ...dto,
        isAvailable: true,
      });

      // 2️⃣ Save corear
      return await this.corearRepo.save(corear);
    } catch (error) {
      console.error('Create corear error:', error);
      throw new InternalServerErrorException('Failed to create corear');
    }
  }

  // ===============================
  // FIND AVAILABLE COREARS
  // ===============================
  async findAvailableCorears(): Promise<Corear[]> {
    try {
      // 1️⃣ Fetch available corears
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

  // ===============================
  // MARK COREAR UNAVAILABLE
  // ===============================
  async markUnavailable(corear: Corear) {
    try {
      // 1️⃣ Update availability
      corear.isAvailable = false;

      // 2️⃣ Save corear
      return await this.corearRepo.save(corear);
    } catch (error) {
      console.error('Mark corear unavailable error:', error);
      throw new InternalServerErrorException(
        'Failed to mark corear unavailable',
      );
    }
  }

  // ===============================
  // RELEASE COREAR
  // ===============================
  async releaseCorear(corear: Corear) {
    try {
      // 1️⃣ Update availability
      corear.isAvailable = true;

      // 2️⃣ Save corear
      return await this.corearRepo.save(corear);
    } catch (error) {
      console.error('Release corear error:', error);
      throw new InternalServerErrorException(
        'Failed to release corear',
      );
    }
  }

  // ===============================
  // UPDATE COREAR LOCATION
  // ===============================
  async updateLocation(id: number, lat: number, lng: number) {
    try {
      // 1️⃣ Fetch corear
      const corear = await this.corearRepo.findOne({
        where: { id },
      });

      // 2️⃣ Validate existence
      if (!corear) {
        throw new BadRequestException('Corear not found');
      }

      // 3️⃣ Update location
      corear.lat = lat;
      corear.lng = lng;

      // 4️⃣ Save corear
      return await this.corearRepo.save(corear);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error('Update corear location error:', error);
      throw new InternalServerErrorException(
        'Failed to update corear location',
      );
    }
  }

  // ===============================
  // FIND ALL COREARS
  // ===============================
  async findAll() {
    try {
      // 1️⃣ Fetch all corears
      return await this.corearRepo.find();
    } catch (error) {
      console.error('Find all corears error:', error);
      throw new InternalServerErrorException('Failed to fetch corears');
    }
  }
}
