import React, { FC } from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

export interface BodyScreenProps {
    className?: string;
    style?: React.CSSProperties;
    [ket: string]: any;
}

const BodyScreen: FC<BodyScreenProps> = (props) => {
    const { className, children, ...rest } = props;
    console.log(props)

    return (
        <div className={classnames(className, styles.body)} {...rest}>
            {children}
        </div>
    );
};

export default BodyScreen;
