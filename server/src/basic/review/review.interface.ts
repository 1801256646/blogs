export interface ReviewInterface {
  username: string;

  createTime: Date;

  text: string;

  replier?: string;

  releaseId: number;
}

export interface UpdateReview {
  childReview: any;
}
