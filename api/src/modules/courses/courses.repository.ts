import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesRepository {
  constructor() {}

  private courses: Course[] = [
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

  async findAll() {
    const courses = this.courses;

    if (!courses || courses.length === 0)
      throw new NotFoundException('No se encontraron usuarios registrados.');

    return courses;
  }

  async findOne(id: number) {
    const course = this.courses.find((course) => course.id === id);

    if (!course) throw new NotFoundException('ID inválido o usuario no existe');

    return course;
  }

  async create(course: CreateCourseDto) {
    const id = this.courses.length + 1;
    const newCourse = { id, ...course };

    this.courses = [...this.courses, newCourse];

    return { message: 'Curso creado correctamente!', newCourse };
  }

  async update(courseId: number, data: UpdateCourseDto) {
    const courseIndex = this.courses.findIndex(
      (course) => courseId === course.id,
    );

    if (courseIndex === -1)
      throw new NotFoundException('ID inválido o curso no existe');

    this.courses[courseIndex] = { ...this.courses[courseIndex], ...data };

    return {
      message: 'Curso actualizado exitosamente!',
      updated: this.courses[courseIndex],
    };
  }

  async remove(id: number) {
    const index = this.courses.findIndex((course) => course.id === id);

    if (index === -1)
      throw new NotFoundException('ID inválido o el curso no existe');

    const [deleted] = this.courses.splice(index, 1);

    return { message: 'Curso eliminado', deleted };
  }
}
