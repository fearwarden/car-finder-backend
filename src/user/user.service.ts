import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(user: CreateUserDto): Promise<User> {
    if (await this.userRepository.findBy({ email: user.email })) {
      throw new ConflictException('User already exist');
    }
    const newUser = this.userRepository.create({
      ...user,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }
}
