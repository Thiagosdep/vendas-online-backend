import { ReturnUserDto } from '../../user/dtos/returnUser.dto';

export interface IReturnLoginDto {
  user: ReturnUserDto;
  accessToken: string;
}
