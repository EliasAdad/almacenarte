import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'cursos' })
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'string', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'text' })
  duration: string;

  @Column({
    type: 'string',
    default:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png',
  })
  imgUrl?: string;

  @Column({ type: 'int' })
  cupos: number;
}
