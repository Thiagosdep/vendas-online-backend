import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { LoginDto } from './dtos/login.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { IReturnLoginDto } from './dtos/ReturnLogin.dto';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<IReturnLoginDto> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatchPassword = await compare(
      loginDto.password,
      user?.password ?? '',
    );

    if (!user || !isMatchPassword) {
      throw new NotFoundException('invalid credentials');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
