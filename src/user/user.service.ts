// src/user/user.service.ts
import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { User } from './entity/user.entity';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(dto: LoginDto): Promise<{ user: User }> {
    try {
      // 1️⃣ Fetch user using email OR mobile
      const user = await this.userRepository.findOne({
        where: [{ email: dto.emailPhone }, { mobile: dto.emailPhone }],
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // 2️⃣ Validate user account status
      if (user.isActive !== 1) {
        throw new UnauthorizedException('User account is deactivated');
      }

      // 3️⃣ Validate password
      const isPasswordValid = await bcrypt.compare(
        dto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // 4️⃣ Return sanitized user entity
      return {
        user: plainToInstance(User, user),
      };
    } catch (error) {
      // 5️⃣ Handle known exceptions
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      console.error('User login error:', error);
      throw new InternalServerErrorException('Login failed');
    }
  }
}
