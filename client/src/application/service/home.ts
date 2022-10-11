import client, { CommonAPI } from './request';

export type getHomeListReq = {
    page: number;
    pageSize: number;
    orderBy?: string;
}
export type getHomeListRes = {
    total: number;
    list: any;
}

// 发布帖子
export const getHomeList = async (data: getHomeListReq): Promise<CommonAPI<getHomeListRes>> => {
    const res = await client.get({
        url: '/trending',
        data,
    });
    return res.data;
};
