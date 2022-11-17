import { useRequest } from 'ahooks';
import { Card, Form, Input, Button, message } from 'antd';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { RegisterUser } from '@/application/service/user';
import { rule } from '@/types/user';
import styles from './index.module.scss';

const Register: FC = () => {
  const history = useHistory();

  const { loading, run, error } = useRequest(RegisterUser, {
    manual: true,
    onSuccess: (data) => {
      if (data?.code === 0) {
        message.success('注册成功！');
        setTimeout(() => {
          history.push('/login');
        }, 1000);
      } else {
        message.error(error?.message);
      } 
    },
    onError: (error) => {
      message.error(error?.message);
    },
  })
  const handleFinish = (value: Record<string, string>) => {
    const { username, cname, password, confirmPassword } = value;
    if (password === confirmPassword) {
      run({
        username, 
        cname,
        password,
      })
    } else {
      message.error('密码不一致');
    }
  };

  return (
    <Card title='注册' className={styles.loginCard}>
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} onFinish={handleFinish}>
        <Form.Item label='昵称' name='cname' rules={rule.cname}>
          <Input placeholder='请输入昵称'/>
        </Form.Item>
        <Form.Item label='用户名' name='username' rules={rule.username}>
          <Input placeholder='请输入用户名'/>
        </Form.Item>
        <Form.Item label='密码' name='password' rules={rule.password}>
          <Input.Password placeholder='请输入密码'/>
        </Form.Item>
        <Form.Item label='确认密码' name='confirmPassword' rules={rule.password}>
          <Input.Password placeholder='请再次输入密码'/>
        </Form.Item>
        <div className={styles.submitBtn}>
          <Button type='primary' htmlType='submit' loading={loading}>注册</Button>
          <Button type='link' onClick={() => history.push('/login')}>已有账号？前往登录&gt;&gt;</Button>
        </div>
      </Form>
    </Card>
  );
};

export default Register;
