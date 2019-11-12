// @flow
/**
 * PromotionCard
 */
import * as React from 'react';
import styled, {css} from 'styled-components';
import {FormattedMessage as I18N} from 'react-intl';
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

    cardType: string
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
        href: undefined
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
        const {href, thumbUrl, title, promotionStartTime, promotionEndTime, style, className, cardType} = this.props;
        const {day, hour, minute, second} = this.state;

        return (
            <PromotionCardLink
                style={style}
                href={href}
                cardType={cardType}
                className={cx(`d-flex align-content-between justify-content-between ${className}`, {className})}
            >
                <PhotoColumn className='photo-column'>
                    {thumbUrl && <PhotoUrl src={thumbUrl} alt={title} />}
                </PhotoColumn>

                <PromotionInfo className='promotion-info'>
                    <PromotionTime className='promotion-time'>
                        <span>
                            {dayjs(promotionStartTime).format('DD/MM/YYYY')} - {dayjs(promotionEndTime).format('DD/MM/YYYY')}
                        </span>
                    </PromotionTime>

                    <PromotionTitle className='promotion-title'>{title}</PromotionTitle>

                    <CountDownTime className='count-down-time'>
                        <div className="d-inline-flex flex-column justify-content-center align-items-center">
                            <Number className='number'>{day}</Number>
                            <Unit>
                                <I18N id='column.day' />
                            </Unit>
                        </div>
                        <div className="d-inline-flex flex-column justify-content-center align-items-center">
                            <Number className='number'>{hour}</Number>
                            <Unit>
                                <I18N id='column.hour' />
                            </Unit>
                        </div>
                        <div className="d-inline-flex flex-column justify-content-center align-items-center">
                            <Number className='number'>{minute}</Number>
                            <Unit>
                                <I18N id='column.min' />
                            </Unit>
                        </div>
                        <div className="d-inline-flex flex-column justify-content-center align-items-center">
                            <Number className='number'>{second}</Number>
                            <Unit>
                                <I18N id='column.sec' />
                            </Unit>
                        </div>
                    </CountDownTime>
                </PromotionInfo>
            </PromotionCardLink>
        );
    }
}

export default PromotionCard;

const Number = styled.span`
    font-size: ${px2vw(20)};
    line-height: ${px2vw(20)};
    font-weight: bold;
    text-align: center;
    color: ${props => props.theme.primaryColor};
    
    
    @media ${screen.lg} {
        font-size: 20px;
        line-height: 20px;
    }
`;

const Unit = styled.span`
    font-size: ${px2vw(10)};
    transform : scale(0.83);
    line-height: ${px2vw(7)};
    color: #737b8c;
    margin-top: ${px2vw(5)};
    
    @media ${screen.lg} {
        font-size: 10px;
        display: inline-block;
        line-height: 7px;
        margin-top: 5px;
    }
`;

const CountDownTime = styled.div`
    border-top: 1px solid rgba(198,198,198,0.2);
    padding-top: ${px2vw(3)};
    display: flex;
    justify-content: space-between;
    flex: 0 0 auto;
    
    @media ${screen.lg} {
        height: inherit;
        font-size: 24px;
        padding-top: 8px;
        align-items: center;
        justify-content: flex-start;
        
        > div{
            padding-right: 5px;
        }
    }
    
    @media ${screen.xl} {
        > div{
            padding-right: 10px;
        }
    }
`;

const PromotionTitle = styled.div`
    font-size: ${px2vw(11)};
    color: ${props=>props.theme.cardTitleColor};
    overflow: hidden;
    word-break: break-word;
    margin-bottom: 4px;
    max-height: ${px2vw(44)};
    line-height: 1.3;
    flex: 1 1 auto;
    font-weight: bold;
    
    
    @media ${screen.lg} {
        font-size: 12px;
        max-height: 45px;
    }
`;


const PromotionTime = styled.div`
    display: flex;
    color: #737b8c;
    font-size: ${px2vw(7)};
    padding-bottom: ${px2vw(4)};
    flex: 0 0 auto;
    
     @media ${screen.lg} {
        font-size: 12px;
        padding-bottom: 4px;
    }
`;

const PromotionInfo = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: ${px2vw(6)};
    width: 50%;
    
    @media ${screen.lg} {
        padding: 10px;
        max-width: calc(100% - 170px);
    }
`;

const PhotoUrl = styled.div`
    display: flex;
    flex: 0;
    width: 100%;
    height: 100%;
    background: no-repeat center center;
    background-image: url('${props => props.src}');
    background-size: cover;
`;

const PhotoColumn = styled.div`
    width: ${px2vw(150)};
    height: calc(${px2vw(150)} * 0.745);
    flex: 0 0 auto;
    
    @media ${screen.lg} {
        width: 100%;
        height: 124px;
        max-width: 170px;
    };
`;

const PromotionCardLink = styled(A)`
    background-color: ${props=> props.theme.cardBackgroundColor || '#2d2e2f'};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    
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
