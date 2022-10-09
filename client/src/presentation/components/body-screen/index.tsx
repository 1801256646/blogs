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

    return (
        <div {...rest} className={classnames(className, styles.body)}>
            {children}
        </div>
    );
};

export default BodyScreen;
