// @flow
/**
 * Button
 */
import * as React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';
import Icon from '@components/atoms/Icon';

type Props = {
    size?: 'default' | 'small' | 'normal',
    type?: string,
    isActive?: boolean,
    onClick: Function,
    disabled?: boolean,
    className?: string
};

const sizeConfig = {
    default: {
        bgSize: 50,
        iconSize: 25
    },
    normal: {
        bgSize: 40,
        iconSize: 18
    },
    small: {
        bgSize: 24,
        iconSize: 10
    }
};

const typeConfig = {
    correct: {
        code: 'correct',
        bgColor: '#7ed321'
    },
    next: {
        code: 'arrow-right',
        bgColor: '#ed1164'
    },
    send: {
        code: 'send',
        bgColor: '#f04131'
    }
};

function Button(props: Props) {
    const {isActive, size, type, onClick, disabled, className} = props;

    const sizeProps = size ? sizeConfig[size] : {};
    const typeProps = type ? typeConfig[type] : {};

    return (
        <ButtonRoot isActive={isActive} config={{...sizeProps, ...typeProps}} onClick={onClick} disabled={disabled} className={className}>
            <Icon code={typeProps.code} color='#fff' size={sizeProps.iconSize} />
        </ButtonRoot>
    );
}

Button.defaultProps = {
    size: 'default',
    type: 'correct',
    isActive: false,
    disabled: true,
    className: ''
};

export default Button;

const ButtonRoot = styled.button`
    border: none;
    width: ${props => px2vw(props.config.bgSize)};
    height: ${props => px2vw(props.config.bgSize)};
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
    background-color: ${props => props.isActive ? props.config.bgColor : siteConfig.theme.statusButtonBgColor};
    border-radius: 99px;
    
    @media ${screen.lg} {
        width: ${props => props.config.bgSize}px;
        height: ${props => props.config.bgSize}px;
    };
    
`;
