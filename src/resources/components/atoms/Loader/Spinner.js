// @flow

import * as React from 'react';
import styled from 'styled-components';

type Props = {
    size?: number
};

// https://loading.io/spinner/custom/212789/
const Rolling = (props: Props) => {
    const {size} = props;
    return (
        <LdsEllipsis size={size}>
            <div className="spinner" />
        </LdsEllipsis>
    );
};

Rolling.defaultProps = {
    size: 15
};

export default Rolling;

const LdsEllipsis = styled.div`
    .spinner{
         width: ${props => props.size}px;
         height: ${props => props.size}px;
         border-radius: 50%;
         border: 5px solid ${props => props.theme.primaryColor};
         border-top-color: #fff;
         z-index: 9999;
         animation: spinner .9s ease infinite;
         margin: auto;
    }
    
    @keyframes spinner{
      from {transform: rotate(0deg);}
      to {transform: rotate(360deg);}
    }
`;
