import client, { CommonAPI } from './request';

export type ReleasePostReq = {
    creator: string;
    username: string;
    title: string;
    context: string;
    img?: any;
    description?: string;
}
// 发布帖子
export const ReleasePost = async (data: ReleasePostReq): Promise<CommonAPI> => {
    const res = await client.post({
        url: '/release',
        data
    });
    return res.data;
};

export type FocusReleaseReq = {
    username: string;
    releaseId: number;
}

// 对文章点赞
export const focusRelease = async (data: FocusReleaseReq): Promise<CommonAPI> => {
    const res = await client.get({
        url: 'focus',
        data,
    });
    return res.data;
}
