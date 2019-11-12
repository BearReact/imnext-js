// @flow
/**
 * Accordion
 */
import React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';

type Props = {
    children?: React.Node,
    style?: React.CSSProperties
};

type State = {};

class Accordion extends React.PureComponent<Props, State> {
    static defaultProps = {
        children: null,
        style: null
    };

    render() {
        const {children, style} = this.props;

        return (
            <RootContainer>
                <Ul style={style}>
                    {children}
                </Ul>
            </RootContainer>
        );
    }
}

export default Accordion;

const RootContainer = styled.div`
    font-size: ${px2vw(17)};

    position: relative;
    z-index: 1;
`;

const Ul = styled.ul`
    background: #f2fbff;

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
        z-index: 15;
        top: 0;
        right: auto;
        bottom: auto;
        left: 0;
        height: 1px;
        width: 100%;
        transform-origin: 50% 0;
    }
`;
