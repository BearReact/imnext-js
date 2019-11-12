// @flow
/**
 * VipLevelList
 */
import React, {useState, useEffect} from 'react';
import styled, {css} from '@library/styled-components';
import screen from '@themes/Screen';
import VipLevelCard from '@components/molecules/VipLevelCard';
import Swiper from 'react-id-swiper';
import {isEmpty} from '@utils/equal';
import {px2vw} from '@utils/format';
import Icon from '@components/atoms/Icon';
import {ListSelect} from '@components/atoms/Select';



type Props = {
    style?: React.CSSProperties,
    className?: string,
    source?: Array<{
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
        iPointBonusCalcUnit: string
    }>,
    isMemberLevel?: boolean,
    memberLevel?: number,
    intl: {formatMessage: Function}
};

function VipLevelList(props: Props) {

    const [isBonus, setIsBonus] = useState(true);
    const [isRebate, setIsRebate] = useState(false);
    const [selectValue, setSelectValue] = useState('');
    const [swiper, updateSwiper] = useState(null);

    const valueToggle = () => {
        setIsBonus(!isBonus);
        setIsRebate(!isRebate);
    };

    const handleChange = (e) => {
        setSelectValue(e);

        if (swiper !== null) {
            swiper.slideTo(e);
        }
    };

    const goNext = () => {
        if (swiper !== null) {
            swiper.slideNext();
            setSelectValue(swiper.realIndex);
        }
    };

    const goPrev = () => {
        if (swiper !== null) {
            swiper.slidePrev();
            setSelectValue(swiper.realIndex);
        }
    };


    const {
        source,
        isMemberLevel,
        memberLevel,
        intl: {formatMessage: i18n}
    } = props;

    let optionList = [];
    source.map((row, index) => {
        optionList.push({
            value: index,
            text: row.level
        });
    });

    const swiperConfig = {
        slidesPerView: 8,
        spaceBetween: 20,
        ContainerEl: 'section',
        WrapperEl: 'section',
        shouldSwiperUpdate: true,
        centeredSlides: false,
        centerInsufficientSlides: true,
        loop: false,     // 迴圈關閉
        allowTouchMove: true,  // 拖曳
        initialSlide: memberLevel, // 指定預設某個等級
        breakpoints: {
            1800: {
                slidesPerView: 7,
                centeredSlides: false,
                allowTouchMove: true
            },
            1600: {
                slidesPerView: 6,
                centeredSlides: false,
                allowTouchMove: true
            },
            1540: {
                slidesPerView: 5,
                centeredSlides: false,
                allowTouchMove: true
            },
            1200: {
                slidesPerView: 3,
                centeredSlides: false,
                allowTouchMove: true
            },
            991: {
                slidesPerView: 1.5,
                centeredSlides: true
            }
        }
    };

    useEffect(() => {
        if (swiper !== null) {
            swiper.on('slideChange', () => setSelectValue(swiper.realIndex));
        }
    }, [swiper]);


    return (
        <VipLevelListRoot>
            {/* Swiper Area */}

            <SwiperContainer className="d-lg-block">

                <ListControlArea>
                    <CotrolAreaTitle>
                        {i18n({id: 'page.vip.level'})}
                        <span>
                            ({isEmpty(selectValue) ? memberLevel: selectValue})
                        </span>
                        <ListSelect
                            value={isEmpty(selectValue) ? memberLevel : selectValue}
                            options={optionList}
                            onChange={(e) => handleChange(e)}
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                height: '100%',
                                opacity: 0
                            }}
                        />
                    </CotrolAreaTitle>
                    <SwitchButtonArea>

                        <CustomerButton
                            isBonus={isBonus}
                            onClick={() => valueToggle()}
                        >
                            {i18n({id: 'page.vip.bonus'})}
                            <BonusIcon code="usd-circle" size={20} isBonus={isBonus} color={isBonus ? `${siteConfig.theme.vipSwitchIconColor}` : '#737b8c'} />
                        </CustomerButton>

                        <CustomerButton
                            isBonus={isRebate}
                            onClick={() => valueToggle()}
                        >
                            {i18n({id: 'page.vip.rebate'})}
                            <RebateIcon code="tint" size={20} isRebate={isRebate} color={isRebate ? `${siteConfig.theme.vipSwitchIconColor}` : '#737b8c'} />
                        </CustomerButton>

                    </SwitchButtonArea>

                </ListControlArea>

                <Swiper
                    shouldSwiperUpdate
                    {...swiperConfig}
                    getSwiper={updateSwiper}
                >
                    {!isEmpty(source) && source.map(row => {
                        return(
                            <VipLevelCardArea
                                key={row.level}
                            >
                                <VipLevelCard
                                    level={row.level}
                                    isBonus={isBonus}
                                    isVipLevel={Number(isMemberLevel) === Number(row.level)}
                                    depositAmount={row.depositAmount}
                                    upLevelBonus={row.upLevelBonus}
                                    weekBonus={row.weekBonus}
                                    weekNeedDeposit={row.weekNeedDeposit}
                                    monthBonus={row.monthBonus}
                                    monthNeedDeposit={row.monthNeedDeposit}
                                    birthdayBonus={row.birthdayBonus}
                                    casinoRebate={row.casinoRebate}
                                    sportRebate={row.sportRebate}
                                    slotsRebate={row.slotsRebate}
                                    lotteryRebate={row.lotteryRebate}
                                    iPointBonusCalcUnit={row.iPointBonusCalcUnit}
                                />
                            </VipLevelCardArea>

                        );
                    })}
                </Swiper>
                <PrevButton className="swiper-button-prev" onClick={goPrev}>
                    <Icon code="arrow-left" size={20} />{i18n({id: 'page.vip.back'})}
                </PrevButton>
                <NextButton className="swiper-button-next" onClick={goNext}>
                    {i18n({id: 'page.vip.next'})}<Icon code="arrow-right" size={20} />
                </NextButton>
            </SwiperContainer>

        </VipLevelListRoot>
    );
}

VipLevelList.defaultProps = {
    style: undefined,
    className: undefined,
    source: [],
    isMemberLevel: false,
    memberLevel: 0
};

export default VipLevelList;


const VipLevelListRoot = styled.div`
    background-color: ${siteConfig.theme.vipLevelBlockBackgroundColor};
    padding: ${px2vw(20)} ${px2vw(10)} 0;
    min-height: ${px2vw(140)};
    z-index: 2;

    @media ${screen.lg} {
        padding: 26px 50px 0;
        min-height: 140px;
    }
`;

// swiper樣式調整
const SwiperContainer = styled.div`
    position: relative;
    justify-content: center;
    
    .swiper-container {
        padding-top: ${px2vw(132)};
        padding-left: ${px2vw(15)};
        padding-right: ${px2vw(15)};
        padding-bottom: ${px2vw(48)};
        overflow: inherit;
        
        @media ${screen.lg} {
            padding-top: 132px;
            padding-left: 15px;
            padding-right: 15px;
            padding-bottom: 48px;
        }
    }

    // 手機版時調整swiper中心模式樣式
    @media screen and (max-width: 991px){
        // ActiveSlide
        .swiper-slide-active {
            z-index: 1;
            // 最外層div => VipLevelCardRoot 由List的swiper-slide-active 選取裡面的 div改寫樣式
            > div {
                &:before {
                    opacity: 1;
                }
                transform: scale(1.1);
                
                // 內層div => VipLevelContent 文字細節樣式這邊調整
                > div:nth-child(2) {
                
                    // VipLevelContent裡面第一個div => VipLevel 等級數字樣式這邊調整
                    > div:first-child {
                        background-color: rgba(255,255,255,.2);
                    }
                    
                    // VipLevelContent裡面第一個以外的div => 4個 VipLevelItem Item的樣式這邊調整    
                    > div:not(:first-child) {
                        
                        // div => Item-Inner Item的容器
                        > div{
                            // div => Item-Title Item的標題樣式
                            > div:nth-child(1) {
                                color: #fff;
                                
                                // Every後面的金額
                                span > span {
                                    color: #f8e71c;
                                }
                            }
                             // div => Item-Value Item的數值樣式
                            > div:nth-child(2) {
                                color: #f8e71c;
                                
                                // Gets 1 iPoint的文字樣式
                                span{ 
                                    color: #fff;
                                    font-size: ${px2vw(12)};
                                    span {
                                        color: #f8e71c;
                                    }
                                }
                            }
                        }
                        
                    }
                }
                
                // 內層div => VipLevelFooter 最底下黑色區塊文字細節樣式這邊調整
                > div:nth-child(3) {
                    background-color: #fff;
                    // Item > ItemInner > ItemTitle && ItemValue
                    > div > div > div  {
                        color: #004e6b;
                    }
                }
                
                // 內層div => 鑽石背景
                > div:nth-child(4) {
                    opacity: .1;
                }
            
            }
        }

    }

    // Slide
    .swiper-slide {
        transition: z-index .2s ease-in;

        &:hover {
            z-index: 2;
        }
    }

    // Arrow
    .swiper-button-next, .swiper-button-prev {
    }

`;

const ListControlArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: ${px2vw(21)} 0 ${px2vw(48)};
    width: 50%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    z-index: 6;
    
    @media ${screen.lg} {
        padding: 21px 0 48px;

        span {
            display: none;
        }
    }
`;

const CotrolAreaTitle = styled.div`
    color: #737b8c;
    font-size: ${px2vw(12)};
    text-align: center;
    position: absolute;
    left: 50%;
    top: ${px2vw(83)};
    transform: translate(-50%);
    
    > span {
        margin-left: 5px;
    }

    @media ${screen.lg} {
        font-size: 16px;
        padding: 10px 0;
        position: static;
        transform: unset;
        pointer-events: none;
    }
`;


const SwitchButtonArea = styled.div`
    width: ${px2vw(188)};
    height: ${px2vw(30)};
    border-radius: ${px2vw(27)};
    background-color: #b7b8bc;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${screen.lg} {
        width: 188px;
        height: 30px;
        border-radius: 27px;
    }
`;

const BonusIcon = styled(Icon)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -${px2vw(40)};

    @media ${screen.lg} {
        left: -40px;
    }
`;

const RebateIcon = styled(BonusIcon)`
    left: auto;
    right: -${px2vw(40)};

    @media ${screen.lg} {
        left: auto;
        right: -40px;
    }
`;

const CustomerButton = styled.button`
    border: none;
    width: 50%;
    height: 100%;
    background-color: #b7b8bc;
    border-radius: ${px2vw(15)};
    font-size: ${px2vw(14)};
    font-weight: 700;
    color: #737b8c;
    position: relative;
    transition: all .5s ease;

    ${props => props.isBonus && css`
        background: linear-gradient(to bottom, ${siteConfig.theme.vipSwitchBackgroundColor1} , ${siteConfig.theme.vipSwitchBackgroundColor2});
        color: ${siteConfig.theme.vipSwitchTextColor};
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
        pointer-events: none;
    `};

    @media ${screen.lg} {
        font-size: 14px;
        border-radius: 15px
    }
`;

const VipLevelCardArea = styled.div`
    padding: ${px2vw(34)} 0 0;

    @media ${screen.lg} {
        padding: 50px 0 0;
    }
`;

const PrevButton = styled.button`
    // swiperPrev reset
    width: auto;
    height: auto;
    background: none;
    z-index: 2;
    border: none;
    padding: 5px 20px;
    left: 0;
    border-radius: ${px2vw(20)};
    top: ${px2vw(95)};
    font-size: ${px2vw(12)};
    color: #737b8c;
    font-weight: 700;
    display: flex;
    align-items: center;
    transition: all .2s ease-in;
    
    i {
        margin-right: ${px2vw(5)};
        color: #737b8c;
        transition: all .2s ease-in;
    }
    
    @media ${screen.lg} {
        top: 60px;
        left: 15px;
        font-size: 16px;
        border-radius: 20px;
        
        &:hover {
            background-color: rgba(0,0,0,0.05);
            color: ${siteConfig.theme.vipSwitchIconColor};
            i {
                color: ${siteConfig.theme.vipSwitchIconColor};
            }
        }

    }
`;

const NextButton = styled(PrevButton)`
    // swiperNext reset
    left: auto;
    right: 0;

    i {
        margin-right: unset;
        margin-left: ${px2vw(5)};
    }

    @media ${screen.lg} {
        left: auto;
        right: 15px
    }
`;
