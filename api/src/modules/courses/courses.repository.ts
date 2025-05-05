import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesRepository {
  constructor() {}

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
}
