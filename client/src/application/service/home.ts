import { ReleaseOrderBy } from '@/application/enum/release';
import { ReleaseType, ReleaseStatus } from '@/application/enum/release';
import client, { CommonAPI } from './request';
import { UserData } from './user';

export type getHomeListReq = {
    page: number;
    pageSize: number;
    orderBy?: ReleaseOrderBy;
    username?: string;
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
    type: ReleaseType;
    status?: ReleaseStatus;
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
