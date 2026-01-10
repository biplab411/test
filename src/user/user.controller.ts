// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { UserService } from '../user/user.service';
import { LoginDto } from '../auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  // ===============================
  // LOGIN
  // ===============================
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.userService.login(loginDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: result,
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      console.error('AuthController login error:', error);
      throw new InternalServerErrorException('Login failed');
    }
  }
}
