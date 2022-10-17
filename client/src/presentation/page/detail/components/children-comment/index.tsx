import { CommentOutlined } from '@ant-design/icons';
import { Comment, Space, Input, Button, Avatar } from 'antd';
import React, { FC, useState } from 'react';
import clsx from 'classnames';
import { CommentReleaseReq } from '@/application/service/release';
import { getUser } from '@/utils/user';
import { getUpdateAtLabel } from '@/utils/time';
import { CommentType } from '@/application/enum/release';
import styles from '@/presentation/page/detail/index.module.scss';

export interface CommentProps {
    children?: React.ReactNode;
    username: string;
    content: string;
    id: number;
    createTime: string;
    type: CommentType;
    handleComment?: (props: CommentReleaseReq) => void
}

const ChildrenComment: FC<CommentProps> = (props) => {
    const { children, username, content, createTime, type, id, handleComment } = props;
    const [isShowComment, setIsShowComment] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const user = getUser();

    const handleClick = () => {
        handleComment?.({
            type,
            text: inputValue,
            username: user.username,
            id: +id,
        });
        setIsShowComment(false);
    };

    return (
        <Comment
            className={styles.comment}
            actions={[
                <Space onClick={() => setIsShowComment(!isShowComment)} className={styles.commentLink}>
                    <CommentOutlined /><span className={clsx(styles.commentLink, isShowComment && styles.link)}>{ isShowComment ? '取消评论' : '评论' }</span>
                </Space>,
                isShowComment && (
                    <div className={styles.childrenComment}>
                        <Input.TextArea autoSize={{ minRows: 2, maxRows: 2 }} onChange={(e) => setInputValue(e.target.value)} />
                        <Button type='primary' onClick={() => handleClick()}>评论</Button>
                    </div>
                ),
            ]}
            author={username}
            avatar={<Avatar size={40}>{username[0].toUpperCase()}</Avatar>}
            content={
                <p>
                    {content}
                </p>
            }
            datetime={getUpdateAtLabel(createTime)}
        >
            {children}
        </Comment>
    )
};

export default ChildrenComment;
