import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursesRepository } from './courses.repository';

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  create(createCourseDto: CreateCourseDto) {
    return this.coursesRepository.create(createCourseDto);
  }

  findAll() {
    return this.coursesRepository.findAll();
  }

  findOne(id: string) {
    return this.coursesRepository.findOne(id);
  }

  update(id: string, UpdateCourseDto: UpdateCourseDto) {
    return this.coursesRepository.update(id, UpdateCourseDto);
  }

  remove(id: string) {
    return this.coursesRepository.remove(id);
  }
}
