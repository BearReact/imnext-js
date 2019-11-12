// @flow
/**
 * VipLevelCard
 */
import React, {Fragment} from 'react';
import styled, {css} from 'styled-components';
import get from 'lodash/get';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';
import {formatCurrency} from '@utils/number';

import {asset} from '@utils/uri';
import {isEmpty} from '@utils/equal';
import Tooltips from '@components/atoms/Tooltips';
import Icon from '@components/atoms/Icon';
import Button from '@components/atoms/Button';

const vipLevelImage = [];
for (let i=0; i<=40; i+=1) {
    vipLevelImage.push({
        level: i,
        image: asset(`common/images/vip-level-icon/${i}.png`)
    });
}

const Country = siteConfig.country;

type Props = {
    style?: React.CSSProperties,
    isBonus?: boolean,
    isVipLevel?: boolean,
    className?: any,
    level: number,
    depositAmount: number,
    upLevelBonus: number,
    weekBonus: number,
    weekNeedDeposit: number,
    monthBonus: number,
    monthNeedDeposit: number,
    birthdayBonus: number,
    casinoRebate: string,
    sportRebate: string,
    slotsRebate: string,
    lotteryRebate: string,
    iPointBonusCalcUnit: string,
    intl: {formatMessage: Function}
};

type State = {
};

class VipLevelCard extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        isBonus: false,
        isVipLevel: false
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isOtherOpen: false
        };
    }

    // toolTips 開關
    handleToggle = () => {
        const {isOpen,isOtherOpen} = this.state;

        this.setState({isOpen: !isOpen});
        if(isOtherOpen) {
            this.setState({isOtherOpen: !isOtherOpen});
        }
    };

    handleOtherToggle = () => {
        const {isOpen,isOtherOpen} = this.state;

        this.setState({isOtherOpen: !isOtherOpen});

        if(isOpen) {
            this.setState({isOpen: !isOpen});
        }
    };

    rebateAre = () => {
        const {
            lotteryRebate,
            iPointBonusCalcUnit,
            intl: {formatMessage: i18n}
        } = this.props;

        if (Country === 'malaysia') {
            if (isEmpty(iPointBonusCalcUnit)) {
                return <Icon code="close-little" color="red" size={20} />;
            } else {
                return(
                    <Fragment>
                        <span>{i18n({id: 'page.vip.iPoint'})}</span>
                        {iPointBonusCalcUnit !== '0.00' && (
                            <TooltipsArea>
                                <Button onClick={this.handleOtherToggle}>
                                    <Icon code="info-square" color="#333333" size={20} type="svg"/>
                                </Button>

                                <CustomTooltipsAnimate
                                    position="bottomCenter"
                                    className="tooltip"
                                    text={i18n({id: 'page.vip.iPointTips'})}
                                />
                            </TooltipsArea>
                        )}
                    </Fragment>
                );
            }
        } else {
            if (isEmpty(lotteryRebate)) {
                return <Icon code="close-little" color="red" size={20} />;
            } else {
                return (
                    <span>
                        <span>{lotteryRebate}</span>
                    </span>
                );
            }
        }
    };

    render() {
        const {
            isBonus,
            isVipLevel,
            style,
            className,
            level,
            depositAmount,
            upLevelBonus,
            weekBonus,
            weekNeedDeposit,
            monthBonus,
            monthNeedDeposit,
            birthdayBonus,
            casinoRebate,
            sportRebate,
            slotsRebate,
            intl: {formatMessage: i18n},
            iPointBonusCalcUnit
        } = this.props;

        const levelIcon = vipLevelImage.find(item => item.level === level);

        return (
            <VipLevelCardRoot
                style={style}
                className={className}
                isVipLevel={isVipLevel}
            >
                <VipLevelImage>
                    <img src={get(levelIcon, 'image')}/>
                </VipLevelImage>

                <VipLevelContent>

                    <VipLevel>
                        {level}
                    </VipLevel>

                    <VipLevelItem>
                        <ItemInner>
                            <ItemTitle>{isBonus ? i18n({id: 'page.vip.upLevel'}) : i18n({id: 'page.vip.casino'})}</ItemTitle>
                            {
                                isBonus ?
                                    <ItemValue>
                                        {isEmpty(upLevelBonus) ?
                                            <Icon code="close-little" color="red" size={20} /> :
                                            `$ ${formatCurrency(upLevelBonus, false)}`
                                        }
                                    </ItemValue> :
                                    <ItemValue>
                                        {isEmpty(casinoRebate) ?
                                            <Icon code="close-little" color="red" size={20} /> :
                                            casinoRebate
                                        }
                                    </ItemValue>
                            }
                        </ItemInner>
                    </VipLevelItem>

                    <WeekVipLevelItem>
                        <ItemInner>
                            <ItemTitle>{isBonus ? i18n({id: 'page.vip.weekBonus'}) : i18n({id: 'page.vip.sport'})}</ItemTitle>
                            {
                                isBonus ?
                                    <ItemValue>
                                        {isEmpty(weekBonus) ?
                                            <Icon code="close-little" color="red" size={20} /> :
                                            <Fragment>
                                                <span>
                                                    {weekBonus !==0 && i18n({id: 'page.vip.upTo'})}
                                                    <span> {`$${formatCurrency(weekBonus, false)}`}</span>
                                                </span>

                                                { weekBonus !== 0 &&
                                                    <TooltipsArea>
                                                        <Button onClick={this.handleToggle}>
                                                            <Icon code="info-square" color="#333333" size={20} type="svg"/>
                                                        </Button>

                                                        <CustomTooltipsAnimate
                                                            position="bottomCenter"
                                                            className="tooltip"
                                                            text={level === 1 ? `${i18n({id: 'page.vip.depositNeedOfWeek'}, {weekBonus: formatCurrency(weekBonus, false), depositNeed: formatCurrency(weekNeedDeposit, false)})}` :
                                                                `${i18n({id: 'page.vip.depositNeedOfWeek'}, {weekBonus: formatCurrency(weekBonus, false), depositNeed: formatCurrency(weekNeedDeposit, false)})} \n ${i18n({id: 'page.vip.depositNeedOfWeekOr'})}`
                                                            }
                                                        />
                                                    </TooltipsArea>
                                                }
                                            </Fragment>
                                        }

                                    </ItemValue> :
                                    <ItemValue>
                                        {isEmpty(sportRebate) ?
                                            <Icon code="close-little" color="red" size={20} /> :
                                            sportRebate
                                        }
                                    </ItemValue>
                            }
                        </ItemInner>
                    </WeekVipLevelItem>

                    <MonthVipLevelItem>
                        <ItemInner>
                            <ItemTitle>{isBonus ? i18n({id: 'page.vip.monthBonus'}) : i18n({id: 'page.vip.slot'})}</ItemTitle>
                            {
                                isBonus ?
                                    <ItemValue>
                                        {isEmpty(monthBonus) ?
                                            <Icon code="close-little" color="red" size={20} /> :
                                            <Fragment>
                                                <span>
                                                    {monthBonus !== 0 && i18n({id: 'page.vip.upTo'})}
                                                    <span> ${formatCurrency(monthBonus, false)}</span>
                                                </span>
                                                { monthBonus !== 0 &&
                                                    <TooltipsArea>
                                                        <Button onClick={this.handleOtherToggle}>
                                                            <Icon code="info-square" color="#333333" size={20} type="svg"/>
                                                        </Button>

                                                        <CustomTooltipsAnimate
                                                            position="bottomCenter"
                                                            className="tooltip"
                                                            text={level === 1 ? `${i18n({id: 'page.vip.depositNeedOfMonth'}, {monthBonus: formatCurrency(monthBonus, false), depositNeed: formatCurrency(monthNeedDeposit, false)})}`:
                                                                `${i18n({id: 'page.vip.depositNeedOfMonth'}, {monthBonus: formatCurrency(monthBonus, false), depositNeed: formatCurrency(monthNeedDeposit, false)})} \n ${i18n({id: 'page.vip.depositNeedOfMonthOr'})}`
                                                            }
                                                        />
                                                    </TooltipsArea>
                                                }
                                            </Fragment>

                                        }
                                    </ItemValue> :
                                    <ItemValue>
                                        {isEmpty(slotsRebate) ?
                                            <Icon code="close-little" color="red" size={20} /> :
                                            slotsRebate
                                        }
                                    </ItemValue>

                            }
                        </ItemInner>
                    </MonthVipLevelItem>

                    <IpointVipLevelItem>
                        <ItemInner>
                            <IpointItemTitle>{isBonus ? i18n({id: 'page.vip.birthdayBonus'}) :
                                (Country === 'malaysia' ? (<span>{i18n({id: 'page.vip.iPointEvery'})} <span> ${formatCurrency(iPointBonusCalcUnit, false)}</span></span>) : i18n({id: 'page.vip.lottery'}))}
                            </IpointItemTitle>

                            {
                                isBonus ?
                                    <IpointItemValue>
                                        {isEmpty(birthdayBonus) ?
                                            <Icon code="close-little" color="red" size={20} /> :
                                            <Fragment>
                                                <span>
                                                    {birthdayBonus !==0 && i18n({id: 'page.vip.upTo'})}
                                                    <span> ${formatCurrency(birthdayBonus, false)}</span>
                                                </span>
                                            </Fragment>
                                        }
                                    </IpointItemValue> :
                                    <IpointItemValue>
                                        {this.rebateAre()}
                                    </IpointItemValue>
                            }

                        </ItemInner>
                    </IpointVipLevelItem>

                </VipLevelContent>

                <VipLevelFooter>
                    <VipLevelItem>
                        <ItemInner>
                            <ItemTitle>{i18n({id: 'page.vip.depositAmount'})}</ItemTitle>
                            <ItemValue>${formatCurrency(depositAmount, false)}</ItemValue>
                        </ItemInner>
                    </VipLevelItem>
                </VipLevelFooter>

                <VipLevelCardBg>
                    <img src={asset('common/images/vip-level-icon/0.png')} alt=""/>
                </VipLevelCardBg>

            </VipLevelCardRoot>
        );
    }
}

export default VipLevelCard;


const VipLevelImage = styled.div`
    margin-top: -${px2vw(17.5)};
    img {
        width: ${px2vw(35)};
        height: ${px2vw(35)};
    }
    @media ${screen.lg} {
        margin-top: -25px;
        img {
            width: 50px;
            height: 50px;
        }
    }
    
`;

const VipLevelContent = styled.div`
    width: 100%;
    flex: 1 1 auto;
    padding: ${px2vw(10)} ${px2vw(15)} 0;
    z-index: 2;
    
    @media ${screen.lg} {
        padding: 34px 15px 0;
    }

`;

const VipLevel = styled.div`
    width: ${px2vw(110)};
    font-size: ${px2vw(14)};
    height: ${px2vw(30)};
    line-height: ${px2vw(30)};
    border-radius: ${px2vw(20)};
    max-width: 100%;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.2);
    transition: all .2s ease-in;
    
    @media ${screen.lg} {
        width: 110px;
        font-size: 24px;
        height: 30px;
        line-height: 30px;
    }

`;

const VipLevelItem = styled.div`
    padding: ${px2vw(10)} 0;
    display: flex;
    align-items: center;
    color: #4a4a4a;
    border-bottom: solid 1px #e8e8e8;
    
    @media ${screen.lg} {
        padding: 20px 0;
    }

    &:last-child {
        border-bottom: none;
    }

`;

const ItemInner = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ItemTitle = styled.div`
    font-size: ${px2vw(10)};
    transition: all .2s ease-in;
    
    @media ${screen.lg} {
        font-size: 12px;
    }
`;

const IpointItemTitle = styled(ItemTitle)`
    white-space: nowrap;
    // $金額預設樣式
    span {
        > span {
            transition: all .2s ease-in;
            color: #004e6b;
            font-weight: 700;
        }
    }
`;

const ItemValue = styled.div`
    font-size: ${px2vw(12)};
    font-weight: 700;
    transition: all .2s ease-in;
    color: ${siteConfig.theme.vipSwitchTextColor ? siteConfig.theme.vipSwitchTextColor : '#004e6b'};
    display: flex;
    align-items: center;
    
    span{
        font-size: ${px2vw(12)};
        color: #4a4a4a;
        font-weight: normal;
        white-space: nowrap;

        > span {
            color: ${siteConfig.theme.vipSwitchTextColor ? siteConfig.theme.vipSwitchTextColor : '#004e6b'};
            font-weight: 700;
        }

        @media ${screen.lg} {
            font-size: 12px;
        }
    }

    @media ${screen.lg} {
        font-size: 12px;
        //font-size: 16px;
    }
`;

const IpointItemValue = styled(ItemValue)`
        text-align: right;
        color: #4a4a4a;
        font-size: 12px;
        font-weight: normal;
        
        > span {
            white-space: unset;
        }
`;

const CustomTooltipsAnimate = styled(Tooltips)`
    white-space: pre-wrap;
    width: ${px2vw(170)};
    height: auto;
    font-size: ${px2vw(14)};
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.5);
    color: #4a4a4a;
    z-index: 99;
    padding-bottom: 0;
    display: none;
    opacity: 0;
    transition: opacity .2s ease-in;
    bottom: 20%;
    
    @media ${screen.lg} {
        width: 170px;
        font-size: 14px;
    }

    > div:first-child {
        border-color: #fffde3 transparent transparent;
    }

    > div:last-child {
      background-color: #fffde3;
      padding: ${px2vw(10)};
      min-height: auto;
      min-width: 100%;
      height: auto;
      
      @media ${screen.lg} {
        padding: 10px;
      }
    }

`;

const TooltipsArea = styled.div`
    text-align: center;
    margin-left: 5px;
    
    &:hover {
        ${CustomTooltipsAnimate} {
            display: block;
            opacity: 1;
        }
    }
    
    button {
        padding: 0;
    }
    
`;

const WeekVipLevelItem = styled(VipLevelItem)`
    position: relative;
    
    @media screen and (max-width: 991px){
         &:hover {
            ${CustomTooltipsAnimate} {
                display: block;
                opacity: 1;
            }
        }
    }
`;

const MonthVipLevelItem = styled(VipLevelItem)`
    position: relative;
    
     @media screen and (max-width: 991px){
         &:hover {
            ${CustomTooltipsAnimate} {
                display: block;
                opacity: 1;
            }
        }
    }
`;

const IpointVipLevelItem = styled(VipLevelItem)`

     @media screen and (max-width: 991px){
         &:hover {
            ${CustomTooltipsAnimate} {
                display: block;
                opacity: 1;
            }
        }
    }
`;

const VipLevelFooter = styled.div`
    background-color: #36393f;
    width: 100%;
    padding: 0 ${px2vw(15)};
    transition: all .2s ease-in;
    border-radius: 0 0 5px 5px;
    z-index: 1;
    
    @media ${screen.lg} {
        padding: 0 15px;
    }
    
    ${VipLevelItem} {
        color: #fff;
        ${ItemValue} {
            color: #fff;
        }
    }
`;

const VipLevelCardBg = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: ${px2vw(220)};
    overflow: hidden;
    opacity: 0;

    > img {
        position: absolute;
        bottom: 0;
        z-index: 0;
        left: -${px2vw(47)};
        width: ${px2vw(150)};
        height: ${px2vw(150)};
    }
        
    @media ${screen.lg} {
        height: 220px;
        
        > img {
            left: -47px;
            width: 220px;
            height: 220px;
        }
    }
`;


const VipLevelCardRoot = styled.div`
    border-radius: 5px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all .2s ease-in;

    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: -1;
        background-image: linear-gradient(to bottom, ${siteConfig.theme.vipCardBackgroundColor1}, ${siteConfig.theme.vipCardBackgroundColor2});
        transition: all .2s ease-in;
        border-radius: 5px;
    }

    @media ${screen.lg} {
        z-index: 1;

        &:hover:before {
            opacity: 1;
        }

        &:hover {

            transform: scale(1.1);

            ${VipLevel} {

                background-color: rgba(255,255,255,.2);
            }
            ${VipLevelContent} {
            
                ${ItemTitle} {
                    color: #fff;
                    
                    span > span {
                        color: #000;
                    }
                }
                
                ${ItemValue} {
                    color: #000;
                    
                    span{
                        color: #fff;
                        
                        > span {
                            color: #000;
                        }
                    }
                }
                
                ${IpointItemValue} {
                    color: #fff;
                }

            }
            ${VipLevelFooter} {
                background-color: #fff;

                ${ItemTitle} {
                    color: #004e6b;
                }
                ${ItemValue} {
                    color: #004e6b;
                }
            }
            
            ${VipLevelCardBg} {
                opacity: .1;
            }
        }
        
        //  >screen.lg時 指定登入會員等級樣式 
        ${props => props.isVipLevel && css`
            &:before {
                opacity: 1;
            }
    
            transform: scale(1.1);
    
            ${VipLevel} {
    
                background-color: rgba(255,255,255,.2);
            }
    
            ${VipLevelContent} {
    
                ${ItemTitle} {
                    color: #fff;
                    
                    span > span {
                        color: #000;
                    }
                }
                
                ${ItemValue} {
                    color: #000;
                    
                    span{
                        color: #fff;
                        
                        > span {
                             color: #000;
                        }
                    }
                }
                
                ${IpointItemValue} {
                    color: #fff;
                }
            }
    
            ${VipLevelFooter} {
                background-color: #fff;
    
                ${ItemTitle} {
                    color: #004e6b;
                }
                ${ItemValue} {
                    color: #004e6b;
                }
            }
            
            ${VipLevelCardBg} {
                opacity: .1;
            }
        `}
    }
`;
