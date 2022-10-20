import { PlusOutlined, FileTextOutlined, PictureOutlined } from '@ant-design/icons';
import { Space, Button, Avatar, Dropdown, Menu, Popover } from 'antd';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import useAuth from '@/presentation/store/use-auth';
import Logo from './logo.png';
import styles from '../index.module.scss';

const Header: FC = () => {
    const history = useHistory();
    const { user, isLogin } = useAuth();
    const handleRelease = (type: string) => {
        history.push(`/release?type=${type}`);
    };

    const handleOff = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('user');
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    const handleEditData = () => { 
        history.push('/user');
    };

    return (
        <div className={styles.header}>
            <Space onClick={() => history.push('/')}>
                <img src={Logo} className={styles.logo} alt='' />
                <span>论坛</span>
            </Space>

            <Space size={20}>
                <Popover placement='bottom' content={(
                    <Menu>
                        <Menu.Item onClick={() => handleRelease('tips')}><Space><PictureOutlined />发帖子</Space></Menu.Item>
                        <Menu.Item onClick={() => handleRelease('essay')}><Space><FileTextOutlined />发文章</Space></Menu.Item>
                    </Menu>
                )}>
                    <Button icon={<PlusOutlined />} className={styles.release} type='primary'>发表</Button>
                </Popover>
                {
                    isLogin
                        ? (
                            <Dropdown overlay={(
                                <Menu>
                                    <Menu.Item onClick={handleEditData}>编辑资料</Menu.Item>
                                    <Menu.Item onClick={handleOff}>退出登陆</Menu.Item>
                                </Menu>
                            )}>
                                <Avatar size={40} className={styles.avatar} src={user?.avatar}>{(user?.cname?.[0] || user?.username?.[0] || 'U').toLocaleUpperCase()}</Avatar>
                            </Dropdown>
                        )
                        : <Button className={styles.login} onClick={() => history.push('/login')}>登陆</Button>
                }
            </Space>
        </div>
    );
};

export default observer(Header);
