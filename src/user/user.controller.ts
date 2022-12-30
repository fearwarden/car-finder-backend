import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { BadRequestException } from '@nestjs/common/exceptions';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.register(createUserDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
