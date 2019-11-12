// @flow
/**
 * PromotionBanner
 */
import * as React from 'react';
import Swiper from 'react-id-swiper';
import {Autoplay} from 'swiper/dist/js/swiper.esm';
import styled from 'styled-components';
import screen from '@themes/Screen';
import {uploadUrl} from '@utils/uri';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    source: Array<{
        id: number,
        photoUrl: string
    }>
};
type State = {};

class PromotionBanner extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined
    };

    render() {
        const {className, style, source} = this.props;
        const swiperConfig = {
            modules: [Autoplay],
            slidesPerView: 1,
            loop: source.length > 1,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            }
        };
        return (
            <PromotionBannerRoot className={className} style={style}>
                <Swiper
                    shouldSwiperUpdate
                    {...swiperConfig}
                >
                    {source.map(row => (
                        <LinkButton href={row.detailUrl} as={row.detailUrl ? 'a' : 'div'} key={row.id}>
                            <BannerPhoto imgUrl={uploadUrl(row.imgUrl)} mobileImgUrl={uploadUrl(row.mobileImgUrl)} alt="promotion-banner" />
                        </LinkButton>
                    ))}
                </Swiper>
            </PromotionBannerRoot>
        );
    }
}

export default PromotionBanner;

const LinkButton = styled.a``;

const BannerPhoto = styled.div`
    background-image: url(${props => props.mobileImgUrl});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    flex: 0;
    width: 100%;
    padding-bottom: 40.625%;
    
    @media ${screen.lg} {
        background-image: url(${props => props.imgUrl});
        padding-bottom: 26.041%;
    }
`;

const PromotionBannerRoot = styled.div`
    position: relative;
    display: block;
`;
