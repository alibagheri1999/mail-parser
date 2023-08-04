/*eslint-disable*/
import { createUserDTO } from "../dto/create.user.dto";
import UserEntity from '../entity/User.entity';

export interface IUserRepository<T> {
  create<T>(data:T) : Promise<string>
  getAll() : Promise<string>
  validateEntity(user: createUserDTO): UserEntity | boolean
}
