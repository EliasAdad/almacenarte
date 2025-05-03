import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() {}

  findAll() {
    throw new Error('Method not implemented.');
  }

  findOne(id: string) {
    throw new Error('Method not implemented.');
  }

  create(user: any) {
    throw new Error('Method not implemented.');
  }

  remove(id: string) {}
}
