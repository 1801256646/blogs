import React, { FC } from 'react';
import BodyScreen from '@/presentation/components/body-screen';
import HomeList from './components/home-list';
import Leaderboard from './components/leaderboard';
import HomeTabs from './components/home-tabs';
import styles from './index.module.scss';

const Home: FC = () => {

    return (
        <BodyScreen>
            <div className={styles.home}>
                <HomeTabs />
                <HomeList />
                <Leaderboard />
            </div>
        </BodyScreen>
    );
};

export default Home;
