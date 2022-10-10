import request, { CommonAPI } from './request';

// 发布帖子
export const ReleasePost = async (data: any): Promise<CommonAPI> => {
    const res = await request.post('/release', data);
    return res.data;
};
