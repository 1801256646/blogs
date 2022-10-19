import { CommentOutlined } from '@ant-design/icons';
import { Comment, Space, Input, Button, Avatar } from 'antd';
import React, { FC, useState } from 'react';
import clsx from 'classnames';
import { CommentReleaseReq } from '@/application/service/release';
import { ReplyData } from '@/application/service/home';
import { getUser } from '@/utils/user';
import { getUpdateAtLabel } from '@/utils/time';
import { CommentType } from '@/application/enum/release';
import styles from '@/presentation/page/detail/index.module.scss';

export interface CommentProps extends ReplyData {
    children?: React.ReactNode;
    type: CommentType;
    handleComment?: (props: CommentReleaseReq) => void
}

const ChildrenComment: FC<CommentProps> = (props) => {
    const { children, user: reviewUser, text, createTime, type, id, handleComment, replier } = props;
    const [isShowComment, setIsShowComment] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const user = getUser();
    const reviewUsername = reviewUser?.cname || reviewUser?.username;

    const handleClick = () => {
        handleComment?.({
            type,
            text: inputValue,
            username: user.username,
            id: +id,
            replier: reviewUsername,
        });
        setIsShowComment(false);
    };

    const replyContent = () => (
        <Space className={styles.reply}>
            <span>{reviewUsername}</span>回复<span>{replier}</span>
        </Space>
    )

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
            author={replier ? replyContent() : reviewUsername}
            avatar={<Avatar size={40} src={reviewUser?.avatar}>{reviewUser?.cname[0].toUpperCase()}</Avatar>}
            content={
                <p>
                    {text}
                </p>
            }
            datetime={getUpdateAtLabel(createTime)}
        >
            {children}
        </Comment>
    )
};

export default ChildrenComment;
