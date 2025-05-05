import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  create(user: any) {
    return this.usersRepository.create(user);
  }

  remove(id: number) {
    return this.usersRepository.remove(id);
  }
}
