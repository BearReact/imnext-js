// @flow
/**
 * DepositBranchSwiper
 */
import * as React from 'react';
import Swiper from 'react-id-swiper';
import styled from 'styled-components';
import DepositBranchCard from '../DepositBranchCard';

type Props = {
    style?: React.CSSProperties,
    className?: any,
    source?: Array<{
        id: number,
        name: string,
        depositMinAmount: number,
        depositMaxAmount: number
    }>,
    onChange: Function,
    value: string | number
};

class DepositBranchSwiper extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        source: []
    };

    constructor(props) {
        super(props);
        this.tabsRef = null;
    }

    componentWillUnmount() {
        if (this.tabsRef) {
            // 銷毀 Swiper
            this.tabsRef.destroy();
        }
    }

    slides = index => {
        // 手動change tab index
        this.tabsRef.slideTo(index);
    };

    render() {
        const swiperConfig = {
            slidesPerView: 3,
            spaceBetween: 10
        };
        const {style, source, value, onChange} = this.props;
        return (
            <DepositBranchSwiperRoot style={style}>
                <Swiper
                    shouldSwiperUpdate
                    {...swiperConfig}
                    ref={node => {
                        if (node) {
                            this.tabsRef = node.swiper;
                        }
                    }}
                >
                    {source.map((row, index) => (
                        <DepositBranchCard
                            key={row.id}
                            depositBranchName={row.name}
                            depositMinAmount={row.depositMinAmount}
                            depositMaxAmount={row.depositMaxAmount}
                            isSelected={index === value}
                            onClick={() => {
                                onChange(index);
                            }}
                        />
                    ))}
                </Swiper>
            </DepositBranchSwiperRoot>
        );
    }
}

export default DepositBranchSwiper;

const DepositBranchSwiperRoot = styled.div``;
