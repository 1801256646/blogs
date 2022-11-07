import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16, charset: 'utf8mb4' })
  username: string;

  @Column({ length: 16, charset: 'utf8mb4' })
  password: string;
}
