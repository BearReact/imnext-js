// @flow
/**
 * Tag
 */
import * as React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    children?: React.Node,
    theme?: string
};

const primaryColor = typeof siteConfig !== 'undefined' && siteConfig.theme.primaryColor;

const themeConfig = {
    default: {
        bgColor: 'transparent',
        fontColor: '#000',
        padding: '0',
        minHeight: 'unset',
        border: 'none'
    },
    primary: {
        bgColor: primaryColor || '#28a9e0',
        fontColor: '#fff'
    },
    darkBlue: {
        bgColor: 'rgba(40, 169, 224, 0.1)',
        fontColor: '#fff'
    },
    gray: {
        bgColor: '#9b9b9b',
        fontColor: '#ffffff'
    },
    danger: {
        bgColor: '#ff4b4b',
        fontColor: '#fff'
    },
    warning: {
        bgColor: '#f5a623',
        fontColor: '#fff'
    },
    success: {
        bgColor: '#7ed321',
        fontColor: '#fff'
    }
};

function Tag(props: Props) {
    const {className, style, children, theme} = props;

    const themeProps = theme ? themeConfig[theme] : {};

    return (
        <TagRoot className={className} style={style} config={{...themeProps}}>
            {children}
        </TagRoot>
    );
}

Tag.defaultProps = {
    style: undefined,
    className: undefined,
    children: undefined,
    theme: undefined
};

export default Tag;

const TagRoot = styled.span`
    border-radius: ${px2vw(11)};
    padding: ${px2vw(4)} ${px2vw(20)};
    font-size: ${px2vw(12)};
    min-height: ${px2vw(22)};
    font-weight: 900;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${siteConfig.theme.verifyFontColor};
    background-color: ${siteConfig.theme.verifyBackgroundColor};
    
    @media ${screen.lg} {
        border-radius: 11px;
        padding: 4px 20px;
        font-size: 12px;
        min-height: 22px;
    }
`;
