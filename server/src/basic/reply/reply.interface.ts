export interface ReplyComment {
  username: string;

  createTime: Date;

  text: string;

  replier?: string;

  reviewId: number;
}
