// @flow
/**
 * TabSwiper
 */
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import {HEXToRGB, px2vw} from '@utils/format';
import {Navigation} from 'swiper/dist/js/swiper.esm';
import screen from '@themes/Screen';

import Button from '@components/atoms/Button/Button';
import {isEmpty} from '@utils/equal';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    item?: {
        name: string,
        id: number
    },
    slidesPerView?: number,
    isMask?: boolean,
    onChangeIndex: Function,
    breakpoints: Array<{
        slidesPerView: number
    }>
};

function TabSwiper(props: Props){
    const [swiper, updateSwiper] = useState(null);

    const {style, className, item, slidesPerView, breakpoints, isMask} = props;

    const swiperConfig = {
        modules: [Navigation],
        ContainerEl: 'section',
        WrapperEl: 'section',
        centeredSlides: true,
        grabCursor: true,
        shouldSwiperUpdate: true,
        getSwiper: updateSwiper,
        slidesPerView,
        breakpointsInverse: !isEmpty(breakpoints),
        breakpoints
    };


    useEffect(
        () => {
            if (swiper !== null) {
                swiper.on('slideChange', () => handleChangeIndex(swiper.realIndex));
                // swiper.on('slideChangeTransitionStart', () =>
                //     handleChangeIndex(swiper.realIndex)
                // );
            }
        },
        [swiper]
    );

    const handleChangeIndex = index => {
        const {onChangeIndex} = props;
        onChangeIndex(index);
    };

    const goSlide = (index) => {
        if (swiper !== null) {
            swiper.slideTo(index);
        }
    };

    return (
        <TabSwiperRoot style={style} className={className}>
            {!isEmpty(item) && (
                <Swiper
                    shouldSwiperUpdate
                    {...swiperConfig}
                >
                    {item.map((row, index) => (
                        <div key={row.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                position: 'relative',
                                color: '#737b8c'
                            }}
                        >
                            <TabButton block onClick={()=>goSlide(index)}>
                                {row.name}
                            </TabButton>
                        </div>
                    ))}
                </Swiper>
            )}
            {isMask && <Mask />}
        </TabSwiperRoot>
    );
}

TabSwiper.defaultProps = {
    style: undefined,
    className: undefined,
    item: [],
    slidesPerView: 4,
    isMask: false
};

export default TabSwiper;


const bgRGB = HEXToRGB(siteConfig.theme.headerBackgroundColor).join(',');

const TabButton = styled(Button)`
    color: #737b8c;
    font-size: ${px2vw(12)};

    padding-bottom: ${px2vw(13)};
    padding-top: ${px2vw(13)};
    
    @media ${screen.lg} {
       font-size: 12px;

        padding-bottom: 13px;
        padding-top: 13px;
    }
`;


const Mask = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    pointer-events: none;
    left: 0;
    top: 0;
    height: 100%;
    margin: 0 auto;
    background: linear-gradient(
        to right,
        rgba(${bgRGB}, 0.8) 0%,
        rgba(${bgRGB}, 0.8) 2%,
        rgba(${bgRGB}, 0.1) 15%,
        rgba(${bgRGB}, 0) 50%,
        rgba(${bgRGB}, 0.1) 85%,
        rgba(${bgRGB}, 0.8) 98%,
        rgba(${bgRGB}, 0.8) 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    background-repeat: no-repeat;
`;

const TabSwiperRoot = styled.div`
    color: #fff;
    background-color: ${props => props.theme.headerBackgroundColor};
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    
    
    .swiper-slide-active {
        color: ${props => props.theme.primaryColor};
        
        ${TabButton}{
            color: ${props => props.theme.primaryColor};
            font-weight: 900;
        }

        &:after {
            position: absolute;
            background-color: ${props => props.theme.primaryColor};
            border-radius: 10px;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            content: '';
        }
    }
    
    
    @media ${screen.lg} {
        box-shadow: -4px 0px 4px 0 rgba(0,0,0,0.5);
    }
`;
