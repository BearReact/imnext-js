// @flow
/**
 * PromotionItem
 */
import * as React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import dayjs from 'dayjs';
import {paddingLeft, px2vw} from '@utils/format';
import screen from '@themes/Screen';

import A from '@components/atoms/A';

type Props = {
    style?: React.CSSProperties,
    className?: any,
    href?: string,
    title: string,
    promotionStartTime: string,
    promotionEndTime: string,
    thumbUrl: string,
    cardType: string,
    couponStatus?: string
};

type State = {
    day: string,
    hour: string,
    minute: string,
    second: string
};


class PromotionCard extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        href: undefined,
        couponStatus: undefined
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
        const {href, thumbUrl, title, promotionStartTime, promotionEndTime, style, className, cardType, couponStatus} = this.props;
        const {day, hour, minute, second} = this.state;

        return (
            <PromotionCardLink
                style={style}
                href={href}
                cardType={cardType}
                className={cx(`${className}`, {className})}
            >
                <PromotionStatus className="d-flex align-items-center">
                    {
                        couponStatus && <CouponFettle>{couponStatus}</CouponFettle>
                    }

                    <CountDownTime className="d-flex">
                        <div>
                            <Number>{day}D</Number>
                        </div>
                        <div>
                            <Number>{hour}H</Number>
                        </div>
                        <div>
                            <Number>{minute}M</Number>
                        </div>
                        <div>
                            <Number>{second}S</Number>
                        </div>
                    </CountDownTime>
                </PromotionStatus>

                {thumbUrl && <PhotoUrl src={thumbUrl} alt={title} />}

                <PromotionInfo>
                    <PromotionTime>
                        <span>
                            {dayjs(promotionStartTime).format('DD/MM/YYYY')} - {dayjs(promotionEndTime).format('DD/MM/YYYY')}
                        </span>
                    </PromotionTime>

                    <PromotionTitle>{title}</PromotionTitle>
                </PromotionInfo>
            </PromotionCardLink>
        );
    }
}

export default PromotionCard;

const Number = styled.span`
    font-size: ${px2vw(12)};
    line-height: ${px2vw(14)};
    font-weight: bold;
    
    @media ${screen.lg} {
        font-size: 12px;
        line-height: 14px;
    }
`;

const CountDownTime = styled.div`
    color: #737b8c;
    flex: 0 0 auto;
    margin-left: auto;
    padding-left: ${px2vw(16)};
    
    > div {
        margin-right: ${px2vw(4)};
        font-size: ${px2vw(12)};
        font-weight: bold;
        &:last-child {
            margin-right: 0;
        }
    }
    
    @media ${screen.lg} {
        padding-left: 16px;
        
        > div {
            margin-right: 4px;
            font-size: 12px;
        }
    }
`;

const PromotionTitle = styled.div`
    font-size: ${px2vw(14)};
    color: ${props=>props.theme.cardTitleColor};
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    
    @media ${screen.lg} {
        font-size: 14px;
    }
`;


const PromotionTime = styled.div`
    color: #737b8c;
    font-size: ${px2vw(12)};
    line-height: ${px2vw(14)};
    
    @media ${screen.lg} {
        font-size: 12px;
        line-height: 14px;
    }
`;

const PromotionInfo = styled.div`
    padding: ${px2vw(10)};
    text-align: center;
    
    @media ${screen.lg} {
        padding: 10px;
    }
`;

const PhotoUrl = styled.div`
    display: flex;
    flex: 0;
    width: 100%;
    height: 100%;
    padding-bottom: 72.95%;
    background: no-repeat center center;
    background-image: url('${props => props.src}');
    background-size: cover;
`;

const CouponFettle = styled.div`
    color: ${props=> props.theme.primaryColor || '#fdb913'};
    font-size: ${px2vw(14)};
    line-height: ${px2vw(30)};
    word-break: break-word;
    flex: 0 0 auto;
    
    @media ${screen.lg} {
       font-size: 14px;
       line-height: 30px;
    }
`;

const PromotionStatus = styled.div`
    padding: 0 ${px2vw(10)};
    height: ${px2vw(30)};
    justify-content: space-between;
    
    @media ${screen.lg} {
        padding: 0 10px;
        height: 30px;
    }
`;

const PromotionCardLink = styled(A)`
    background-color: ${props=> props.theme.cardBackgroundColor || '#2d2e2f'};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    
    &:after {
        content: '';
        display: none;
        border: solid 1px ${props => props.theme.primaryColor};
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    
    &:hover {
        &:after {
            display: block;
        }
    }
    
`;
