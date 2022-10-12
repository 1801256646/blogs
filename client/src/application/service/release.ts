import client, { CommonAPI } from './request';
import { ReleaseData } from './home';
import { UserData } from './user';

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
export const focusRelease = async (data: FocusReleaseReq): Promise<CommonAPI<UserData>> => {
    const res = await client.get({
        url: '/focus',
        data,
    });
    return res.data;
}

// 获取文章详情
export const releaseDetail = async (id: string): Promise<CommonAPI<ReleaseData>> => {
    const res = await client.get({
        url: '/release',
        data: { id },
    });
    return res.data;
}

// 对文章浏览
export const browseRelease = async (id: string): Promise<CommonAPI> => {
    const res = await client.get({
        url: '/focus/browse',
        data: { id },
    });
    return res.data;
}
