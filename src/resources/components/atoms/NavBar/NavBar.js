// @flow
/**
 * NavBar
 */
import * as React from 'react';
import styled, {css} from 'styled-components';
import cx from 'classnames';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    isShowShadow?: boolean,
    left?: React.Node,
    title?: React.Node,
    right?: React.Node,
    leftStyle?: React.CSSProperties,
    titleStyle?: React.CSSProperties
};
type State = {};

class NavBar extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: null,
        left: '',
        title: '',
        right: '',
        isShowShadow: false,
        leftStyle: undefined,
        titleStyle: undefined
    };

    render() {
        const {style, className, left, title, right, isShowShadow, leftStyle, titleStyle} = this.props;
        return (
            <NavBarRoot style={style} isShowShadow={isShowShadow}
                className={cx('container-fluid', className)}>
                <Row className="row">
                    <Left className="col" style={leftStyle}>{left}</Left>
                    <Title className="col" style={titleStyle}>{title}</Title>
                    <Right className="col">{right}</Right>
                </Row>
            </NavBarRoot>
        );
    }
}

export default NavBar;

const Left = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    @media ${screen.lg} {
        //flex: 0;
        padding: 0;
    }
`;

const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${px2vw(28)};
    max-width: 100%;
    align-self: center;
    font-weight: 900;
    font-size: ${px2vw(20)};
    white-space: nowrap;
    
    @media ${screen.lg} {
        font-size: 18px;
        height: 28px;
        //flex: 0;
        padding: 0;
    }
`;

const Right = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const Row = styled.div`
    height: ${px2vw(40)};
    
    @media ${screen.lg} {
        height: 40px;
        padding: 0 10px;
    }
`;

const NavBarRoot = styled.div`
    color: #fff;
    background-color: ${props => props.theme.headerBackgroundColor};
    //position: fixed;
    position: sticky;
    top: 0;
    z-index: 16;
    ${props => props.isShowShadow && css`
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
    `};
    
    @media ${screen.lg} {
        position: sticky;
        background-color: #31373a;
    }
`;
//
// const Footer = styled.header`
//     flex: 0 1 auto;
//
//     @media ${screen.lg} {
//     }
// `;
