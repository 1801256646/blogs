import { ReadOutlined , LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Tooltip, Comment, Typography, Space, message } from 'antd';
import moment from 'moment';
import { ReleaseData } from '@/application/service/home';
import { focusRelease } from '@/application/service/release';
import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUsername, getUser } from '@/utils/user';
import { getUpdateAtLabel } from '@/utils/time';
import styles from './index.module.scss';

const { Paragraph } = Typography;

const HomeList: FC<{ release: ReleaseData }> = (props) => {
    const { release } = props;
    const user = getUser();
    const history = useHistory();
    const [likes, setLikes] = useState(release.focus || 0);
    const [action, setAction] = useState<string | null>('open');

    const like = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (!getUsername()) {
            message.info('请先登陆');
            setTimeout(() => history.push('/login'), 1000);
        }
        const { code, data } = await focusRelease({
            username: user.username,
            releaseId: release.id,
        })
        if (code === 0) {
            message.success(action === 'open' ? '取消点赞成功' : '点赞成功');
            setLikes(action === 'open' ? (likes - 1) : (likes + 1));
            setAction(action === 'open' ? 'off' : 'open');
            localStorage.setItem('user', JSON.stringify(data));
        }
    };
    
    useEffect(() => {
        if (user?.focus?.includes(String(release.id))) {
            setAction('open');
        } else {
            setAction('off');
        }
    }, [release]);

    const actions = [
        <Tooltip key="comment-basic-like" title="关注">
            <Space onClick={(e) => like(e)}>
                {action === 'off' ? <LikeOutlined /> : <LikeFilled />}
                <span className="comment-action">{likes}</span>
            </Space>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="访问量">
            <Space>
                <ReadOutlined />
                <span>{release.browse}</span>
            </Space>
        </Tooltip>,
    ]

    return (
        <Comment
            actions={actions}
            className={styles.homeList}
            author={release.creator || 'U'}
            avatar={<Avatar size={40}>{(getUsername()?.[0] || 'u').toLocaleUpperCase()}</Avatar>}
            content={
                <div>
                    <p className={styles.title}>{release.title}</p>
                    <Paragraph ellipsis={{ rows: 3 }} className={styles.content}>{release.content}</Paragraph>
                </div>
            }
            datetime={
                <Tooltip title={moment(release.updateTime).format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{getUpdateAtLabel(release.updateTime)}发布</span>
                </Tooltip>
            }
        ></Comment>
    );
};

export default HomeList;
