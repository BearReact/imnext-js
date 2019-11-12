// @flow
/**
 * Panel
 */
import * as React from 'react';
import styled from 'styled-components';
import SlidingPane from '@library/sliding-pane';
import {px2vw} from '@utils/format';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    isOpen?: boolean,
    children?: React.Node,
    onToggleMenu?: Function,
    overlayClassName?: string
};
type State = {};

class Panel extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        overlayClassName: undefined,
        isOpen: false,
        children: null,
        onToggleMenu: () => {}
    };


    componentWillUnmount() {
        const {onToggleMenu, isOpen} = this.props;
        if (isOpen) {
            onToggleMenu();
        }
    }

    render() {
        const {isOpen, onToggleMenu, children, style, className, overlayClassName} = this.props;
        return (
            <PanelRoot ref={this.el} style={style}>
                <SlidingPane isOpen={isOpen} from="left" width={px2vw(270)}  className={className} overlayClassName={overlayClassName} onRequestClose={onToggleMenu}>
                    {children}
                </SlidingPane>
            </PanelRoot>
        );
    }
}

export default Panel;

const PanelRoot = styled.div``;
