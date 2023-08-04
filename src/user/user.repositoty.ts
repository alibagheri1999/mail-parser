import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from './ports/IUserRepository';
import UserEntity from './entity/User.entity';

@Injectable()
export class UserRepository implements IUserRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create<UserEntity>(user: UserEntity): Promise<string> {
    return new Promise((resolve, reject) => {
      this.userRepository
        .create(user)
        .save()
        .then((result) => {
          resolve(JSON.stringify(result));
        })
        .catch((error) => reject(JSON.stringify(error)));
    });
  }

  async getAll(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.userRepository
        .find()
        .then((result) => {
          resolve(JSON.stringify(result));
        })
        .catch((error) => reject(JSON.stringify(error)));
    });
  }
}
