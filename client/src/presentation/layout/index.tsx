import { Layout } from 'antd'
import React, { FC, useEffect } from 'react';
import { LoginUser } from '@/application/service/user';
import AppHeader from './header';
import styles from './index.module.scss';

export interface AppLayoutProps {
    component: any;
}

const { Header, Footer, Content } = Layout;

const AppLayout: FC<AppLayoutProps> = (props) => {
    const { component: Component } = props;
    
    useEffect(() => {
        const username = localStorage.getItem('username');
        const loginUser = async () => {
            try {
                const { code } = await LoginUser({
                    username: username || '',
                    password: localStorage.getItem('password') || '',
                })
                if (code !== 0) {
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                    console.log(localStorage.removeItem('username'))
                }
            } catch (err) {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
            }
        };
        username && loginUser();
    }, [])
    return (
        <Layout className={styles.layout}>
            <Header><AppHeader /></Header>
            <Content><Component /></Content>
            <Footer>footer</Footer>
        </Layout>
    );
};

export default AppLayout;
