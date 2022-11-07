import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Approver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '审核人', charset: 'utf8mb4' })
  owner: string;
}
