import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repositoty';
import { createUserDTO } from './dto/create.user.dto';
import UserEntity from './entity/User.entity';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setName(UserService.name);
  }
  async create(userDTO: createUserDTO): Promise<UserEntity | string> {
    try {
      const stat = this.userRepository.validateEntity(userDTO);
      if (!stat) return 'either the email or phone number must be written';
      const result = await this.userRepository.create(stat);
      return JSON.parse(result);
    } catch (error) {
      this.loggerService.error(
        userDTO,
        typeof error === 'string' ? error : error?.message?.toString(),
        error?.toString(),
      );
      return typeof error === 'string' ? JSON.parse(error).message : error.message;
    }
  }
  async get(): Promise<UserEntity[] | string> {
    try {
      const result = await this.userRepository.getAll();
      return JSON.parse(result);
    } catch (error) {
      this.loggerService.error(
        'get all without DTO',
        typeof error === 'string' ? error : error?.message?.toString(),
        error?.toString(),
      );
      return typeof error === 'string' ? JSON.parse(error).message : error.message;
    }
  }
}
