export interface ReviewInterface {
  username: string;

  createTime: Date;

  text: string;

  replier?: string;

  id: number;
}

export interface UpdateReview {
  childReview: any;
}
