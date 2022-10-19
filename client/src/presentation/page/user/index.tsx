import { useRequest } from 'ahooks';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Form, Input, message, Tabs, Upload } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import type { UploadProps } from 'antd/es/upload';
import { UpdateUser, getUserInfo } from '@/application/service/user';
import BodyScreen from '@/presentation/components/body-screen';
import { getUser } from '@/utils/user';
import styles from './index.module.scss';

const { TabPane } = Tabs;

const User: FC = () => {
    const user = getUser();
    const [form] = Form.useForm();
    const [userForm] = Form.useForm();
    const [fileUrl, setFileUrl] = useState<string>('');

    const { run: updateUserRun, loading } = useRequest(UpdateUser, {
        manual: true,
        onSuccess: () => {
            message.success('修改成功');
        },
    });

    const { data } = useRequest(() => getUserInfo(user.username), {
       ready: !!user.username,
    });

    const handleChange: UploadProps['onChange'] = (info) => { 
        if (info.file.status === 'done') {
            setFileUrl(info.file.response.url);
            console.log(info.file.response.url);
        };
    };

    const handleFinish = (value: Record<string, string>) => {
        const { cname, description } = value;
        updateUserRun({
            username: user.username,
            cname,
            description,
            avatar: fileUrl,
        });
    };

    const handleUserFinish = (value: Record<string, string>) => {
        const { username, password } = value;
        updateUserRun({
            password,
            username,
        });
    };

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data?.data,
             })
            setFileUrl(data?.data?.avatar);
            userForm.setFieldsValue({
                username: data?.data?.username,
            });
        };
    }, [data]);

    return (
        <BodyScreen className={styles.user}>
            <Tabs tabPosition='left'>
                <TabPane tab='个人资料' key='info'>
                    <Card title='个人资料'>
                        <Form
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 18 }}
                            form={form}
                            onFinish={handleFinish}
                        >
                            <Form.Item label='头像'>
                                <Upload
                                    action={`${window.location.origin}/api/upload`}
                                    accept='.png, .webp, .jpg, .gif, .jpeg'
                                    onChange={handleChange}
                                >
                                    <Avatar size={180} src={fileUrl} icon={<UserOutlined />} />
                                </Upload>
                            </Form.Item>
                            <Form.Item label='昵称' name='cname'>
                                <Input placeholder='请输入昵称' />
                            </Form.Item>
                            <Form.Item label='个人签名' name='description'>
                                <Input.TextArea placeholder='请输入个人签名' />
                            </Form.Item>
                            <Form.Item label='个人主页' name='gitAddress'>
                                <Input placeholder='请输入个人主页' />
                            </Form.Item>
                            <Button type='primary' htmlType='submit' className={styles.submitBtn} loading={loading}>保存</Button>
                        </Form>
                    </Card>
                </TabPane>
                <TabPane tab='账号信息' key='user'>
                    <Card title='账号信息'>
                        <Form
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 18 }}
                            form={userForm}
                            onFinish={handleUserFinish}
                        >
                            <Form.Item name='username' label='用户名'>
                                <Input placeholder='请输入用户名' disabled />
                            </Form.Item>
                            <Form.Item name='password' label='密码'>
                                <Input.Password placeholder='请输入密码'/>
                            </Form.Item>
                            <Button type='primary' htmlType='submit' className={styles.submitBtn} loading={loading}>保存</Button>
                        </Form>
                    </Card>
                </TabPane>
            </Tabs>
        </BodyScreen>
    );
};

export default User;
