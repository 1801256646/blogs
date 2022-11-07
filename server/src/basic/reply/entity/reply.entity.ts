import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Review } from '@/basic/review/entity/review.entity';
import { User } from '@/core/user/entity/user.entity';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ comment: '评论', charset: 'utf8mb4' })
  text: string;

  @Column({ name: 'create_time' })
  createTime: Date;

  @Column({ comment: '回复人', nullable: true, charset: 'utf8mb4' })
  replier: string;

  @ManyToOne(() => Review, (entity) => entity.childReview)
  childReview: Review;

  @ManyToOne(() => User, (user) => user.reply)
  user: User;
}
