// @flow
/**
 * PromotionThumb
 */
import * as React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {FormattedMessage as I18N} from 'react-intl';
import {paddingLeft, px2vw} from '@utils/format';
import {asset} from '@utils/uri';
import screen from '@themes/Screen';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    startTime: string,
    endTime: string,
    isNew: boolean,
    thumbUrl: string
};
type State = {};

class PromotionThumb extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined
    };

    constructor(props) {
        super(props);
        const {day, hour, minute, second} = this.handleTimeDiff(props.endTime);

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
        const {endTime} = this.props;
        this.countDownTimer = setInterval(() => {
            const {day, hour, minute, second} = this.handleTimeDiff(endTime);

            this.setState({
                day,
                hour,
                minute,
                second
            });
        }, 1000);
    };

    render() {
        const {className, style, startTime, endTime, isNew, thumbUrl} = this.props;
        const {day, hour, minute, second} = this.state;
        return (
            <PromotionThumbRoot className={className} style={style}>
                <ThumbView>
                    <Thumb src={thumbUrl} />

                    <CountDownTime>
                        <TimeBox className="d-inline-flex flex-column justify-content-center align-items-center">
                            <Number>{day}</Number>
                            <Unit>
                                <I18N id='column.day' />
                            </Unit>
                        </TimeBox>
                        <TimeBox className="d-inline-flex flex-column justify-content-center align-items-center">
                            <Number>{hour}</Number>
                            <Unit>
                                <I18N id='column.hour' />
                            </Unit>
                        </TimeBox>
                        <TimeBox className="d-inline-flex flex-column justify-content-center align-items-center">
                            <Number>{minute}</Number>
                            <Unit>
                                <I18N id='column.min' />
                            </Unit>
                        </TimeBox>
                        <TimeBox className="d-inline-flex flex-column justify-content-center align-items-center">
                            <Number>{second}</Number>
                            <Unit>
                                <I18N id='column.sec' />
                            </Unit>
                        </TimeBox>
                    </CountDownTime>

                    {isNew && <NewTag src={asset('common/images/tag-icon/icon-new.png')} />}
                </ThumbView>

                <PromotionTime>
                    {dayjs(startTime).format('DD/MM/YYYY')} - {dayjs(endTime).format('DD/MM/YYYY')}
                </PromotionTime>
            </PromotionThumbRoot>
        );
    }
}

export default PromotionThumb;

const PromotionTime = styled.div`
    font-size: ${px2vw(10)};
    color: ${props => props.theme.listTitleColor};
    margin: ${px2vw(10)} 0;
    padding: 0 ${px2vw(10)};
    
    @media ${screen.lg} {
        font-size: 10px;
        margin: 10px 0;
        padding: 0 10px;
    }
`;

const Number = styled.span`
    font-size: ${px2vw(16)};
    line-height: ${px2vw(14)};
    font-weight: bold;
    text-align: center;
    color: #fff;
    margin-bottom: ${px2vw(3)};
    
    @media ${screen.lg} {
        font-size: 16px;
        line-height: 14px;
        margin-bottom: 3px;
    }
`;

const Unit = styled.span`
    width: auto;
    height: ${px2vw(15)};
    padding-left: 4px;
    padding-right: 4px;
    line-height: 0;
    border-radius: ${px2vw(4)};
    font-size: ${px2vw(10)};
    color: #fff;
    background-color: ${props => props.theme.primaryColor};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    @media ${screen.lg} {
        height: 15px;
        border-radius: 4px;
        font-size: 12px;
    }
`;

const TimeBox = styled.div`
    margin-right: ${px2vw(10)};
    
    @media ${screen.lg} {
        margin-right: 10px;
    }
`;

const NewTag = styled.img`
    width: ${px2vw(25)};
    position: absolute;
    bottom: -${px2vw(22)};
    right: ${px2vw(10)};
    z-index: 1;
    
    @media ${screen.lg} {
        width: 25px;
        bottom: -22px;
        right: 10px;
    }
`;

const CountDownTime = styled.div`
    display: flex;
    position: absolute;
    left: ${px2vw(9)};
    bottom: ${px2vw(7)};
    
    @media ${screen.lg} {
        left: 9px;
        bottom: 7px;
    }
`;

const Thumb = styled.div`
    width: 100%;
    height: ${px2vw(220)};
    background: no-repeat top center;
    background-image: url('${props=>props.src}');
    background-size: cover;
    
    &::before {
      content: "";
      position: absolute;
      top: 0; 
      left: 0;
      z-index: 0;
      width: 100%; 
      height: 100%;
      background: linear-gradient(to bottom, rgba(226,226,226,0) 60%, rgba(0,0,0,.8) 100%);
    }
    
    @media ${screen.lg} {
        height: 320px;
        background-position: center;
    }
`;

const ThumbView = styled.div`
    position: relative;
`;

const PromotionThumbRoot = styled.div`
    position: relative;
`;
