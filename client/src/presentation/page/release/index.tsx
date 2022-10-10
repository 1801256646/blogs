import { useRequest } from 'ahooks';
import { Card, Form, Input, Button, message } from 'antd';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import BodyScreen from '@/presentation/components/body-screen';
import { getUsername } from '@/utils/auth';
import { ReleasePost } from '@/application/service/release';
import styles from './index.module.scss';

const Release: FC = () => {
    const history = useHistory();
    const { loading, run } = useRequest(ReleasePost, {
        manual: true,
        onSuccess: () => {
            message.success('发布成功!');
            setTimeout(() => history.push('/'), 1000);
        }
    })

    const handleFinish = (value: Record<string, string>) => {
        run({
            ...value,
            creator: getUsername(),
        })
    }

    return (
        <BodyScreen>
            <Card title='发布帖子' className={styles.release}>
                <Form wrapperCol={{ span: 18 }} labelCol={{ span: 3 }} onFinish={handleFinish}>
                    <Form.Item label='标题' name='title' rules={[{ required: true, message: '标题不能为空' }]}>
                        <Input placeholder='请输入标题' />
                    </Form.Item>
                    <Form.Item label='简介' name='description'>
                        <Input placeholder='请输入简介' />
                    </Form.Item>
                    <Form.Item label='内容' name='content' rules={[{ required: true, message: '标题不能为空' }]}>
                        <Input.TextArea placeholder='请输入简介' showCount autoSize={{ minRows: 15 }} />
                    </Form.Item>
                    <Button type='primary' htmlType='submit' className={styles.releaseBtn} loading={loading}>发布</Button>
                </Form>
            </Card>
        </BodyScreen>
    );
};

export default Release;
