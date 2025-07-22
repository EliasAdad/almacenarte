import { File } from 'src/modules/files/file.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'cursos' })
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'varchar' })
  duration: string;

  @Column({
    type: 'varchar',
    default:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png',
  })
  imgUrl?: string;

  @Column({ type: 'int' })
  cupos: number;

  @ManyToOne(() => User, (user) => user.courses)
  @JoinColumn({ name: 'user_id' })
  users: User[];

  @OneToMany(() => File, (file) => file.course, { onDelete: 'CASCADE' })
  files: File[];
}
