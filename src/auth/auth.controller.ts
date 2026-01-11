import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.userService.login(loginDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: result,
    };
  }
}
