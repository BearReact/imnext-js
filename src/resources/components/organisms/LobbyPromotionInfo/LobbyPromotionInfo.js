// @flow
/**
 * LobbyPromotionInfo
 */
import React, {Fragment} from 'react';
import styled from 'styled-components';
import {formatCurrency} from '@utils/number';
import Button from '@components/atoms/Button/Button';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';
import {FormattedMessage as I18N} from 'react-intl';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    promotionTitle: string,
    currentRollingAmount: number,
    needRollingAmount: number,
    isPromotionUnlockApply: boolean,
    showRolling: boolean,
    handleUnlockApply?: Function,
    handleCloseDialog?: Function
};
type State = {};

class LobbyPromotionInfo extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        handleUnlockApply: () => {},
        handleCloseDialog: () => {}
    };

    handleUnlockApplyClick = () => {
        const {handleUnlockApply, handleCloseDialog} = this.props;
        handleUnlockApply();
        handleCloseDialog();
    };

    render() {
        const {
            className,
            style,
            promotionTitle,
            currentRollingAmount,
            needRollingAmount,
            isPromotionUnlockApply,
            showRolling
        } = this.props;
        return (
            <LobbyPromotionInfoRoot className={className} style={style}>
                <ActivityTitle>
                    <I18N id="page.home.activityExecution" defaultMessage="活动执行"/>
                </ActivityTitle>
                <PromotionTitle>{promotionTitle}</PromotionTitle>
                {showRolling && (
                    <Fragment>
                        <RollingAmount>
                            <CurrentRollingAmount>{formatCurrency(currentRollingAmount)}</CurrentRollingAmount>
                            <span className="text-symbol">/</span>
                            <NeedRollingAmount>{formatCurrency(needRollingAmount)}</NeedRollingAmount>
                        </RollingAmount>
                        <RollingAmountTitle>
                            <I18N id="page.home.nowRolloverRequirement" defaultMessage="目前流水 / 需求流水"/>
                        </RollingAmountTitle>
                    </Fragment>
                )}
                <div className="d-flex flex-column align-items-center justify-content-center">
                    {isPromotionUnlockApply === true ? (
                        <ButtonRoot theme="danger"><I18N id="page.home.underReview" defaultMessage="正在审核中"/></ButtonRoot>
                    ) : (
                        <ButtonRoot theme="warning" onClick={this.handleUnlockApplyClick}>
                            <I18N id="page.home.progress" defaultMessage="申请解锁"/>
                        </ButtonRoot>
                    )}
                </div>
            </LobbyPromotionInfoRoot>
        );
    }
}

export default LobbyPromotionInfo;

const ButtonRoot = styled(Button)`
    border-radius: ${px2vw(20)};
    min-height: ${px2vw(30)};
    font-size: ${px2vw(16)};
    min-width: ${px2vw(130)};
    background-color: #8d8d8d;
    border: none;
    position: absolute;
    bottom: -${px2vw(50)};
    left: 50%;
    transform: translate(-50%);
    font-weight: 500;
    
    @media ${screen.lg} {
        bottom: -50px;
        border-radius: 20px;
        min-height: 30px;
        font-size: 16px;
        min-width: 130px;
    };
`;

const CurrentRollingAmount = styled.div`
    font-size: ${px2vw(18)};
    line-height: ${px2vw(18)};
    font-weight: 900;
    text-align: center;
    color: ${siteConfig.theme.primaryColor};
    
    @media ${screen.lg} {
        font-size: 18px;
        line-height: 18px;
    }
`;

const NeedRollingAmount = styled(CurrentRollingAmount)``;

const RollingAmount = styled.div`
    width: 100%;
    display: flex;
    align-self: center;
    justify-content: center;
    padding: ${px2vw(10)} 0;
    margin-bottom: ${px2vw(5)};
    border: solid 1px ${siteConfig.theme.primaryColor};
    color: ${siteConfig.theme.primaryColor};
    .text-symbol {
        margin: 0 ${px2vw(3)};
        font-size: ${px2vw(14)};
    }
    
    @media ${screen.lg} {
        padding: 10px 0;
        margin-bottom: 5px;
        
        .text-symbol {
            margin: 0 3px;
            font-size: 14px;
        }
    }
`;

const RollingAmountTitle = styled.div`
    font-size: ${px2vw(12)};
    margin-bottom: ${px2vw(17)};
    color: ${siteConfig.theme.primaryColor};;
    
    @media ${screen.lg} {
        font-size: 12px;
        margin-bottom: 17px;
    }
`;

const PromotionTitle = styled.div`
    font-size: ${px2vw(14)};
    margin-bottom: ${px2vw(20)};
    color: #8d8d8d;
    font-weight: 300;
    
    @media ${screen.lg} {
        font-size: 14px;
        margin-bottom: 20px;
    }
`;

const ActivityTitle = styled.div`
    font-size: ${px2vw(16)};
    margin-bottom: ${px2vw(10)};
    font-weight: 900;
    text-align: center;
    color: #7ed321;
    
    @media ${screen.lg} {
        font-size: 16px;
        margin-bottom: 10px;
    }
`;

const LobbyPromotionInfoRoot = styled.div`
    color: #fff;
`;
