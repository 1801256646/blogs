import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Review } from '@/basic/review/entity/review.entity';

@Entity()
export class Release {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '发布标题' })
  title: string;

  @Column({ comment: '发布简介', nullable: true })
  description: string;

  @Column({ nullable: true, comment: '发布图片' })
  img: string;

  @Column({ nullable: true, comment: '发布内容' })
  content: string;

  @Column({ name: 'create-time', comment: '创建时间' })
  createTime: Date;

  @Column({ name: 'update-time', comment: '更新时间' })
  updateTime: Date;

  @Column({ comment: '创建人' })
  creator: string;

  @Column({ comment: '状态' })
  status: number;

  @Column({ comment: '审批人' })
  owner: string;

  @Column({ comment: '点赞量' })
  focus: number;

  @Column({ comment: '访问量' })
  browse: number;

  @OneToMany(() => Review, (entity) => entity.release)
  @JoinColumn({ name: 'revoew_id' })
  review: Review[];
}
