import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enums/userType.enum';

export const userEntityMock: UserEntity = {
  cpf: '44444444498',
  createdAt: new Date(),
  deletedAt: null,
  email: 'user@email.com',
  id: 1,
  name: 'User Name',
  password: 'password',
  phone: '11999887766',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
