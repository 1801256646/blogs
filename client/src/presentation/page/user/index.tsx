import { UserOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks';
import { Card, Space, Spin, Avatar, message, Tabs, Empty } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ReleaseType } from '@/application/enum/release';
import { UserFancFocus } from '@/application/enum/user'
import { getIdRelease, getAllRelease, removeRelease } from '@/application/service/release';
import { getUserInfo, getIdsUser, focusUser } from '@/application/service/user';
import BodyScreen from '@/presentation/components/body-screen';
import useAuth from '@/presentation/store/use-auth';
import HomeList from '../home/components/home-list';
import UserCard from './components/focus-fans';
import RemoveRelease from './components/remove-release';
import styles from './index.module.scss';

const User: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user, loginUser } = useAuth();
    const history = useHistory();
    
    const { loading, data: userData, run: getUserRun } = useRequest(() => getUserInfo(id), {
        refreshDeps: [id],
        ready: !!id,
        onSuccess: () => {
            fancRun();
            focusRun();
            releaseListRun();
        }
    });

    const { loading: fancLoading, data: fancData, run: fancRun } = useRequest(() => getIdsUser(userData?.data?.userFanc || []), {
        ready: `${userData?.data?.id}` === id,
        refreshDeps: [id],
        manual: true,
    });

    const { loading: focusLoading, data: focusData, run: focusRun } = useRequest(() => getIdsUser(userData?.data?.userFocus || []), {
        ready: `${userData?.data?.id}` === id,
        refreshDeps: [id],
        manual: true,
    });

    const { run: focusUserRun, loading: focusBtnLoading } = useRequest(focusUser, {
        manual: true,
        onSuccess: () => {
            loginUser();
            getUserRun();
        },
    })

    const { loading: releaseListLoading, data: releaseListData, run: releaseListRun } = useRequest(() => getIdRelease(userData?.data?.release?.map(item => item.id) || []), {
        ready: `${userData?.data?.id}` === id,
        refreshDeps: [id],
        manual: true,
    });

    const { data: allReleaseData, run: allReleaseDataRun } = useRequest(() => getAllRelease(), {
        ready: !!user?.admin,
    });

    const { loading: removeLoading, run: removeReleaseRun } = useRequest(removeRelease, {
        ready: !!user?.admin,
        manual: true,
        onSuccess: () => {
            allReleaseDataRun();
        },
    });

    const handleFocusClick = (id: number) => {
        if (!user?.username) {
            message.info('请先登陆');
            setTimeout(() => history.push('/login'), 1000);
        }
        focusUserRun({
            userId: `${user?.id}`,
            userFocus: `${id}`,
        });
    };

    const tipsList = releaseListData?.data?.list?.filter(item => item.type === ReleaseType.Tips);
    const articleList = releaseListData?.data?.list?.filter(item => item.type === ReleaseType.Article);

    return (
        <BodyScreen style={styles.user}>
            <Spin spinning={loading || fancLoading || focusLoading}>
                <div className={styles.userHeader}>
                    <div className={styles.userLogo}>
                        <Avatar
                            icon={<UserOutlined />}
                            src={userData?.data?.avatar}
                            shape='circle'
                            size={70}
                            onClick={() => `${user?.id}` === id && history.push('/user-setting')}
                        />
                        <Space direction='vertical' size={8}>
                            <h4>{userData?.data?.cname || userData?.data?.username}</h4>
                            <span>{userData?.data?.description}</span>
                        </Space >
                    </div>
                </div>
                <div className={styles.detailUser}>
                    <Space direction='vertical' size={20} className={styles.detailUserLeft}>
                        <Card className={styles.userInfo} actions={[
                            <Space direction='vertical' size={0}>
                                话题
                                <span className={styles.num}>{userData?.data?.release?.length || 0}</span>
                            </Space>,
                            <Space direction='vertical' size={0}>
                                评论
                                <span className={styles.num}>{(userData?.data?.reply?.length || 0) + (userData?.data?.review?.length || 0)}</span>
                            </Space>,
                            <Space direction='vertical' size={0}>
                                关注
                                <span className={styles.num}>{userData?.data?.userFocus?.length || 0}</span>
                            </Space>,
                            <Space direction='vertical' size={0}>
                                注册排名
                                <span className={styles.num}>{userData?.data?.id}</span>
                            </Space>,

                        ]}>
                            <h3>个人成就</h3>
                        </Card>
                        <UserCard
                            type={UserFancFocus.Fanc}
                            list={fancData?.data?.list}
                            handleFocusClick={handleFocusClick}
                            focusBtnLoading={fancLoading}
                            user={user}
                        />
                        <UserCard
                            type={UserFancFocus.Focus}
                            list={focusData?.data?.list}
                            handleFocusClick={handleFocusClick}
                            focusBtnLoading={focusBtnLoading}
                            user={user}
                        />
                    </Space>
                    <Tabs>
                        <TabPane key={'tips'} tab='帖子'>
                            <Spin spinning={releaseListLoading}>
                                {
                                    tipsList?.length ? tipsList?.map(item => (
                                        <Card key={item.id} className={styles.package} onClick={() => history.push(`/detail?id=${item.id}`)}>
                                            <HomeList release={item} />
                                        </Card>
                                    )) : <Card><Empty description='当前暂无发布内容' /></Card>
                                }
                            </Spin>
                        </TabPane>
                        <TabPane key={'article'} tab='文章'>
                            <Spin spinning={releaseListLoading}>
                                {
                                    articleList?.length ? articleList?.map(item => (
                                        <Card key={item.id} className={styles.package} onClick={() => history.push(`/detail?id=${item.id}`)}>
                                            <HomeList release={item} />
                                        </Card>
                                    )) : <Card><Empty description='当前暂无发布内容' /></Card>
                                }
                            </Spin>
                        </TabPane>
                        {
                            user?.admin && (
                                <TabPane key={'admin'} tab='下架'>
                                    <RemoveRelease
                                        handleRemove={removeReleaseRun}
                                        loading={removeLoading}
                                        dataSource={allReleaseData?.data}
                                    />
                                </TabPane>
                            )
                        }
                    </Tabs>
                </div>
            </Spin>
            
        </BodyScreen>
    );
};

export default observer(User);
