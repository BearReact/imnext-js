// @flow
/**
 * MenuSwitch
 */
import * as React from 'react';
import styled from 'styled-components';
import Icon from '@components/atoms/Icon/Icon';
import Button from '@components/atoms/Button/Button';
import {px2vw} from '@utils/format';

type Props = {
    theme: {},
    style?: React.CSSProperties,
    className?: string,
    isHasNew?: boolean,
    onClick?: Function
};
type State = {};

class MenuSwitch extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        isHasNew: false,
        onClick: () => {}
    };

    render() {
        const {className, style, isHasNew, onClick} = this.props;
        return (
            <MenuSwitchRoot className={className} style={style} onClick={onClick}>
                <Icon code="menu" color="#fff" size={24} />
                {isHasNew && <Dot/>}
            </MenuSwitchRoot>
        );
    }
}

export default MenuSwitch;

const MenuSwitchRoot = styled(Button)`
    position: relative;
`;


const Dot = styled.div`
    width: ${px2vw(10)};
    height: ${px2vw(10)};
    background-color: #d0021b;
    position: absolute;
    border-radius: ${px2vw(99)};
    bottom: ${px2vw(1)};
    right: ${px2vw(-3)};
    border: ${props => `solid 1px ${props.theme.headerBackgroundColor}`};
`;
