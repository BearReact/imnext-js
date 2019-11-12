// @flow
/**
 * Dialog
 */
import * as React from 'react';
import cx from 'classnames';
import styled from 'styled-components';
import screen from '@themes/Screen';

import Rolling from '@components/atoms/Loader/Rolling';
import {px2vw} from '@utils/format';

type Props = {
    isVisible?: boolean,
    message?: string
};
type State = {};

class Block extends React.PureComponent<Props, State> {
    static defaultProps = {
        isVisible: false,
        message: ''
    };



    render() {
        const {message, isVisible} = this.props;

        return (
            <BlockContainer className={cx({'d-flex': isVisible, 'd-none': !isVisible})}>
                {message} <Rolling style={{marginLeft: 5}} size={16}/>
            </BlockContainer>
        );
    }
}

export default Block;


const BlockContainer = styled.div`
    color: #b3b3b3;
    font-size: ${px2vw(12)};
    z-index: 999;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    
    @media ${screen.lg} {
        font-size: 16px;
    }
`;
