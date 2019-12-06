// @flow

import * as React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

type Props = {
    size?: number,
    style?: React.CSSProperties,
    className?: string,
};

const Rolling = (props: Props) => {
    const {size, style, className} = props;
    return (
        <Spinner size={size}>
            <div className="spinner-container">
                <div className="spinner-rotator">
                    <div className="spinner-left">
                        <div className="spinner-circle"/>
                    </div>
                    <div className="spinner-right">
                        <div className="spinner-circle"/>
                    </div>
                </div>
            </div>
        </Spinner>
    );
};

Rolling.defaultProps = {
    size: 15,
    style: undefined,
    className: undefined,
};

export default Rolling;

const Spinner = styled.div`

    position: relative;
    display: flex;
    width: ${props => props.size}px;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    
    .spinner-circle {
        box-sizing: border-box;
        position: absolute;
        width: 200%;
        height: 100%;
        border-style: solid;
        border-color: #f14836 #f14836 #dedede4f;
        border-radius: 50%;
        border-width: 4px;
    }
    
    .spinner-container {
        pointer-events: none;
        position: absolute;
        width: 100%;
        padding-bottom: 100%;
        top: 50%;
        left: 50%;
        margin-top: -50%;
        margin-left: -50%;
        animation: spinner-linspin 1568.23529647ms linear infinite;
        
        
        .spinner-rotator {
            position: absolute;
            width: 100%;
            height: 100%;
            animation: spinner-easespin 5332ms cubic-bezier(.4,0,.2,1) infinite both;
            
            
            .spinner-left {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                overflow: hidden;
                right: 50%;
                
                .spinner-circle {
                    left: 0;
                    right: -100%;
                    border-right-color: #dedede4f;
                    animation: spinner-left-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both;
                }
            }
            
            .spinner-right {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                overflow: hidden;
                left: 50%;
                
                .spinner-circle {
                    left: -100%;
                    right: 0;
                    border-left-color: #dedede4f;
                    animation: right-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both;
                }
            }
        }
    }
    
    
    @-webkit-keyframes spinner-linspin {
        to {
            transform: rotate(360deg)
        }
    }
    
    @keyframes spinner-linspin {
        to {
            transform: rotate(360deg)
        }
    }
    
    
    @keyframes spinner-easespin {
        12.5% {
            transform: rotate(135deg)
        }
    
        25% {
            transform: rotate(270deg)
        }
    
        37.5% {
            transform: rotate(405deg)
        }
    
        50% {
            transform: rotate(540deg)
        }
    
        62.5% {
            transform: rotate(675deg)
        }
    
        75% {
            transform: rotate(810deg)
        }
    
        87.5% {
            transform: rotate(945deg)
        }
    
        to {
            transform: rotate(1080deg)
        }
    }
    
   
    
    @keyframes spinner-left-spin {
        0% {
            transform: rotate(130deg)
        }
    
        50% {
            transform: rotate(-5deg)
        }
    
        to {
            transform: rotate(130deg)
        }
    }

    @keyframes right-spin {
        0% {
            transform: rotate(-130deg)
        }
    
        50% {
            transform: rotate(5deg)
        }
    
        to {
            transform: rotate(-130deg)
        }
    }
`;
