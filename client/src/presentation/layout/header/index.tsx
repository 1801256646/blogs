import { PlusOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from './logo.png';
import styles from '../index.module.scss';

const Header: FC = () => {
    const history = useHistory();
    return (
        <div className={styles.header}>
            <Space onClick={() => history.push('/')}>
                <img src={Logo} className={styles.logo} alt='' />
                <span>论坛</span>
            </Space>
            <Space>
                <Button icon={<PlusOutlined />} type='primary' className={styles.release}>发表</Button>
                <Button className={styles.login} onClick={() => history.push('/login')}>登陆</Button>
            </Space>
        </div>
    );
};

export default Header;
