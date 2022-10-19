import { useRequest } from 'ahooks';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Form, Input, Button, message, Upload, UploadFile } from 'antd';
import type { UploadProps } from 'antd/es/upload';
import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BodyScreen from '@/presentation/components/body-screen';
import { getUsername } from '@/utils/user';
import { ReleasePost, ReleasePostReq } from '@/application/service/release';
import styles from './index.module.scss';

const Release: FC = () => {
    const history = useHistory();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { loading, run } = useRequest(ReleasePost, {
        manual: true,
        onSuccess: () => {
            message.success('发布成功!');
            setTimeout(() => history.push('/'), 1000);
        },
    });

    const handleFinish = (value: ReleasePostReq) => {
        run({
            ...value,
            creator: getUsername() || '',
            img: fileList.map(item => item.response.url),
        });
    };

    const handleChange: UploadProps['onChange'] = (info) => {
        setFileList(info.fileList);
    };

    useEffect(() => {
        if (!getUsername()) {
            message.info('请先登陆');
            setTimeout(() => {
                history.push('/login');
            }, 1000);
        };
    }, []);

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
                    <Form.Item label='内容' name='content'>
                        <Input.TextArea placeholder='请输入简介' showCount autoSize={{ minRows: 15 }} />
                    </Form.Item>
                    <Form.Item label='图片'>
                        <Upload
                            action={`${window.location.origin}/api/upload`}
                            accept='.png, .webp, .jpg, .gif, .jpeg'
                            onChange={handleChange}
                            fileList={fileList}
                            listType="picture-card"
                        >
                            { fileList.length < 5 && <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div> }
                        </Upload>
                    </Form.Item>
                    <Button type='primary' htmlType='submit' className={styles.releaseBtn} loading={loading}>发布</Button>
                </Form>
            </Card>
        </BodyScreen>
    );
};

export default Release;
