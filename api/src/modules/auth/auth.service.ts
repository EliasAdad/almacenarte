import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto) {
    const foundUser = await this.usersService.findByEmail(user.email);

    if (foundUser)
      throw new BadRequestException(
        'El email ya se encuentra registrado, intenta con uno nuevo.',
      );

    const hashPw = await bcrypt.hash(user.password, 10);

    const newUser = await this.usersService.create({
      ...user,
      password: hashPw,
    });

    return newUser;
  }

  async signIn(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email y contraseña son requeridos');
    }

    const user = await this.usersService.findByEmail(email);

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const isValidPw = await bcrypt.compare(password, user.password);

    if (!isValidPw) {
      throw new BadRequestException(
        'Email o contraseña inválidos, intenta de nuevo.',
      );
    }

    const payload = {
      sub: user.id,
      email: user.id,
    };

    const token = this.jwtService.sign(payload);

    return {
      status: HttpStatus.OK,
      message: `Logueado exitosamente`,
      token,
    };
  }
}
