import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesRepository } from './courses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { File } from '../files/file.entity';
import { FilesService } from '../files/files.service';
import { cloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from '../files/cloudinary-files.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, File])],
  controllers: [CoursesController],
  providers: [
    CoursesService,
    CoursesRepository,
    FilesService,
    cloudinaryConfig,
    CloudinaryService,
  ],
})
export class CoursesModule {}
