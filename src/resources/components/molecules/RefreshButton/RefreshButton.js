// @flow
/**
 * Refresh Button
 */
import * as React from 'react';
import styled, {keyframes, css} from 'styled-components';
import Icon from '@components/atoms/Icon';
import Button from '@components/atoms/Button';

type Props = {
    theme: {},
    style?: React.CSSProperties,
    className?: string,
    isRefreshing?: boolean,
    onClick?: Function,
    disabled?: boolean,
    isDisableColor?: boolean,
    iconSize?: number
};
type State = {};

class RefreshButton extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        isRefreshing: false,
        onClick: () => {},
        disabled: false,
        isDisableColor: false,
        iconSize: 20
    };

    render() {
        const {className, style, onClick, isRefreshing, disabled, isDisableColor, iconSize} = this.props;
        return (
            <ButtonArea onClick={onClick} disabled={disabled} style={style} className={className}>
                <RefreshIcon code="update" size={iconSize} isDisableColor={isDisableColor} isRefreshing={isRefreshing}/>
            </ButtonArea>
        );
    }
}

export default RefreshButton;

const ButtonArea = styled(Button)`
    background-color: transparent !important;
    border-color: transparent !important;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const RefreshIcon = styled(Icon)`
    i{
        color: #737b8c;
        
        ${props => props.isDisableColor && css`
            color: ${props=>props.theme.buttonDisabledBackgroundColor};
        `}
    }

    ${props => props.isRefreshing && css`
        animation: ${rotate} 1s linear infinite;
        
        i{
            color: ${props=>props.theme.buttonDisabledBackgroundColor};
        }
    `}
`;
