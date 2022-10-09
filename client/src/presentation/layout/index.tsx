import { Layout } from 'antd'
import React, { FC } from 'react';
import AppHeader from './header';
import styles from './index.module.scss';

export interface AppLayoutProps {
    component: any;
}

const { Header, Footer, Content } = Layout;

const AppLayout: FC<AppLayoutProps> = (props) => {
    const { component: Component } = props;

    return (
        <Layout className={styles.layout}>
            <Header><AppHeader /></Header>
            <Content><Component /></Content>
            <Footer>footer</Footer>
        </Layout>
    );
};

export default AppLayout;
