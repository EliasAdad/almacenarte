import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { cloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from '../files/cloudinary-files.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    cloudinaryConfig,
    CloudinaryService,
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
