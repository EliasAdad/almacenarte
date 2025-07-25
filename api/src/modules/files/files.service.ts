import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';
import { Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';
import { CloudinaryService } from './cloudinary-files.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private filesRepository: Repository<File>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async saveFile({
    name,
    mimeType,
    data,
    course,
  }: {
    name: string;
    mimeType: string;
    data: Buffer;
    course: Course;
  }) {
    const file = new File();
    file.name = name;
    file.mimeType = mimeType;
    file.data = data;
    file.course = course;

    return this.filesRepository.save(file);
  }

  async uploadImage(file: Express.Multer.File, id: string) {
    try {
      const course = await this.courseRepository.findOne({ where: { id } });
      if (!course) {
        throw new NotFoundException('ID incorrecto o el curso no existe');
      }

      const upload = await this.cloudinaryService.uploadImage(file);
      await this.courseRepository.update(id, { imgUrl: upload.secure_url });

      const uploaded = await this.courseRepository.findOne({ where: { id } });
      return {
        message: 'Archivo subido exitosamente!',
        uploaded,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
