// @flow
/**
 * CircleProgressBar
 */
import * as React from 'react';
import styled, {css, keyframes} from 'styled-components';
import {asset} from '@utils/uri';

type Props = {
    className?: any,
    circleBG1?: string,
    circleBG2?: string,
    circleBG3?: string,
    numTitle?: number,
    unitTitle?: string,
    index?: string,
};

type State = {};

class CircleProgressBar extends React.PureComponent<Props, State>{
    static defaultProps = {
        className: undefined,
        // circleBG 漸層色, 1 = 深色, 2 = 中間色, 3 = 淺色
        circleBG1: '#a06718',
        circleBG2: '#B07914',
        circleBG3: '#eab707',
        numTitle: 60,
        unitTitle: '秒',
        index: 1
    };
    render() {
        const {className, circleBG1, circleBG2, circleBG3, numTitle, unitTitle, index} = this.props;
        return (
            <ProgressBarBlock className={className}>
                <ProgressBarImg src={asset('site/galaxy/images/CircleProgressBarBG.png')} />
                <ProgressBarSvg className="clock-bar" id="svg" width="114" height="114">
                    <defs>
                        <linearGradient id={index} gradientTransform="rotate(60 1 0.5)">
                            <stop offset="50%" stopColor={circleBG1}/>
                            <stop offset="80%" stopColor={circleBG2}/>
                            <stop offset="100%" stopColor={circleBG3}/>
                        </linearGradient>
                    </defs>
                    <ProgressBarCircle r="52" cx="57" cy="57" fill="transparent" strokeWidth="10" strokeDashoffset={-((numTitle * 3.26) - 326)}
                        style={{stroke: `url(#${index})`}} />
                </ProgressBarSvg>
                <ProgressBarText>
                    <Num>{numTitle}</Num>
                    <Unit>{unitTitle}</Unit>
                </ProgressBarText>
            </ProgressBarBlock>
        );
    }
}

export default CircleProgressBar;

const ProgressBarAni = keyframes`
  0%{
    stroke-dashoffset: 326.7256;
    }
`;

const ProgressBarBlock = styled.div`
    position: relative;
    width: 146px;
    height: 146px;
`;

const ProgressBarImg = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const ProgressBarSvg = styled.svg`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
`;

const ProgressBarCircle = styled.circle`
    stroke-dasharray: 326.7256;
    stroke-linecap: round;
    animation: ${ProgressBarAni} 1.5s ease-in-out
`;

const ProgressBarText = styled.p`
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Num = styled.span`
    font-size: 40px;
    font-weight: 900;
`;

const Unit = styled.span`
    font-size: 16px;
    padding-bottom: 7px;
    margin-top: auto;
    margin-left: 3px;
`;
