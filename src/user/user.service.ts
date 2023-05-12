import * as crypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ICreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUser: ICreateUserDto): Promise<UserEntity> {
    // transform to a decoupled service
    const saltOrRounds = 10;
    const hashedPassword = await crypt.hash(createUser.password, saltOrRounds);

    // add validations => unique cpf and email
    //                 => strong password
    return this.userRepository.save({
      ...createUser,
      typeUser: 1, // add enum
      password: hashedPassword,
    });
  }

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
