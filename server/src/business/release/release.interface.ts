import { ReleaseStatus } from '@/common/enum/release';
import { Review } from '@/basic/review/entity/review.entity';

export interface ReleaseDto {
  creator: string;

  title: string;

  description?: string;

  img?: string[];

  content: string;
}

export interface ApproverDto {
  id: number;

  status: ReleaseStatus;

  username: string;
}

export interface UpdateDto {
  status?: ReleaseStatus;

  review?: Review[];
}