import { Body, Controller, Post, Get } from '@nestjs/common';
import { ICreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUser: ICreateUserDto) {
    return this.userService.create(createUser);
  }

  @Get()
  async getAll() {
    return this.userService.getAll();
  }
}
