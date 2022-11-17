import { ReleaseData, ReviewData, ReplyData } from './home';
import request, { CommonAPI } from './request';

export interface LoginUserReq {
    username: string;
    password: string;
}

export type RegisterUserReq = LoginUserReq & {
    cname: string;
}

export type UserData = {
    username: string;
    cname: string;
    id: number;
    createTime: string;
    focus: string[];
    collection: number[];
    avatar: string;
    description: string;
    password: string;
    release?: ReleaseData[];
    review?: ReviewData[];
    reply?: ReplyData[];
    userFanc: string[];
    userFocus: string[];
    gitAddress?: string;
    admin?: number;
}

export type UpdateUserReq = Partial<UserData>;

export type FocusUserReq = {
    userId: string;
    userFocus: string;
}

export type GetIdsUserReq = {
    users: string[];
}

export type GetIdsUserRes = {
    total: number;
    list: UserData[];
}

export type GetAllUserReq = {
    page: number;
    pageSize: number;
}

export type GetAllUserRes = GetIdsUserRes;

// 登录当前用户
export const LoginUser = async (data: LoginUserReq): Promise<CommonAPI<{ user: UserData, token: string }>> => {
  const res = await request.post({
    url: '/auth',
    data
  });
  return res.data;
};

// 获取当前用户信息
export const getCurrentUser = async (): Promise<CommonAPI<UserData>> => {
  const res = await request.get({
    url: '/auth',
  });
  return res.data;
};

// 注册
export const RegisterUser = async (data: RegisterUserReq): Promise<CommonAPI> => {
  const res = await request.post({
    url: '/user/add',
    data
  });
  return res.data;
};

// 获取用户信息
export const getUserInfo = async (id: string): Promise<CommonAPI<UserData>> => {
  const res = await request.get({
    url: '/user/get-user',
    data: { id },
  });
  return res.data;
};

// 更新用户信息
export const UpdateUser = async (data: UpdateUserReq): Promise<CommonAPI<UserData>> => {
  const res = await request.post({
    url: '/user/update',
    data,
  });
  return res.data;
};

// 关注用户
export const focusUser = async (data: FocusUserReq): Promise<CommonAPI<UserData>> => {
  const res = await request.post({
    url: '/user/focus',
    data,
  });
  return res.data;
}

// 获取3个用户信息
export const authorList = async (): Promise<CommonAPI<UserData[]>> => {
  const res = await request.get({
    url: '/user',
  });
  return res.data;
}

// 通过id获取多个用户信息
export const getIdsUser = async (users: string[]): Promise<CommonAPI<GetIdsUserRes>> => {
  const res = await request.post({
    url: '/user',
    data: { users },
  });
  return res.data;
}

// 获取所有用户信息
export const getAllUser = async (data: GetAllUserReq): Promise<CommonAPI<GetAllUserRes>> => {
  const res = await request.get({
    url: '/user/get-all',
    data,
  });
  return res.data;
}
