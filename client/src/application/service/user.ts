import request, { CommonAPI } from './request';

export interface LoginUserReq {
    username: string;
    password: string;
}

export type RegisterUserReq = LoginUserReq & {
    cname: string;
}

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
