import { useRequest } from 'ahooks';
import { UserOutlined, LikeOutlined, LikeFilled, ReadOutlined, HeartOutlined } from '@ant-design/icons';
import { Avatar, Comment, Card, Typography, Space, Spin, message } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment';
import { releaseDetail, focusRelease, browseRelease } from '@/application/service/release';
import BodyScreen from '@/presentation/components/body-screen';
import { getUser } from '@/utils/user';
import styles from './index.module.scss'

const { Title, Paragraph } = Typography;

const Detail: FC = () => {
    const user = getUser();
    const location = useLocation();
    const history = useHistory();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id') || '';
    const [likes, setLikes] = useState(0);
    const [action, setAction] = useState<string | null>('open');

    const { data, loading } = useRequest(() => releaseDetail(id), {
        ready: !!id,
        refreshDeps: [id],
        onSuccess: (data) => {
            setLikes(data?.data?.focus);
        }
    });

    useRequest(() => browseRelease(id), { ready: !!id, refreshDeps: [id] });

    const like = async () => {
        if (!user.username) {
            message.info('请先登陆');
            setTimeout(() => history.push('/login'), 1000);
        }
        const { code, data: userData } = await focusRelease({
            username: user.username,
            releaseId: Number(id),
        })
        if (code === 0) {
            message.success(action === 'open' ? '取消点赞成功' : '点赞成功');
            setLikes(action === 'open' ? (likes - 1) : (likes + 1));
            setAction(action === 'open' ? 'off' : 'open');
            localStorage.setItem('user', JSON.stringify(userData));
        }
    };

    const actions = [
        <Space onClick={like}>
            {action === 'off' ? <LikeOutlined /> : <LikeFilled />}
            <span className="comment-action">{`点赞(${likes})`}</span>
        </Space>,
        <Space>
            <ReadOutlined />
            <span>{`浏览（${data?.data?.browse || 0}）`}</span>  
        </Space>,
        <Space>
            <HeartOutlined />
            <span>收藏</span>
        </Space>
    ];

    useEffect(() => {
        if (user.focus?.includes(String(id))) {
            setAction('open');
        } else {
            setAction('off');
        }
    }, [user.username, id]);
  
    return (
        <Spin spinning={loading}>
            <BodyScreen className={styles.detail}>
                <Card actions={actions}>
                    <Comment
                        author={user.cname || user.username}
                        avatar={<Avatar size={40} icon={<UserOutlined />} />}
                        content={
                            <p>
                                发布于{moment(data?.data?.createTime).format('YYYY-MM-DD HH:mm:ss')}
                            </p>
                        }
                    />
                    <Title level={2}>{data?.data?.title}</Title>
                    <Paragraph>
                        {data?.data?.content}
                    </Paragraph>
                </Card>
                <Card>
                    
                </Card>
            </BodyScreen>
        </Spin>
    );
};

export default Detail;
