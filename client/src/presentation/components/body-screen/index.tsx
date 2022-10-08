import React, { FC } from 'react';
import classnames from 'classnames';
import './index.scss';

export interface BodyScreenProps {
    className?: string;
    style?: React.CSSProperties;
    [ket: string]: any;
}

const BodyScreen: FC<BodyScreenProps> = (props) => {
    const { className, children, ...rest } = props;

    return (
        <div {...rest} className={classnames(className, 'body')}>
            {children}
        </div>
    );
};

export default BodyScreen;
