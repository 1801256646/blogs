import { useRequest } from 'ahooks';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Form, Input, Button, message, Upload, UploadFile, Space } from 'antd';
import type { UploadProps } from 'antd/es/upload';
import React, { FC, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import BodyScreen from '@/presentation/components/body-screen';
import useAuth from '@/presentation/store/use-auth';
import { ReleasePost, ReleasePostReq } from '@/application/service/release';
import MarketDown from './components/marketdown';
import styles from './index.module.scss';

const Release: FC = () => {
    const history = useHistory();
    const location = useLocation();
    const { user, isLogin } = useAuth();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type');
    const isTips = type === 'tips';
    const title = isTips ? '发布帖子' : '发布文章';
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [contentValue, setValue] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');

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
            creator: user?.username || '',
            img: fileList.map(item => item.response.data.url),
        });
    };

    const handleEssayClick = () => {
        run({
            creator: user?.username || '',
            content: contentValue,
            username: user?.username || '',
            title: inputValue,
        });
    };

    const handleChange: UploadProps['onChange'] = (info) => {
        setFileList(info.fileList);
    };

    useEffect(() => {
        if (!isLogin) {
            message.info('请先登陆');
            setTimeout(() => {
                history.push('/login');
            }, 1000);
        };
    }, []);

    return (
        <BodyScreen>
            <Card title={title} className={styles.release}>
                {
                    isTips ? (
                        <Form wrapperCol={{ span: 18 }} labelCol={{ span: 3 }} onFinish={handleFinish}>
                            <Form.Item label='标题' name='title' rules={[{ required: true, message: '标题不能为空' }]}>
                                <Input placeholder='请输入标题' />
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
                                    {fileList.length < 5 && <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>}
                                </Upload>
                            </Form.Item>
                            
                            <Button type='primary' htmlType='submit' className={styles.releaseBtn} loading={loading}>发布</Button>
                        </Form>
                    ) : (
                        <Space direction='vertical' style={{ width: '100%' }} size={20}>
                            <Input placeholder='请输入你的标题' className={styles.input} onChange={(e) => setInputValue(e.target.value)} />
                            <MarketDown setValue={setValue} />
                            <Button type='primary' className={styles.releaseBtn} onClick={handleEssayClick} loading={loading}>发布</Button>
                        </Space>
                    )
                }
            </Card>
        </BodyScreen>
    );
};

export default observer(Release);
