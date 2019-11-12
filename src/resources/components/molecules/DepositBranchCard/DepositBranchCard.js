// @flow
/**
 * DepositBranchCard
 */
import * as React from 'react';
import styled, {css} from 'styled-components';
import {formatCurrency} from '@utils/number';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

import Button from '@components/atoms/Button';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    depositBranchName: string,
    depositMinAmount: number,
    depositMaxAmount: number,
    isSelected: boolean,
    onClick: Function
};

type State = {};

class DepositBranchCard extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined
    };

    render() {
        const {
            style,
            className,
            depositBranchName,
            depositMinAmount,
            depositMaxAmount,
            isSelected,
            onClick
        } = this.props;
        return (
            <DepositBranchCardRoot className={className} style={style} isSelected={isSelected} onClick={onClick}>
                <div className="d-flex flex-column">
                    <DepositBranchName>{depositBranchName || '渠道'}</DepositBranchName>
                    <DepositAmount>
                        <span className="text-symbol">$</span>
                        <DepositMinAmount>{formatCurrency(depositMinAmount, false)}</DepositMinAmount>
                        <span className="text-symbol">-</span>
                        <DepositMaxAmount>{formatCurrency(depositMaxAmount, false)}</DepositMaxAmount>
                    </DepositAmount>
                </div>
            </DepositBranchCardRoot>
        );
    }
}

export default DepositBranchCard;

const DepositMinAmount = styled.span`
    color: #c4c4c4;
`;

const DepositMaxAmount = styled(DepositMinAmount)``;

const DepositBranchName = styled.div`
    font-family: 'NotoSansCJKtc';
    font-size: ${px2vw(12)};
    font-weight: 900;
    text-align: center;
    color: ${props => props.theme.primaryColor};
    overflow: hidden;
    text-overflow : ellipsis;
    white-space : nowrap;
    
    @media ${screen.lg} {
        font-size: 12px;
    }
`;

const DepositAmount = styled.div`
    font-size: ${px2vw(10)};
    margin-top: ${px2vw(5)};
    color: #c4c4c4;
    
    .text-symbol {
        margin: 0 ${px2vw(3)};
    }
    
    
    @media ${screen.lg} {
        font-size: 12px;
        margin-top: 5px;
        
        .text-symbol {
            margin: 0 3px;
        }
    }
`;

const DepositBranchCardRoot = styled(Button)`
    background: ${props => (props.isSelected ? props.theme.primaryColor : props.theme.listBackgroundColor)};
    border-color: ${props => (props.isSelected ? props.theme.primaryColor : props.theme.listBackgroundColor)};
    padding: ${px2vw(6)} ${px2vw(12)};

    ${props =>
        props.isSelected &&
        css`
            ${DepositMinAmount} {
                color: #fff;
            }
            ${DepositMaxAmount} {
                color: #fff;
            }
            ${DepositBranchName} {
                color: #fff;
            }
            ${DepositAmount} {
                color: #fff;
            }
        `};
    
    @media ${screen.lg} {
        padding: 6px 12px;
    }
`;
