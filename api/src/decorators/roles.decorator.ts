import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/modules/auth/enums/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
