// @flow
/**
 * Counter
 */
import * as React from 'react';
import styled, {css} from 'styled-components';
import cx from 'classnames';
import dayjs from 'dayjs';
import {paddingLeft, px2vw} from '@utils/format';
import screen from '@themes/Screen';

type Props = {
    style?: React.CSSProperties,
    className?: any,
    promotionEndTime: string,
    dayText: string,
    hourText: string,
    minuteText: string,
    secondText: string
};

type State = {
    day: string,
    hour: string,
    minute: string,
    second: string
};

class Counter extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined
    };

    constructor(props) {
        super(props);
        const {day, hour, minute, second} = this.handleTimeDiff(props.promotionEndTime);

        this.state = {
            day,
            hour,
            minute,
            second
        };
    }

    componentDidMount() {
        this.resolveTime();
    }

    componentWillUnmount() {
        clearInterval(this.countDownTimer);
    }

    handleTimeDiff = deadline => {
        const oneDay = 1000 * 24 * 60 * 60;
        const oneHOUR = 1000 * 60 * 60;
        const oneMin = 1000 * 60;
        const oneSec = 1000;
        const now = dayjs();
        const promotionTime = dayjs(deadline);

        let diff = promotionTime.diff(now);

        // 天
        const leftDay = Math.floor(diff / oneDay);
        if (leftDay > 0) {
            diff -= leftDay * oneDay;
        }

        // 時
        const leftHours = Math.floor(diff / oneHOUR);
        if (leftHours > 0) {
            diff -= leftHours * oneHOUR;
        }

        // 分
        const leftMins = Math.floor(diff / oneMin);
        if (leftMins > 0) {
            diff -= leftMins * oneMin;
        }

        // 秒
        const leftSecs = Math.floor(diff / oneSec);

        if (diff <= 0) {
            clearInterval(this.countDownTimer);
            return {
                day: '00',
                hour: '00',
                minute: '00',
                second: '00'
            };
        }else if(leftDay >= 999) {
            clearInterval(this.countDownTimer);
            return {
                day: '999',
                hour: '999',
                minute: '999',
                second: '999'
            };
        }

        return {
            day: paddingLeft(leftDay, 2),
            hour: paddingLeft(leftHours, 2),
            minute: paddingLeft(leftMins, 2),
            second: paddingLeft(leftSecs, 2)
        };
    };

    resolveTime = () => {
        const {promotionEndTime} = this.props;
        this.countDownTimer = setInterval(() => {
            const {day, hour, minute, second} = this.handleTimeDiff(promotionEndTime);

            this.setState({
                day,
                hour,
                minute,
                second
            });
        }, 1000);
    };

    render() {
        const {style, className, dayText, hourText, minuteText, secondText} = this.props;
        const {day, hour, minute, second} = this.state;

        return (
            <div
                style={style}
                className={cx(`d-flex ${className}`, {className})}
            >

                <TimerBlock className='d-flex'>
                    <Timer>
                        <span className='span'>{day}</span>
                        <span>
                            {dayText}
                        </span>
                    </Timer>
                    <Timer>
                        <span className='span'>{hour}</span>
                        <span>
                            {hourText}
                        </span>
                    </Timer>
                    <Timer>
                        <span className='span'>{minute}</span>
                        <span>
                            {minuteText}
                        </span>
                    </Timer>
                    <Timer>
                        <span className='span'>{second}</span>
                        <span>
                            {secondText}
                        </span>
                    </Timer>
                </TimerBlock>
            </div>
        );
    }
}

export default Counter;

const TimerBlock = styled.ul`
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;
    font-size: ${px2vw(12)};
    font-weight: bold;
    color: #9b9b9b;
    
    @media ${screen.lg} {
        font-size: 12px;
    }
`;

const Timer = styled.li`
    margin-right: ${px2vw(2)};
    line-height: 1;
    display: inline-block;
    
    &:last-of-type{
        margin-right: 0;
    }
    
    @media ${screen.lg} {
        margin-right: 2px;
    }
`;
