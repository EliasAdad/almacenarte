import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor() {}

  private users: User[] = [
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password123',
      address: '123 Main St',
      phone: '+1 555-1234',
      country: 'USA',
      city: 'New York',
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'securepass',
      address: '456 Elm St',
      phone: '+44 20 7946 0958',
      country: 'UK',
      city: 'London',
    },
    {
      id: 3,
      email: 'carlos.mendez@example.com',
      name: 'Carlos Mendez',
      password: 'abc123',
      address: 'Av. Siempre Viva 742',
      phone: '+54 11 2345 6789',
      country: 'Argentina',
      city: 'Buenos Aires',
    },
    {
      id: 4,
      email: 'li.wei@example.com',
      name: 'Li Wei',
      password: 'mypassword',
      address: '789 Lotus Rd',
      phone: '+86 10 1234 5678',
      country: 'China',
      city: 'Beijing',
    },
    {
      id: 5,
      email: 'maria.garcia@example.com',
      name: 'María García',
      password: 'pass321',
      address: 'Calle Sol 123',
      phone: '+34 91 123 4567',
    },
  ];

  async findAll() {
    const users = this.users;

    if (!users || users.length === 0)
      throw new NotFoundException('No se encontraron usuarios registrados.');

    return users.map(({ password: _, ...rest }) => rest);
  }

  async findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('ID inválido o usuario no existe');

    const { password: _, ...rest } = user;

    return rest;
  }

  async create(user: CreateUserDto) {
    const id = this.users.length + 1;
    const newUser = { id, ...user };

    this.users = [...this.users, newUser];

    const { password: _, ...rest } = newUser;

    return rest;
  }

  async update(userId: number, data: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => userId === user.id);

    if (userIndex === -1)
      throw new NotFoundException('ID inválido o usuario no existe');

    this.users[userIndex] = { ...this.users[userIndex], ...data };

    const { password: _, ...rest } = this.users[userIndex];
    return {
      message: 'Usuario actualizado exitosamente!',
      user: rest,
    };
  }

  async remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1)
      throw new NotFoundException('ID inválido o usuario no existe');

    const [deleted] = this.users.splice(index, 1);

    return { message: 'Usuario eliminado', deleted };
  }
}
