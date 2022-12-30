import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(user: CreateUserDto): Promise<User> {
    let findUser: object[];
    try {
      findUser = await this.userRepository.findBy({ email: user.email });
    } catch (error) {
      throw new InternalServerErrorException();
    }
    if (findUser.length > 0) {
      throw new ConflictException('User already exist');
    }
    const newUser = this.userRepository.create({
      ...user,
      createdAt: new Date(),
    });
    try {
      return this.userRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  deleteUser(id: string) {
    return this.userRepository.delete({ id });
  }
}
