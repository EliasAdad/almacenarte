import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signIn(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email y contraseña son requeridos');
    }

    const user = await this.usersRepository.findByEmail(email);

    if (!user || user.password !== password) {
      throw new BadRequestException(
        'Email o contraseña inválidos, intenta de nuevo.',
      );
    }

    return {
      status: HttpStatus.OK,
      message: `Logueado exitosamente`,
      user,
    };
  }
}
