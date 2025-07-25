import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { CloudinaryService } from './cloudinary-files.service';
import { cloudinaryConfig } from 'src/config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../courses/entities/course.entity';
import { File } from './file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, File])],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryService, cloudinaryConfig],
  exports: [],
})
export class FilesModule {}
