import { useRequest } from 'ahooks';
import { Card, Tabs, Spin } from 'antd';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getHomeList } from '@/application/service/home';
import { ReleaseOrderBy } from '@/application/enum/release';
import BodyScreen from '@/presentation/components/body-screen';
import HomeList from './components/home-list';
import Leaderboard from './components/leaderboard';
import styles from './index.module.scss';

const { TabPane } = Tabs;
const Home: FC = () => {
    const history = useHistory();
    const [orderBy, setOrderBy] = useState(ReleaseOrderBy.UpdateTime);
    const { data, loading } = useRequest(() => getHomeList({
        page: 1,
        pageSize: 1000,
        orderBy: orderBy,
    }), { refreshDeps: [orderBy] });

    const handleTabsChange = (key: string) => {
        setOrderBy(key as ReleaseOrderBy);
    };

    return (
        <BodyScreen>
            <Spin spinning={loading}>
                <div className={styles.home}>
                    <Tabs tabPosition='left' className={styles.leftTabs} onChange={handleTabsChange}>
                        <TabPane key='updateTime' tab='最新发布'></TabPane>
                        <TabPane key='browse' tab='浏览量'></TabPane>
                        <TabPane key='focus' tab='关注量'></TabPane>
                    </Tabs>
                    <div className={styles.list}>
                        {data?.data?.list.map(item => (
                            <Card key={item.id} className={styles.package} onClick={() => history.push(`/detail?id=${item.id}`)}>
                                <HomeList release={item} />
                            </Card>
                        ))}
                    </div>
                    <Leaderboard />
                </div>
            </Spin>
        </BodyScreen>
    );
};

export default Home;
