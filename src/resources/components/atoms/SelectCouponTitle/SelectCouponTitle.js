// @flow
import * as React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';
import Icon from '@components/atoms/Icon';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    children?: React.Node,
    qty?: string
};
type State = {};

class BlockTitle extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        children: null,
        qty: 0
    };

    render() {
        const {children, qty, style, className} = this.props;

        return (
            <BlockTitleRoot style={style} className={className}>
                {children}
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
            </BlockTitleRoot>
        );
    }
}

export default BlockTitle;

const BlockTitleRoot = styled.div`
    color: ${props => props.theme.listTitleColor};
    padding: ${px2vw(20)} ${px2vw(10)} ${px2vw(10)};
    line-height: ${px2vw(17)};
    display: flex;
    justify-content: space-between;

    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: ${px2vw(12)};
    font-weight: 900;
    
    @media ${screen.lg} {
        padding: 20px 10px 10px 0;
        line-height: 17px;
        font-size: 12px;
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

const Multiplication= styled.div`
    display: inline-flex;
    margin-left: 5px;
    font-weight: 400;
    font-size: ${px2vw(12)};
    
    @media ${screen.lg} {
        font-size: 12px;
    }
`;
