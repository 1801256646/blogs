import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  username: string;

  @Column({ length: 16 })
  password: string;

  @Column({ length: 16 })
  cname: string;

  @Column({ name: 'create_time', nullable: true })
  createTime: Date;
}
