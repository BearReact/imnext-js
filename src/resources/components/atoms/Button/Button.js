// @flow
/**
 * Button
 */
import * as React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

type Props = {
    style?: React.CSSProperties,
    children: React.Node,
    theme?: 'default' | 'primary' | 'white' | 'darkBlue' | 'gray' | 'dark' | 'danger' | 'warning',
    size?: 'default' | 'small' | 'normal',
    shape?: 'default' | 'circle' | 'raised',
    block?: boolean,
    outline?: boolean,
    type?: 'button' | 'submit'
};

const themeConfig = {
    default: {
        bgColor: 'transparent',
        fontColor: '#000',
        padding: '0',
        minHeight: 'unset',
        borderColor: 'transparent'
    },
    primary: {
        bgColor: siteConfig.theme.primaryColor || '#26815e',
        borderColor: siteConfig.theme.primaryColor || '#26815e',
        fontColor: '#fff'
    },
    white: {
        bgColor: '#fff',
        fontColor: '#fff',
        borderColor: '#fff'
    },
    darkBlue: {
        bgColor: 'rgba(40, 169, 224, 0.1)',
        borderColor: 'rgba(40, 169, 224, 0.1)',
        fontColor: '#fff'
    },
    gray: {
        bgColor: '#9b9b9b',
        borderColor: '#9b9b9b',
        fontColor: '#ffffff'
    },
    darkGray: {
        bgColor: '#41454d',
        borderColor: '#41454d',
        fontColor: '#ffffff'
    },
    dark: {
        bgColor: '#4a4a4a',
        borderColor: '#6f6f6f',
        fontColor: '#fff'
    },
    danger: {
        bgColor: '#ff4b4b',
        borderColor: '#ff4b4b',
        fontColor: '#fff'
    },
    warning: {
        bgColor: '#f5a623',
        borderColor: '#f5a623',
        fontColor: '#fff'

    }
};

const sizeConfig = {
    default: {
        fontSize: 18,
        fontWeight: 900,
        minHeight: '42px'
    },
    small: {
        fontSize: 12,
        fontWeight: 400,
        minHeight: '20px'
    },
    normal: {
        fontSize: 14,
        fontWeight: 400,
        minHeight: '30px'
    }
};

const shapeConfig = {
    default: {
        shape: '3px'
    },
    raised: {
        shape: 0
    },
    circle: {
        shape: '29px'
    }
};

function Button(props: Props) {
    const {children, theme, size, shape, outline, block, ...buttonProps} = props;

    const themeProps = theme ? themeConfig[theme] : {};
    const sizeProps = size ? sizeConfig[size] : {};
    const shapeProps = shape ? shapeConfig[shape] : {};

    return (
        <ButtonRoot {...buttonProps} config={{block, outline, ...sizeProps, ...shapeProps, ...themeProps}}>
            {children}
        </ButtonRoot>
    );
}

Button.defaultProps = {
    style: {},
    theme: 'default',
    size: 'default',
    shape: 'default',
    block: false,
    outline: false,
    type: 'button'
};

export default Button;

const ButtonRoot = styled.button`
    //height: 0; // ie11
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${props => props.config.padding || `${px2vw(2)} ${px2vw(10)}`};

    width: ${props => (props.config.block ? '100%' : 'auto')};
    max-width: 100%;

    border: 1px solid;

    border-color: ${props => (props.config.outline ? props.config.bgColor : props.config.borderColor)};
    border-radius: ${props => props.config.shape};
    background-color: ${props => props.config.outline ? 'transparent' : props.config.bgColor};
    color: ${props => props.config.outline ? props.config.borderColor : props.config.fontColor};
    font-size: ${props => px2vw(props.config.fontSize)};
    font-weight: ${props => props.config.fontWeight};
    min-height: ${props => props.config.minHeight};
    
    &:disabled,
    &[disabled]{
      border: 1px solid ${props=>props.theme.buttonDisabledBorderColor};
      background-color: ${props=>props.theme.buttonDisabledBackgroundColor};
      color: ${props=>props.theme.buttonDisabledTextColor};
    };


      
    
    
    @media ${screen.lg} {
        font-size: ${props => props.config.fontSize}px;
        min-height: ${props => props.config.minHeight};
        padding: 0 10px;
        
         // fix ie11
        &:after{
            content:'';
            min-height:inherit;
            font-size:0;
        } 
    };
    
`;
