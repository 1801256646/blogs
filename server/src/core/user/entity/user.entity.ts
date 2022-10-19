import { Release } from '@/basic/release/entity/release.entity';
import { Reply } from '@/basic/reply/entity/reply.entity';
import { Review } from '@/basic/review/entity/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @Column({
    comment: '简介',
    default: '这家伙很懒，啥也没留下。',
    nullable: true,
  })
  description: string;

  @Column({ comment: '头像', nullable: true })
  avatar: string;

  @OneToMany(() => Release, (release) => release.user)
  release: Release[];

  @OneToMany(() => Review, (review) => review.user)
  review: Review[];

  @OneToMany(() => Reply, (reply) => reply.user)
  reply: Reply[];
}
