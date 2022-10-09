import { PlusOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from './logo.png';
import '../index.scss';

const Header: FC = () => {
    const history = useHistory();
    return (
        <div className='header'>
            <Space onClick={() => history.push('/')}>
                <img src={Logo} className='logo' />
                <span>论坛</span>
            </Space>
            <Space>
                <Button icon={<PlusOutlined />} type='primary' className='release'>发表</Button>
                <Button className='login' onClick={() => history.push('/login')}>登陆</Button>
            </Space>
        </div>
    );
};

export default Header;
