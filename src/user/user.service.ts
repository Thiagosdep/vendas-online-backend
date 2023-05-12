import * as crypt from 'bcrypt';

import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';
import { ICreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  async create(createUser: ICreateUserDto): Promise<User> {
    // transform to a decoupled service
    const saltOrRounds = 10;
    const hashedPassword = await crypt.hash(createUser.password, saltOrRounds);

    // add validations => unique cpf and email
    //                 => strong password
    const user: User = {
      ...createUser,
      id: randomUUID(),
      password: hashedPassword,
    };

    this.users.push(user);

    return user;
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }
}
