// @flow
/**
 * PromotionCard
 */
import * as React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';
import dayjs from 'dayjs';
import screen from '@themes/Screen';

import Icon from '@components/atoms/Icon';

type Props = {
    style?: React.CSSProperties,
    className?: any,

    title?: string,
    promotionStartTime?: string,
    promotionEndTime?: string,
    pickTime?: string,
    thumbUrl?: string,
    qty?: number,
    isFree?: boolean,
    isUse?: boolean,
    onClick: Function,
    intl: {formatMessage: Function}
}
;

type State = {};

class CouponItem extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        title: '',
        qty: 0,
        isFree: false,
        promotionStartTime: '',
        promotionEndTime: '',
        pickTime: '',
        thumbUrl: '',
        isUse: false
    };


    render() {
        const {style, className, onClick,
            promotionStartTime, promotionEndTime,
            pickTime,
            title,
            thumbUrl,
            qty,
            isFree,
            isUse,
            intl: {formatMessage: i18n}
        } = this.props;

        return (
            <RootContainer
                style={style}
                className={className}
                onClick={() => !isUse ? onClick() : {}}
            >
                <CouponImg src={thumbUrl}/>
                <CouponContent>
                    <TimeText>
                        {dayjs(promotionStartTime).format('DD/MM/YYYY')} - {dayjs(promotionEndTime).format('DD/MM/YYYY')}
                    </TimeText>
                    <TitleHeight>
                        <TitleText>{title}</TitleText>
                    </TitleHeight>

                    {!isUse ? (
                        <Subtotal>
                            <Label>{isFree ? i18n({id: 'column.free'}) : i18n({id: 'action.deposit'})}</Label>
                            <CouponCount>
                                <span>{qty}</span>
                                <Multiplication>x</Multiplication>
                                <Icon
                                    code="coupon"
                                    size={15}
                                    color={siteConfig.theme.primaryColor}
                                    style={{marginLeft: 5, marginRight: 5}}
                                />
                            </CouponCount>
                        </Subtotal>
                    ) : (
                        <Subtotal>
                            <Detail>
                                {i18n({id: 'page.wallet.pickTime'})}
                            </Detail>
                            <Detail>
                                {dayjs(pickTime).format('DD/MM/YYYY H:mm:ss')}
                            </Detail>
                        </Subtotal>
                    )}

                </CouponContent>
            </RootContainer>
        );
    }
}

export default CouponItem;

const Label = styled.span`
    color: ${props => props.theme.primaryColor};
    font-size: ${px2vw(10)};
    opacity: .5;
    display: contents;
    
    @media ${screen.lg} {
        font-size: 12px;
    }
`;

const Multiplication= styled.div`
    display: inline-flex;
    margin-left: 5px;
    font-weight: 400;
    font-size: ${px2vw(12)};
    
    @media ${screen.lg} {
        font-size: 12px;
    }
`;



const CouponImg = styled.div`
    min-width: ${px2vw(101)};
    height: 100%;
    background: ${props => props.theme.cardBackgroundColor} no-repeat center center;
    background-image: url('${props => props.src}');
    background-size: cover;
    flex: 0 1 auto;
    
    @media ${screen.lg} {
        min-width: 170px;
    }
`;

const CouponContent = styled.div`
    padding: ${px2vw(7)} ${px2vw(7)} 0 ${px2vw(7)} ;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 auto;
    
    
    @media ${screen.lg} {
        padding: 7px 7px 0 7px;
    }
`;

const TimeText = styled.div`
    opacity: .5;
    color: ${props => props.theme.cardTitleColor};
    font-size: ${px2vw(8)};
    padding-bottom: ${px2vw(4)};
    
    @media ${screen.lg} {
        font-size: 12px;
        padding-bottom: 4px;
    }
`;

const TitleHeight = styled.div`;
    max-height: ${px2vw(53)};
    display: flex;
    align-items: center;
    margin-bottom: auto;
    
    @media ${screen.lg} {
       max-height: 53px;
    }
`;

const TitleText = styled.div`
    color: ${props => props.theme.cardContentColor};
    font-size: ${px2vw(14)};
    font-weight: 400;
    margin-bottom: ${px2vw(5)};
    
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    
    @media ${screen.lg} {
        font-size: 14px;
        margin-bottom: 5px;
    }
`;

const Subtotal = styled.div`
    color: ${props => props.theme.listDoubleBackgroundColor};
    font-size: ${px2vw(10)};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: ${px2vw(5)};
    padding-top: ${px2vw(5)};
    border-top: solid 1px rgba(206,206,206,.2);
    
    @media ${screen.lg} {
        font-size: 12px;
        padding-bottom: 5px;
        padding-top: 5px;
    }
`;

const CouponCount = styled.div`
    color: ${props => props.theme.primaryColor};
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: ${px2vw(15)};
    font-weight: 900;
    
    > span{
        font-style: italic;
    }
    
     @media ${screen.lg} {
        font-size: 15px;
    }
`;


const RootContainer = styled.div`
    color: ${props => props.theme.listTitleColor};
    margin-bottom ${px2vw(6)};
    // margin-left: ${px2vw(5)};
    // margin-right: ${px2vw(5)};
    height: ${px2vw(124)};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    background-color: ${props => props.theme.cardBackgroundColor};
    display: flex;
    flex-direction: row;
    
    &:hover{
        outline: 1px solid ${props => props.theme.primaryColor};
    }
    
     @media ${screen.lg} {
        margin-bottom: 6px;
        //margin-left: 5px;
        //margin-right: 5px;
        height: 124px;
    }
`;

const Detail = styled.span`
    opacity: .5;
    color: ${props => props.theme.cardTitleColor};
`;
