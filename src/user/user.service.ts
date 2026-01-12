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

  // USED BY JWT / AUTH SERVICE
  async validateUser(dto: LoginDto): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: [{ email: dto.emailPhone }, { mobile: dto.emailPhone }],
      });

      if (!user || user.isActive !== 1) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(
        dto.password,
        user.password,
      );

      if (!isPasswordValid) {
        return null;
      }

      return plainToInstance(User, user);
    } catch (error) {
      console.error('Validate user error:', error);
      throw new InternalServerErrorException('User validation failed');
    }
  }

  // USED BY LOGIN API
  async login(dto: LoginDto): Promise<{ user: User }> {
    try {
      const user = await this.validateUser(dto);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return { user };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      console.error('User login error:', error);
      throw new InternalServerErrorException('Login failed');
    }
  }
}
