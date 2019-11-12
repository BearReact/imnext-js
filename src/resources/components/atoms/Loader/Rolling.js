// @flow

import * as React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

type Props = {
    size?: number,
    style?: React.CSSProperties,
    className?: string
};

// https://loading.io/spinner/custom/212789/
const Rolling = (props: Props) => {
    const {size, style, className} = props;
    return (
        <LdsEllipsis size={size} style={style} className={className}>
            <Loader className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="4"
                        strokeMiterlimit="10"/>
                </svg>
            </Loader>
        </LdsEllipsis>
    );
};

Rolling.defaultProps = {
    size: 15,
    style: undefined,
    className: undefined
};

export default Rolling;


const Loader = styled.div`
`;

const LdsEllipsis = styled.div`
     height: ${props=> px2vw(props.size)};
    --primaryColor: ${props => props.theme.primaryColor};
    
    ${Loader}{
        width: ${props => px2vw(props.size)};
    }
    
    @media ${screen.lg} {
        height: ${props=> props.size}px;
        
        ${Loader}{
            width: ${props => props.size}px;
        }
    }
`;
