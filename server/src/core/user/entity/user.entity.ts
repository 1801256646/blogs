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

  @Column({ type: 'simple-array', nullable: true })
  focus: number[];

  @Column({ type: 'simple-array', nullable: true, comment: '收藏' })
  collection: number[];
}
