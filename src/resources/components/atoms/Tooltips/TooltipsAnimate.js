// @flow
/**
 * Tooltips
 */
import React from 'react';
import {Transition} from 'react-transition-group';
import Tooltips from './Tooltips';

type Props = {
    isOpen?: boolean,
    onClose: Function
};

const duration = 100;
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    pointerEvents: 'none',
    position: 'relative'
};
const transitionStyles = {
    entering: {opacity: 0, pointerEvents: 'none'},
    entered:  {opacity: 1, pointerEvents: 'auto'}
};


function TooltipsAnimate(props: Props) {
    const {isOpen} = props;
    return (
        <Transition in={isOpen} timeout={{enter: duration, exit: duration}}>
            {(state) => (
                <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    <Tooltips {...props}/>
                </div>
            )}
        </Transition>
    );
}

TooltipsAnimate.defaultProps = {
    isOpen: true
};

export default TooltipsAnimate;
