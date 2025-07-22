import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // private users = [
  //   {
  //     id: 1,
  //     email: 'john.doe@example.com',
  //     name: 'John Doe',
  //     password: 'password123',
  //     address: '123 Main St',
  //     phone: '+1 555-1234',
  //     country: 'USA',
  //     city: 'New York',
  //     isActive: true,
  //   },
  //   {
  //     id: 2,
  //     email: 'jane.smith@example.com',
  //     name: 'Jane Smith',
  //     password: 'securepass',
  //     address: '456 Elm St',
  //     phone: '+44 20 7946 0958',
  //     country: 'UK',
  //     city: 'London',
  //     isActive: true,
  //   },
  //   {
  //     id: 3,
  //     email: 'carlos.mendez@example.com',
  //     name: 'Carlos Mendez',
  //     password: 'abc123',
  //     address: 'Av. Siempre Viva 742',
  //     phone: '+54 11 2345 6789',
  //     country: 'Argentina',
  //     city: 'Buenos Aires',
  //     isActive: true,
  //   },
  //   {
  //     id: 4,
  //     email: 'li.wei@example.com',
  //     name: 'Li Wei',
  //     password: 'mypassword',
  //     address: '789 Lotus Rd',
  //     phone: '+86 10 1234 5678',
  //     country: 'China',
  //     city: 'Beijing',
  //     isActive: false,
  //   },
  //   {
  //     id: 5,
  //     email: 'maria.garcia@example.com',
  //     name: 'María García',
  //     password: 'pass321',
  //     address: 'Calle Sol 123',
  //     phone: '+34 91 123 4567',
  //     isActive: false,
  //   },
  // ];

  async findAll(page: number = 1, limit: number = 5) {
    const users = await this.usersRepository.find();

    if (!users || users.length === 0)
      throw new NotFoundException('No se encontraron usuarios registrados.');

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = users.slice(startIndex, endIndex);

    return paginated.map(({ password: _, ...rest }) => rest);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('ID inválido o usuario no existe');

    const { password: _, ...rest } = user;

    return {
      status: HttpStatus.OK,
      user: rest,
    };
  }

  async findByEmail(userEmail: string) {
    const user = await this.usersRepository.findOne({
      where: { email: userEmail },
    });

    if (!user)
      throw new NotFoundException(
        'Email inválido o no registrado, intente de nuevo.',
      );

    return user;
  }

  async create(user: CreateUserDto) {
    const newUser = await this.usersRepository.save(user);

    const { password: _, ...rest } = newUser;

    return {
      status: HttpStatus.CREATED,
      message: 'Usuario creado exitosamente!',
      rest,
    };
  }

  async update(userId: string, data: UpdateUserDto) {
    const found = await this.usersRepository.findOne({ where: { id: userId } });

    if (!found)
      throw new BadRequestException(
        'Id inválido o no existe, intenta de nuevo por favor.',
      );

    await this.usersRepository.update(userId, data);
    const updated = await this.usersRepository.findOne({
      where: { id: userId },
    });

    const { password: _, ...rest } = updated;
    return {
      status: HttpStatus.OK,
      message: 'Usuario actualizado exitosamente!',
      user: rest,
    };
  }

  async remove(id: string) {
    const found = await this.usersRepository.findOne({ where: { id } });

    if (!found)
      throw new BadRequestException(
        'Id inválido o no existe, intenta de nuevo por favor.',
      );

    return {
      status: HttpStatus.OK,
      message: 'Usuario eliminado exitosamente!',
      found,
    };
  }
}
