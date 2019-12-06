// @flow

import * as React from 'react';
import styled, {css} from 'styled-components';

type Props = {
    style?: $Shape<CSSStyleDeclaration>,
    className?: string,
    children?: React.Node,
    isLoading: boolean,
};
type State = {};

class LoaderContainer extends React.PureComponent<Props, State> {
    render() {
        const {
            children, style, className, isLoading,
        } = this.props;

        return (
            <div style={style} className={className}>
                {children}

                <Loader isLoading={isLoading}>
                    Loading...
                </Loader>
            </div>
        );
    }
}

LoaderContainer.defaultProps = {
    style: undefined,
    className: undefined,
    children: null,
};

export default LoaderContainer;

const Loader = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(222,222,222, .2);
    z-index: 99;
    display: none;
    align-items: center;
    justify-content: center;
    
    ${props => props.isLoading && css`
        display: flex;
    `}
`;
