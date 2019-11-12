// @flow
import * as React from 'react';
import styled, {css} from 'styled-components';
import screen from '@themes/Screen';
import {px2vw} from '@utils/format';

type Props = {
    shapeType?: string,
    shapeSize?: number,
    shapeColor?: string,
    shapeBorder?: number,
    style?: React.CSSProperties,
    className?: string,
    type?: 'fontclass' | 'svg',
    isInline?: boolean,
    onClick?: Function,
    size?: number,
    top?: number,
    bottom?: number,
    left?: number,
    right?: number,
    color?: string,
    code: string
};

const shapeSetting = {
    default: '5px',
    circle: '23px',
    vertical: '1px'
};

const Icon = (props: Props) => {
    const {
        shapeType,
        shapeSize,
        shapeColor,
        shapeBorder,
        style,
        isInline,
        className,
        type,
        onClick,
        size,
        top,
        bottom,
        left,
        right,
        color,
        code
    } = props;
    return (
        <IconGroup
            shapeType={shapeType}
            shapeSize={shapeSize}
            shapeColor={shapeColor}
            shapeBorder={shapeBorder}
            style={style}
            isInline={isInline}
            className={className}
            onClick={onClick}
        >
            {type === 'svg' ?
                <IconSvg className="icon" aria-hidden="true"
                    size={size}
                    top={top}
                    bottom={bottom}
                    left={left}
                    right={right}
                    color={color}
                >
                    <use xlinkHref={`#icon-${code}`}/>
                </IconSvg> :
                <IconImage
                    className={`iconfont icon-${code}`}
                    size={size}
                    top={top}
                    bottom={bottom}
                    left={left}
                    right={right}
                    color={color}
                />
            }

        </IconGroup>
    );
};

Icon.defaultProps = {
    className: '',
    type: 'fontclass',
    style: {},
    shapeType: '',
    shapeSize: 34,
    shapeColor: '#fff',
    shapeBorder: 'none',
    color: '',
    isInline: false,
    size: 22,
    top: null,
    bottom: null,
    left: null,
    right: null,
    onClick: () => {}
};

export default Icon;

const IconImage = styled.i`
    display: inline-flex;
    color: ${props => (props.color ? props.color : '#bdbdbd')};
    font-size: ${props => px2vw(props.size)};
    font-weight: 100;
    height: auto;
    line-height: normal;

    margin-bottom: ${props => (props.bottom ? `${props.bottom}px` : 'unset')};
    margin-top: ${props => (props.top ? `${props.top}px` : 'unset')};
    margin-right: ${props => (props.right ? `${props.right}px` : 'unset')};
    margin-left: ${props => (props.left ? `${props.left}px` : 'unset')};
    
    @media ${screen.lg} {
        font-size: ${props=>props.size}px;
    }
        
`;

const IconGroup = styled.div`
    position: relative;
    display: ${props => (props.isInline ? 'inline-flex' : 'flex')};
    align-items: center;
    justify-content: center;
    vertical-align: middle;

    ${props => props.shapeType && css`
        border-radius: ${shapeSetting[props.shapeType]};
        width: ${px2vw(props.shapeSize)};
        height: ${px2vw(props.shapeSize)};
        background-color: ${props.shapeColor};
        border: ${props.shapeBorder};
        
        @media ${screen.lg} {
            width: ${props.shapeSize}px;
            height: ${props.shapeSize}px;
        }
    `};
`;

const IconSvg = styled.svg`
    &.icon{
        display: inline-flex;
        color: ${props => (props.color ? props.color : '#bdbdbd')};
        font-size: ${props => px2vw(props.size)};
        font-weight: 100;
        line-height: normal;
        
        width: ${props => px2vw(props.size)};
        height: ${props => px2vw(props.size)};
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
       

        margin-bottom: ${props => (props.bottom ? `${props.bottom}px` : 'unset')};
        margin-top: ${props => (props.top ? `${props.top}px` : 'unset')};
        margin-right: ${props => (props.right ? `${props.right}px` : 'unset')};
        margin-left: ${props => (props.left ? `${props.left}px` : 'unset')};
        
        @media ${screen.lg} {
            font-size: ${props=>props.size}px;
            width: ${props => props.size}px;
            height: ${props => props.size}px;
        }
    }
`;
