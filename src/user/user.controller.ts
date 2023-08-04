import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDTO } from './dto/create.user.dto';
import { LoggerService } from '../logger/logger.service';

@Controller('/api/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setName(UserController.name);
  }

  @Post('/create')
  async createUser(@Body() user: createUserDTO) {
    const result = await this.userService.create(user);
    if (typeof result === 'string' || result instanceof Error) {
      this.loggerService.error(
        user,
        typeof result === 'string' ? result : result?.message?.toString(),
        result?.toString(),
      );
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    } else {
      this.loggerService.logInfo(user, 'user added successfully');
      return result;
    }
  }

  @Get('/getAll')
  async getAllUsers() {
    const result = await this.userService.get();
    if (typeof result === 'string' || result instanceof Error) {
      this.loggerService.error(
        'get all api',
        typeof result === 'string' ? result : result?.message?.toString(),
        result?.toString(),
      );
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    } else {
      this.loggerService.logInfo('get all api', 'user added successfully');
      return result;
    }
  }
}
