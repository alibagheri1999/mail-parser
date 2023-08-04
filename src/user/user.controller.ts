import { Body, Controller, Get, Post, HttpException, HttpStatus,  } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDTO } from './dto/create.user.dto';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(@Body() user: createUserDTO) {
    const result = await this.userService.create(user);
    if (typeof result === 'string' || result instanceof Error) {
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    } else {
      return result;
    }
  }

  @Get('/getAll')
  async getAllUsers() {
    const result = await this.userService.get();
    if (typeof result === 'string' || result instanceof Error) {
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    } else {
      return result;
    }
  }
}
