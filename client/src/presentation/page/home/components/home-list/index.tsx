// import { List } from 'antd';
import { useRequest } from 'ahooks';
import { getHomeList } from '@/application/service/home';
import React, { FC } from 'react';
import styles from './index.module.scss';

const HomeList: FC = () => {
    const { data } = useRequest(() => getHomeList({
        page: 1,
        pageSize: 10,
    }))
    console.log(data?.data);

  return (
    <div className={styles.list}>1</div>
  );
};

export default HomeList;
