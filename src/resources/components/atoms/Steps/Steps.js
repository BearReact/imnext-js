// @flow
/**
 * Steps
 */
import * as React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';


type Props = {
    style?: React.CSSProperties,
    className?: any,
    activeStep?: number,
    totalStep?: number
};
type State = {};

class Steps extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: null,
        className: null,
        activeStep: 1,
        totalStep: 3
    };

    render() {
        const {totalStep, activeStep, ...otherProps} = this.props;

        const stepDom = [];
        for (let stepNumber = 1; stepNumber <= totalStep; stepNumber += 1) {
            stepDom.push(
                <Step active={activeStep >= stepNumber} key={`stepNumber-${stepNumber}`}>
                    <Line />
                    <StepText>{stepNumber}</StepText>
                </Step>
            );
        }

        return <StepsRoot {...otherProps}>{stepDom}</StepsRoot>;
    }
}

export default Steps;

const Line = styled.div`
    position: absolute;
    left: 0;
    width: calc(100% - ${px2vw(49)});
    margin-left: ${px2vw(66)};

    &:after {
        content: '';
        display: flex;
        border-radius: ${px2vw(1)};
        width: 100%;
        transition: background 0.3s;
        position: relative;
        left: 0;
        background-size: 8px 1px;
        background-repeat: repeat-x;
        height: ${px2vw(2)};
        
    }
    
    @media ${screen.lg} {
        
        width: calc(100% - 49px);
        margin-left: 66px;
        
        &:after {
            height: 2px;
            border-radius: 1px;
        }
    }
`;

const StepText = styled.div`
    color: #fff;
    font-size: ${px2vw(16)};
    font-weight: 900;

    background-color: ${props => props.theme.primaryColor};
    width: ${px2vw(30)};
    height: ${px2vw(30)};
    border-radius: ${px2vw(30)};
    align-items: center;
    justify-content: center;
    display: flex;
    
    @media ${screen.lg} {
        font-size: 16px;
        width: 30px;
        height: 30px;
        border-radius: 30px;
    }
`;

const Step = styled.div`
    display: flex;
    position: relative;
    flex: 1;
    align-items: center;
    padding-left: ${px2vw(24)};

    ${Line} {
        &:after {
            background-image: ${props =>
        props.active
            ? `linear-gradient(to right, ${props.theme.primaryColor} 0%, ${
                props.theme.primaryColor
            } 30%, transparent 30%)`
            : 'linear-gradient(to right, #cecece 0%, #cecece 30%, transparent 30%)'};
        }
    }

    ${StepText} {
        background-color: ${props => props.active ? props.theme.primaryColor : props.theme.stepDisabledBackgroundColor};
        color: ${props => props.active ? '#fff' : '#d8d8d8'};
    }

    &:last-child {
        flex: 0;
        padding-right: ${px2vw(24)};

        ${Line} {
            &:after {
                background-image: none;
                display: none;
            }
        }
    }
    
    @media ${screen.lg} {
        padding-left: 24px;
    
        &:last-child {
            padding-right: 24px;
        }
    }
    
    
`;

const StepsRoot = styled.div`
    width: 100%;
    display: flex;
    
    @media ${screen.lg} {
        width: 350px;
        margin-left: auto;
        margin-right: auto;
    }
`;
