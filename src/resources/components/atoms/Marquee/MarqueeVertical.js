// @flow
/**
 * 輪播文字向上翻動
 * https://codepen.io/imagine10255/pen/EMwEEW?editors=0111
 */
import * as React from 'react';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import {Autoplay} from 'swiper/dist/js/swiper.esm';
import get from 'lodash/get';

import {px2vw} from '@utils/format';
import {isEmpty} from '@utils/equal';
import screen from '@themes/Screen';

import Icon from '@components/atoms/Icon/Icon';


type Props = {
    style?: React.CSSProperties,
    className?: string,
    source?: Array<{
        id: string,
        text: string,
        onClick: Function
    }>,
    bgColor?: string
};

function MarqueeVertical(props: Props){
    const {className, style, source ,bgColor} = props;

    const swiperParams = {
        modules: [Autoplay],
        direction: 'vertical',
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        loop: get(source, 'length', 1) >= 2,
        shouldSwiperUpdate: true
    };

    return (
        <RootContainer className={className} bgColor={bgColor} style={style}>
            <Icon code="voice" style={{marginRight: 10}} color="#fff"/>
            <SwiperContainer>
                <Swiper {...swiperParams}>
                    {
                        !isEmpty(source) && source.map(row => {
                            return <div className="swiper-slide" key={row.id}>
                                <Desc onClick={row.onClick}>
                                    {row.text}
                                </Desc>
                            </div>;
                        })
                    }
                </Swiper>
            </SwiperContainer>
        </RootContainer>

    );
}

MarqueeVertical.defaultProps = {
    style: undefined,
    className: undefined,
    source: [],
    bgColor: undefined
};

export default MarqueeVertical;

const Desc = styled.div`
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
`;

const SwiperContainer = styled.div`
    height: ${px2vw(42)};
    //background-color: #3c4447; 
    width: 100%;
    position: relative;
    //overflow: hidden;
    
    .swiper-wrapper{
        height: ${px2vw(42)};
    }
    
    .swiper-slide {
      text-align: left;
      font-size: ${px2vw(12)};
      color: #fff;

      /* Center slide text vertically */
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
    
    @media ${screen.lg} {
        height: 42px;
        
        .swiper-wrapper{
            height: 42px;
        }
        
        .swiper-slide {
            font-size: 12px;
        }
    }
`;


const RootContainer = styled.div`
    height: ${px2vw(42)};
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: ${props=>props.bgColor || '#3c4447'};
    position: relative;
    padding: 0 10px;
    border-bottom: 1px solid rgba(255,255, 255, 0.08);
    
    @media ${screen.lg} {
        height: 42px;
        
        .iconfont{
            font-size: 18px;
        }
    }
`;
