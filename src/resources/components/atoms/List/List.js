// @flow
import * as React from 'react';
import styled, {css} from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

type Props = {
    children?: React.Node,
    style?: React.CSSProperties,
    className?: string,
    isHidden?: boolean
};
type State = {};

class List extends React.PureComponent<Props, State> {
    static defaultProps = {
        children: null,
        style: null,
        className: null,
        isHidden: false
    };

    render() {
        const {children, style, className, isHidden} = this.props;

        return (
            <Root isHidden={isHidden} className={className}>
                <Ul style={style}>{children}</Ul>
            </Root>
        );
    }
}

export default List;

const Root = styled.div`
    font-size: ${px2vw(17)};
    position: relative;
    margin-bottom: ${px2vw(5)};
    
    ${props => props.isHidden && css`
        display: none;
    `}
    
    
    @media ${screen.lg} {
        margin-bottom: 5px;
    }
`;

const Ul = styled.ul`
    background: ${props => props.theme.listBackgroundColor};

    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;

    &:before {
        transform: scaleY(0.5);

        content: '';
        position: absolute;
        background-color: transparent;
        display: block;
        z-index: 1;
        top: 0;
        right: auto;
        bottom: auto;
        left: 0;
        height: 1px;
        width: 100%;
        transform-origin: 50% 0;
    }
`;
