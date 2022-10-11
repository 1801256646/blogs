import { PlusOutlined } from '@ant-design/icons';
import { Space, Button, Avatar, Dropdown, Menu } from 'antd';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { isLogin, getUsername } from '@/utils/user';
import Logo from './logo.png';
import styles from '../index.module.scss';

const Header: FC = () => {
    const history = useHistory();
    const handleRelease = () => {
        history.push('/release');
    };

    const handleOff = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    return (
        <div className={styles.header}>
            <Space onClick={() => history.push('/')}>
                <img src={Logo} className={styles.logo} alt='' />
                <span>论坛</span>
            </Space>

            <Space size={20}>
                <Button icon={<PlusOutlined />}  className={styles.release} onClick={handleRelease}>发表</Button>
                {
                    isLogin()
                        ? (
                            <Dropdown overlay={(
                                <Menu>
                                    <Menu.Item onClick={handleOff}>退出登陆</Menu.Item>
                                </Menu>
                            )}>
                                <Avatar size={40} className={styles.avatar}>{(getUsername()?.[0] || 'U').toLocaleUpperCase()}</Avatar>
                        </Dropdown>
                        )
                        : <Button className={styles.login} onClick={() => history.push('/login')}>登陆</Button>
                }
            </Space>
        </div>
    );
};

export default Header;
