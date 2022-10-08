import { PlusOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';
import React, { FC } from 'react';
import Logo from './logo.png';
import '../index.scss';

const Header: FC = () => (
    <div className='header'>
        <Space>
            <img src={Logo} className='logo' />
            <span>论坛</span>
        </Space>
        <Space>
            <Button icon={<PlusOutlined />} type='primary' className='release'>发表</Button>
            <Button className='login'>登陆</Button>
        </Space>
    </div>
);

export default Header;
