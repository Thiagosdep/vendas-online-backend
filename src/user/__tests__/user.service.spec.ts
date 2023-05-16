import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUser.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in user in findUserByEmail when not found user', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = service.findUserByEmail(userEntityMock.email);

    expect(user).rejects.toThrowError();
  });

  it('should return error in user in findUserByEmail when has error in db', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    const user = service.findUserByEmail(userEntityMock.email);

    expect(user).rejects.toThrowError();
  });

  it('should return user in findUserById', async () => {
    const user = await service.findUserById(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in user in findUserById when not found user', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = service.findUserById(userEntityMock.id);

    expect(user).rejects.toThrowError();
  });

  it('should return error in user in findUserById when has error in db', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    const user = service.findUserById(userEntityMock.id);

    expect(user).rejects.toThrowError();
  });

  it('should return user in getUserByIdUsingRelations', async () => {
    const user = await service.getUserByIdUsingRelations(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error if user exists', async () => {
    expect(service.create(createUserMock)).rejects.toThrowError();
  });

  it('should return user if user not exists', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = await service.create(createUserMock);
    expect(user).toEqual(userEntityMock);
  });
});
