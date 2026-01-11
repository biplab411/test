import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDto: LoginDto) {
    // Delegate login logic to UserService
    return this.userService.login(loginDto);
  }
}
