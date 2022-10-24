import { useRequest } from 'ahooks';
import { Card, Tabs, Spin, Button, Empty } from 'antd';
import React, { FC, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getHomeList, ReleaseData } from '@/application/service/home';
import { authorList } from '@/application/service/user';
import { ReleaseOrderBy } from '@/application/enum/release';
import BodyScreen from '@/presentation/components/body-screen';
import HomeList from './components/home-list';
import Leaderboard from './components/leaderboard';
import styles from './index.module.scss';

const { TabPane } = Tabs;
const DEFAULT_PAGINATION = { page: 1, pageSize: 5 };
let tab = ReleaseOrderBy.UpdateTime;

const Home: FC = () => {
    const history = useHistory();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const urlTab = searchParams.get('tab') as ReleaseOrderBy || ReleaseOrderBy.UpdateTime;
    const [orderBy, setOrderBy] = useState(urlTab);
    const [data, setData] = useState<ReleaseData[]>([]);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const { data: listData, loading } = useRequest(() => getHomeList({
        page: pagination.page,
        pageSize: pagination.pageSize,
        orderBy: orderBy,
    }), {
        refreshDeps: [orderBy, pagination],
        onSuccess: (dataList) => {
            if (tab === orderBy) {
                setData([...data, ...dataList?.data?.list]);
            } else {
                setData(dataList?.data?.list);
                tab = orderBy;
            }
        },
    });

    const { data: authorListData, loading: authorListLoading } = useRequest(() => authorList());

    const handleTabsChange = (key: string) => {
        setOrderBy(key as ReleaseOrderBy);
        setPagination(DEFAULT_PAGINATION);
        history.push(`?tab=${key}`);
    };

    return (
        <BodyScreen>
            <Spin spinning={loading && authorListLoading}>
                <div className={styles.home}>
                    <Tabs tabPosition='left' className={styles.leftTabs} onChange={handleTabsChange} defaultActiveKey={urlTab}>
                        <TabPane key='updateTime' tab='最新发布'></TabPane>
                        <TabPane key='browse' tab='浏览量'></TabPane>
                        <TabPane key='focus' tab='关注量'></TabPane>
                    </Tabs>
                    <div className={styles.list}>
                        {
                            data?.length ? data?.map(item => (
                                <Card key={item.id} className={styles.package} onClick={() => history.push(`/detail?id=${item.id}`)}>
                                    <HomeList release={item} />
                                </Card>
                            )) : <Empty description={false} />
                        }
                        {
                            (listData?.data?.total || 0) > data.length && (
                                <Button
                                    onClick={() => setPagination({ page: pagination.page + 1, pageSize: pagination.pageSize })}
                                    loading={loading}
                                    disabled={loading}
                                    className={styles.loadingBtn}
                                    type='primary'
                                >
                                    查看更多
                                </Button>
                            )
                        }
                        
                    </div>
                    <Leaderboard list={authorListData?.data} />
                </div>
            </Spin>
        </BodyScreen>
    );
};

export default Home;
