// @flow
/**
 * ProgressBar
 */
import * as React from 'react';
import styled, {screen} from '@library/styled-components';
import {px2vw} from '@utils/format';
import {formatCurrency} from '@utils/number';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    progress: number,
    transitionTime?: number,
    isShowProgressText?: boolean,
    theme?: 'default' | 'gray',
    needRollingAmount?: number,
    currentRollingAmount?: number,
    isShowProgressNumber?: boolean,
    lineBarRadius?: number
};
type State = {};


const themeConfig = {
    default: {
        bgColor: siteConfig.theme.primaryGradientColor
    },
    gray: {
        bgColor: '#757F8E'
    }
};

class ProgressBar extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        transitionTime: 600,
        isShowProgressText: false,
        theme: 'default',
        isShowProgressNumber: false,
        needRollingAmount: 0,
        currentRollingAmount: 0,
        lineBarRadius: 0
    };

    render() {
        const {className, style, transitionTime, isShowProgressText, theme, isShowProgressNumber, currentRollingAmount, needRollingAmount, progress, lineBarRadius} = this.props;
        const themeProps = theme ? themeConfig[theme] : {};
        const result = progress ? progress : Math.round(currentRollingAmount / needRollingAmount * 100 || 0);

        return (
            <ProgressBarRoot className={className} style={style} isPromotionEvent={themeProps}>
                <ProgressBarLine progress={result} transitionTime={transitionTime} isPromotionEvent={themeProps} lineBarRadius={lineBarRadius}/>

                {/* 顯示百分比 */}
                {isShowProgressText &&
                <Percent>{result} %</Percent>
                }

                {/* 顯示分子分母 */}
                {isShowProgressNumber &&
                <Percent2Num>{formatCurrency(currentRollingAmount, false)} / {formatCurrency(needRollingAmount, false)} </Percent2Num>
                }
            </ProgressBarRoot>
        );
    }
}

export default ProgressBar;

const Percent = styled.span`
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-shadow: 0 1px 0 #000000;
    font-size: ${px2vw(16)};
    font-weight: 900;
    text-align: center;
    color: #ffffff;
    
    @media ${screen.lg} {
        font-size: 14px;
    }
`;

const Percent2Num = styled.span`
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-shadow: 0 1px 0 #000000;
    font-size: ${px2vw(16)};
    font-weight: 900;
    text-align: center;
    color: #ffffff;
    
    @media ${screen.lg} {
        font-size: 14px;
    }
`;


const ProgressBarLine = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    background-color: ${props => props.theme.primaryColor};
    border-radius: 0;
    background-image: linear-gradient(
        -60deg,
        rgba(255, 255, 255, 0.24) 25%,
        transparent 0,
        transparent 50%,
        rgba(255, 255, 255, 0.24) 0,
        rgba(255, 255, 255, 0.24) 75%,
        transparent 0,
        transparent
    );
    background-size: 30px 50px;
    transition: width ${props => props.transitionTime}ms ease;
    -webkit-animation: progress-bar-stripes 1.2s linear infinite;
    animation: progress-bar-stripes 1.2s linear infinite;
    width: ${props => props.progress}%;
    &:before {
        content: '';
        position: absolute;
        background-color: rgba(255, 255, 255, 0.2);
        width: 100%;
        height: 50%;
        top: 0;
        left: 0;
    }
`;

const ProgressBarRoot = styled.div`
    position: relative;
    display: flex;
    height: ${px2vw(22)};
    overflow: hidden;
    font-size: ${px2vw(12)};
    background-color: #363636;
    border-radius: ${px2vw(3)};
    width: 100%;
    border: 1px solid ${props => props.theme.primaryColor};
    @-webkit-keyframes progress-bar-stripes {
        from {
            background-position: 30px 0;
        }
        to {
            background-position: 0 0;
        }
    }
    @keyframes progress-bar-stripes {
        from {
            background-position: 30px 0;
        }
        to {
            background-position: 0 0;
        }
    }
`;
