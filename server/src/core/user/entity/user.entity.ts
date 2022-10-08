import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  username: string;

  @Column({ length: 16 })
  password: string;

  @Column({ length: 11 })
  mobliePhone: string;
}
