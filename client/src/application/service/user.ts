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
}

export type UpdateUserReq = Partial<UserData>;

// 登陆当前用户
export const LoginUser = async (data: LoginUserReq): Promise<CommonAPI> => {
    const res = await request.post({
        url: '/auth',
        data
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
export const getUserInfo = async (username: string): Promise<CommonAPI<UserData>> => {
    const res = await request.get({
        url: '/user/get-user',
        data: { username },
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
