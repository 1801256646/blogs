import { CreateUser } from '../user/user.interface';

export type LoginUser = Omit<CreateUser, 'mobliePhone'>;

export type UpdateUser = LoginUser & {
  oldPassword: string;
};
