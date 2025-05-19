import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Header de autorización es requerido');
    }

    const [type, credentials] = authHeader.split(' ');

    if (type !== 'Basic' || !credentials) {
      throw new UnauthorizedException(
        'Header de autorizacion inválido, se espera que sea de tipo Basic: email:password',
      );
    }

    const [email, password] = credentials.split(':');

    if (!email || !password)
      throw new UnauthorizedException(
        'Header de autorización debe contener email y contraseña',
      );

    return true;
  }
}
