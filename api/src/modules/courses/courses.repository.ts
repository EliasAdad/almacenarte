import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectRepository(Course) private coursesRepository: Repository<Course>,
  ) {}

  private courses = [
    {
      id: 1,
      name: 'Introducción a JavaScript',
      description:
        'Aprendé los fundamentos del lenguaje más popular para la web.',
      price: 12000,
      duration: '4 semanas',
      imgUrl: 'https://example.com/js-course.jpg',
      cupos: 25,
    },
    {
      id: 2,
      name: 'Desarrollo Backend con Node.js',
      description: 'Construí servidores y APIs con Node.js y Express.',
      price: 15000,
      duration: '6 semanas',
      imgUrl: 'https://example.com/node-course.jpg',
      cupos: 20,
    },
    {
      id: 3,
      name: 'Frontend Avanzado con React',
      description: 'Dominá React, hooks, context y buenas prácticas.',
      price: 18000,
      duration: '8 semanas',
      imgUrl: 'https://example.com/react-course.jpg',
      cupos: 15,
    },
    {
      id: 4,
      name: 'Base de Datos con PostgreSQL',
      description: 'Modelá, consultá y optimizá bases de datos relacionales.',
      price: 13000,
      duration: '5 semanas',
      imgUrl: 'https://example.com/postgres-course.jpg',
      cupos: 18,
    },
    {
      id: 5,
      name: 'Docker y DevOps para principiantes',
      description: 'Automatizá y desplegá tus proyectos usando Docker.',
      price: 16000,
      duration: '4 semanas',
      imgUrl: 'https://example.com/docker-course.jpg',
      cupos: 10,
    },
  ];

  async findAll(page: number = 1, limit: number = 5) {
    const courses = await this.coursesRepository.find();

    if (!courses || courses.length === 0)
      throw new NotFoundException('No se encontraron usuarios registrados.');

    const isAvailable = courses.filter((course) => course.cupos > 0);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = isAvailable.slice(startIndex, endIndex);

    return { status: HttpStatus.OK, paginated };
  }

  async findOne(id: string) {
    const course = await this.coursesRepository.findOne({ where: { id } });

    if (!course) {
      throw new BadRequestException('ID inválido o usuario no existe');
    }

    return { status: HttpStatus.OK, course };
  }

  async create(course: CreateCourseDto) {
    const newCourse = await this.coursesRepository.save(course);

    return {
      status: HttpStatus.CREATED,
      message: 'Curso creado correctamente!',
      newCourse,
    };
  }

  async update(courseId: string, data: UpdateCourseDto) {
    const found = await this.coursesRepository.findOne({
      where: { id: courseId },
    });

    if (!found)
      throw new BadRequestException(
        'ID inválido o no existe, intenta de nuevo por favor.',
      );

    await this.coursesRepository.update(courseId, data);
    const updated = await this.coursesRepository.findOne({
      where: { id: courseId },
    });

    return {
      status: HttpStatus.OK,
      message: 'Curso actualizado exitosamente!',
      updated: updated,
    };
  }

  async remove(id: string) {
    const found = await this.coursesRepository.findOne({ where: { id } });

    if (!found) {
      throw new BadRequestException(
        'ID inválido o no existe, intenta de nuevo por favor.',
      );
    }

    await this.coursesRepository.delete(found);

    return { status: HttpStatus.OK, message: 'Curso eliminado', found };
  }
}
