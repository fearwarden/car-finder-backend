import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  register(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      ...user,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }
}
