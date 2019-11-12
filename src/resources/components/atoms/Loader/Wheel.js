// @flow

import * as React from 'react';
import styled, {keyframes} from 'styled-components';

type Props = {
    size?: number
};

// https://codepen.io/karimcossutti/pen/bqqYzE
const Wheel = (props: Props) => {
    const {size} = props;
    return (
        <LdsEllipsis size={size}>
            <div className="cssload-speeding-wheel" />
        </LdsEllipsis>
    );
};

Wheel.defaultProps = {
    size: 15
};

export default Wheel;



const rotate = keyframes`
   100%{ transform: rotate(360deg); transform: rotate(360deg); }
`;


const LdsEllipsis = styled.div`
    position: relative;
    
    .cssload-speeding-wheel {
        width: ${props => props.size}px;
        height: ${props => props.size}px;
        margin: 0 auto;
        border: 3px solid ${props=> props.theme.primaryColor};
        border-radius: 50%;
        border-left-color: transparent;
        border-right-color: transparent;
        animation: ${rotate} 575ms infinite linear;
            -o-animation: ${rotate} 575ms infinite linear;
            -ms-animation: ${rotate} 575ms infinite linear;
            -webkit-animation: ${rotate} 575ms infinite linear;
            -moz-animation: ${rotate} 575ms infinite linear;
    }
`;
