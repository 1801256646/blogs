import { Layout } from 'antd'
import React, { FC } from 'react';
import AppHeader from './header';

export interface AppLayoutProps {
    component: any;
}

const { Header, Footer, Content } = Layout;

const AppLayout: FC<AppLayoutProps> = (props) => {
    const { component: Component } = props;

    return (
        <Layout className='layout'>
            <Header><AppHeader /></Header>
            <Content><Component /></Content>
            <Footer>footer</Footer>
        </Layout>
    );
};

export default AppLayout;
