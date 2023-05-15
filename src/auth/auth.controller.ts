import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { IReturnLoginDto } from './dtos/ReturnLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() loginDto: LoginDto): Promise<IReturnLoginDto> {
    return this.authService.login(loginDto);
  }
}
