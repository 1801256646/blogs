import React, { FC } from 'react';
import { Card } from 'antd';
import { useRequest } from 'ahooks';
import { useHistory } from 'react-router-dom';
import { getHomeList } from '@/application/service/home';
import BodyScreen from '@/presentation/components/body-screen';
import HomeList from './components/home-list';
import Leaderboard from './components/leaderboard';
import HomeTabs from './components/home-tabs';
import styles from './index.module.scss';

const Home: FC = () => {
    const history = useHistory();
    const { data } = useRequest(() => getHomeList({
        page: 1,
        pageSize: 1000,
    }))

    return (
        <BodyScreen>
            <div className={styles.home}>
                <HomeTabs />
                <div className={styles.list}>
                    {data?.data?.list.map(item => (
                        <Card key={item.id} className={styles.package} onClick={() => history.push(`/detail?id=${item.id}`)}>
                            <HomeList release={item} />
                        </Card>
                    ))}
                </div>
                <Leaderboard />
            </div>
        </BodyScreen>
    );
};

export default Home;
