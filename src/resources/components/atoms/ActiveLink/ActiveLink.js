// @flow

import React, {Children} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

type Props = {
    activeClassName: string,
    children: React.ReactNode,
    href: string,
};

const ActiveLink = props => {
    const {children, activeClassName, ...otherProps} = props;
    const {pathname} = useRouter();
    const child = Children.only(children);
    const childClassName = child.props.className || '';

    const className = pathname === otherProps.href
        ? `${childClassName} ${activeClassName}`.trim()
        : childClassName;

    return (
        <Link {...otherProps}>
            {React.cloneElement(child, {
                className: className || null,
            })}
        </Link>
    );
};


export default ActiveLink;
