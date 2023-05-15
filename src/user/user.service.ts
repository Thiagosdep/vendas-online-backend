import * as crypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUser: CreateUserDto): Promise<UserEntity> {
    const emailAlreadyInUse = await this.findUserByEmail(
      createUser.email,
    ).catch(() => undefined);

    if (emailAlreadyInUse) {
      throw new BadRequestException('email already in use!');
    }
    // transform to a decoupled service
    const saltOrRounds = 10;
    const hashedPassword = await crypt.hash(createUser.password, saltOrRounds);

    // add validations => unique cpf
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

  async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: {
        addresses: {
          city: { state: true },
        },
      },
    });
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`userId: ${userId} not found`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`user email ${email} not found`);
    }

    return user;
  }
}
