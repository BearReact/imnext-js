// @flow
/**
 * PromotionModal
 */
import React, {useEffect, useState} from 'react';

import styled, {css, convertPx2vw} from '@library/styled-components';
import {FormattedMessage as I18N} from 'react-intl';
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

import {uploadUrl} from '@utils/uri';
import {isIos} from '@utils/browser';
import Swiper from 'react-id-swiper';
import {Pagination} from 'swiper/dist/js/swiper.esm';
import Button from '@components/atoms/Button/Button';
import Icon from '@components/atoms/Icon/Icon';
import {isEmpty} from '@utils/equal';
import ReactHtmlParser from 'react-html-parser';


type Props = {
    source?: Array<{
        id: number,
        title: string,
        content: string,
        adImgUrl: string,
        detailUrl: string,
        isOpen: boolean,
    }>,
    scrollRef: any,
    onClose: Function
};



let targetElement = '';
const prefixContent = 'reactScrollContent';
const isIOSDevice = isIos() ? true: undefined;

function PromotionModal(props: Props){

    const {source, onClose} = props;
    const [swiper, updateSwiper] = useState(null);

    const params = {
        modules: [Pagination], // Add nescessary modules here
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        ContainerEl: 'section',
        WrapperEl: 'section',
        slidesPerView: 1,
        centeredSlides: true,
        grabCursor: true,
        shouldSwiperUpdate: true,
        getSwiper: updateSwiper
    };


    useEffect(() => {
        if (swiper !== null) {
            //初始
            targetElement = document.querySelector(`#${prefixContent}_0`);
            disableBodyScroll(targetElement);

            swiper.on('slideChangeTransitionEnd', () => handleDisableBodyScroll(swiper.realIndex));
        }

    }, [swiper]);



    const handleDisableBodyScroll = (realIndex) => {
        // 將最後一次的做取消
        enableBodyScroll(targetElement);

        // 鎖定現在這次
        targetElement = document.querySelector(`#${prefixContent}_${realIndex}`);
        disableBodyScroll(targetElement);
    };


    const handleCloseModal = () => {
        clearAllBodyScrollLocks();
        onClose();
    };

    return (
        <PromotionModalContainer>
            <CloseButton onClick={handleCloseModal}>
                <Icon code="close-little" size={18} color="#fff" shapeSize={30} shapeType="circle" shapeColor="rgba(0,0,0,.4)"/>
            </CloseButton>

            <Swiper {...params}>
                {source.map((row, index) => {
                    return (
                        <div key={row.id}>
                            <div className="d-flex flex-column flex-nowrap justify-content-between" style={{height: 'inherit', paddingBottom: 40}}>
                                <Body>
                                    <TitlePhoto src={uploadUrl(row.adImgUrl)} alt="promotion"/>
                                </Body>

                                <Content isHasButton={!isEmpty(row.detailUrl) ? 'true': 'false'} id={`${prefixContent}_${index}`}>
                                    <Title>{row.title}</Title>
                                    <Desc>{ReactHtmlParser(row.content.replace(/\r\n/g,'<br />'))}</Desc>
                                </Content>

                                {!isEmpty(row.detailUrl) && (
                                    <Footer isIOS={isIOSDevice}>
                                        <Button theme="primary" block onClick={()=>window.open(row.detailUrl)}>
                                            <I18N id="page.promotionModal.learnMore" defaultMessage="查看详情"/>
                                        </Button>
                                    </Footer>
                                )}
                            </div>

                        </div>
                    );
                })}
            </Swiper>
        </PromotionModalContainer>
    );
}

export default PromotionModal;


PromotionModal.defaultProps = {
    source: []
};

const CloseButton = styled(Button)`
    position: absolute;
    z-index: 99;
    
    ${convertPx2vw`
        top: 10px;
        right: 10px;
    `};
    
    @media ${screen.lg} {
        top: 10px;
        right: 10px;
    };
`;

const Desc = styled.div`
    color: #8d8d8d;
    text-align: left;
    
    ${convertPx2vw`
        font-size: 12px;
        margin-bottom: 14px;
    `};
    
    @media ${screen.lg} {
        font-size: 15px;
        margin-bottom: 14px;
    };
    
`;


const Title = styled.div`
    color: #4a4a4a;
    text-align: center;

    ${convertPx2vw`
        font-size: 20px;
        margin-bottom: 12px;
    `};
    
    @media ${screen.lg} {
        font-size: 20px;
        margin-bottom: 12px;
    };

`;


const TitlePhoto = styled.div`
    width: 100%;
    padding-bottom: 68%;
    background: #000 url("${props=>props.src}") center bottom no-repeat;
    background-size: cover;
    
    ${convertPx2vw`
        margin-bottom: 13px;
    `};
    
    @media ${screen.lg} {
        margin-bottom: 13px;
    };
`;


const Content = styled.div`
    height: inherit;
    overflow: auto;
    
    ${convertPx2vw`
        padding: 0 20px;
    `};
    
    @media ${screen.lg} {
        padding: 0 20px;
    };
`;

const Body = styled.div`
    flex: 0 0 auto;
    width: 100%;
    height: auto
`;

const Footer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-end;
    
    ${convertPx2vw`
        padding: 15px 20px 0 20px;
    `};
    
    ${props => props.isIOS && css`
        padding-top: ${px2vw(35)};
    `}
    
    @media ${screen.lg} {
        padding: 15px 20px 0 20px;
        
        ${props => props.isIOS && css`
            padding-top: 35px;
        `}
    };
`;

const PromotionModalContainer = styled.div`
    color: #fff;
    background-color: #fff;
    height: 75vh;
    position: relative;
    overflow: hidden;
    max-width: 500px;


    .Modal__MessageTitle{
        display: none;
    }
    .Modal__MessageContent{
        height: inherit;
    }
    .swiper-container, .swiper-wrapper{
        height: inherit;
    }

    .swiper-paginatio{
        position: absolute;
        bottom: 0;
    }
    
`;
