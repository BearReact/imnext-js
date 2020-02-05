// @flow

import React, {Children} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
// import Link from '@library/nextRoute';

type Props = {
    activeClassName: string,
    children: React.ReactNode,
    href: string,
};

const preFixPath = '/ap-main';
const addPreFixPath = path => {
    let newPath = `${preFixPath}/${path}`;
    do {
        newPath = newPath.replace('//', '/');
    } while (newPath.indexOf('//') >= 0);
    return newPath;
};

const A = (props: Props) => {
    const {children, activeClassName, ...otherProps} = props;
    const {pathname} = useRouter();
    const child = Children.only(<a>{children}</a>);
    const childClassName = child.props.className || '';

    const className = pathname === otherProps.href
        ? `${childClassName} ${activeClassName}`.trim()
        : childClassName;

    otherProps.href = addPreFixPath(otherProps.href);

    return (
        <Link {...otherProps}>
            {React.cloneElement(child, {
                className: className || null,
            })}
        </Link>
    );
};

export default A;
