import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';
import { Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class FilesService {
  // This service will handle file-related operations
  // such as uploading, deleting, and retrieving files.
  // Implementation details will be added later.
  constructor(
    @InjectRepository(File) private filesRepository: Repository<File>,
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
}
