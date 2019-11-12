// @flow
import * as React from 'react';
import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

type Props = {
    href: string,
    as?: string,
    alt?: string,
    style?: {},
    className?: string,
    children?: React.Node,
    onClick?: Function
};

const A = (props: Props) => {
    const {href, as, alt, style, className, children, onClick} = props;

    const params = {
        to: as === 'a' ? undefined : href,
        href:as === 'a' ? href : undefined,
        as: as,
        alt:alt,
        style: style,
        className:className,
        onClick: onClick
    };

    return (
        <LinkRoot {...params}>
            {children}
        </LinkRoot>
    );
};

A.defaultProps = {
    className: undefined,
    style: undefined,
    as: undefined,
    alt: undefined,
    children: '',
    onClick: undefined
};

export default A;

const LinkRoot = styled(Link)``;
