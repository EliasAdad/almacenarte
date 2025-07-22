import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll(page: number, limit: number) {
    return this.usersRepository.findAll(page, limit);
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  create(user: CreateUserDto) {
    return this.usersRepository.create(user);
  }

  update(userId: string, data: UpdateUserDto) {
    return this.usersRepository.update(userId, data);
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }
}
