import client, { CommonAPI } from './request';
import { ReleaseOrderBy } from '@/application/enum/release';
import { UserData } from './user';

export type getHomeListReq = {
    page: number;
    pageSize: number;
    orderBy?: ReleaseOrderBy;
}
export type getHomeListRes = {
    total: number;
    list: ReleaseData[];
}

export type ReleaseData = {
    id: number;
    title: string;
    description: string;
    content: string;
    createTime: string;
    updateTime: string;
    creator: string;
    focus: number;
    browse: number;
    review: ReviewData[];
    img?: string[];
    user?: UserData;
}

export type ReviewData = {
    id: number;
    username: string;
    text: string;
    createTime: string;
    childReview: ReplyData[];
    user?: UserData;
}

export type ReplyData = ReviewData & {
    replier?: string;
}

// 发布帖子
export const getHomeList = async (data: getHomeListReq): Promise<CommonAPI<getHomeListRes>> => {
    const res = await client.get({
        url: '/trending',
        data,
    });
    return res.data;
};
