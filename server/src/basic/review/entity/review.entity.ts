import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Reply } from '@/basic/reply/entity/reply.entity';
import { Release } from '@/basic/release/entity/release.entity';
import { User } from '@/core/user/entity/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ comment: '评论', charset: 'utf8mb4' })
  text: string;

  @OneToMany(() => Reply, (entity) => entity.childReview)
  @JoinColumn({ name: 'child_review_id' })
  childReview?: Reply[];

  @Column({ name: 'create_time' })
  createTime: Date;

  @ManyToOne(() => Release, (entity) => entity.review)
  release: Release;

  @ManyToOne(() => User, (user) => user.review)
  user: User;
}
