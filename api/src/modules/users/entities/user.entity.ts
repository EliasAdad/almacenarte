import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'usuarios' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'text', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', length: 50, nullable: false })
  email: string;

  @Column({ type: 'text', length: 20, nullable: false })
  password: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'int' })
  phone: number;

  @Column({ type: 'text', length: 50 })
  country?: string;

  @Column({ type: 'text', length: 50 })
  city?: string;

  @Column({ default: true })
  isActive: boolean;
}
