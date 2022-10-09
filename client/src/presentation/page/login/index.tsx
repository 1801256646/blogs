import { useRequest } from 'ahooks';
import { Card, Form, Input, Button, message } from 'antd';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { rule } from '@/types/user';
import { LoginUser } from '@/application/service/user';
import styles from './index.module.scss';

const Login: FC = () => {
    const [form] = Form.useForm();
    const history = useHistory();

    const { loading, run, error } = useRequest(
        LoginUser,
        {
            manual: true,
            onSuccess: (data) => {
                if (data?.code === 0) {
                    setTimeout(() => {
                        history.push('/');
                    }, 1000);
                } else {
                    message.error(error?.message);
                } 
            },
            onError: (error) => {
                message.error(error?.message);
            },
        }
    )
    const handleFinish = async (value: Record<string, string>) => { 
        const { username, password } = value;
        run({
            username,
            password,
        });
    };
    console.log(styles);

    return (
        <Card title='登陆' className={styles.loginCard}>
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} onFinish={handleFinish} form={form}>
                <Form.Item label='用户名' name='username' rules={rule.username}>
                    <Input placeholder='请输入用户名' />
                </Form.Item>
                <Form.Item label='密码' name='password' rules={rule.password}>
                    <Input.Password placeholder='请输入密码' />
                </Form.Item>
                <div className={styles.submitBtn}>
                    <Button type='primary' htmlType='submit' loading={loading}>登陆</Button>
                    <Button type='link' onClick={() => history.push('/register')}>没有账号？点击这里去注册&gt;&gt;</Button>
                </div>
            </Form>
        </Card>
    )
};

export default Login;
