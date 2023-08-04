import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import UserEntity from '../entity/User.entity';
import { ApiProperty } from '@nestjs/swagger';

export class createUserDTO {
  @ApiProperty({
    type: 'string',
    example: 'ALIBAGHERI',
  })
  @IsString()
  @IsNotEmpty()
  public name: string;
  @ApiProperty({
    type: 'string',
    example: '1234',
  })
  @IsString()
  public phone_no?: string;
  @ApiProperty({
    type: 'string',
    example: 'ali@yepco.ir',
  })
  @IsEmail()
  @IsString()
  public email?: string;
}
