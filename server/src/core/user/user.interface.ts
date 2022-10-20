export interface CreateUser {
  username: string;

  password: string;

  cname: string;
}

export interface UpdateDto extends Partial<CreateUser> {
  focus?: number[];

  collection?: number[];

  description?: string;

  userFocus?: number[];

  userFanc?: number[];
}

export interface UserFocus {
  userId: number;
  userFocus: number;
}
