import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repositoty';
import { createUserDTO } from './dto/create.user.dto';
import UserEntity from './entity/User.entity';
import userEntity from './entity/User.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  private validateEntity(user: createUserDTO): UserEntity | boolean {
    if (!user.email && !user.phone_no) return false;

    const userEntity = new UserEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.phone_no = user.phone_no;
    return userEntity;
  }
  async create(userDTO: createUserDTO): Promise<UserEntity | string> {
    try {
      const stat = this.validateEntity(userDTO);
      if (!stat) return 'either the email or phone number must be written';

      const result = await this.userRepository.create(stat);
      return JSON.parse(result);
    } catch (e) {
      return typeof e === 'string' ? JSON.parse(e).message : e.message;
    }
  }
  async get(): Promise<UserEntity[] | string> {
    try {
      const result = await this.userRepository.getAll();
      return JSON.parse(result);
    } catch (e) {
      return typeof e === 'string' ? JSON.parse(e).message : e.message;
    }
  }
}
