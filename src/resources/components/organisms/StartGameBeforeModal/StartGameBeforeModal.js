// @flow
/**
 * StartGameBeforeModal
 */
import * as React from 'react';
import styled from 'styled-components';
import {isEmpty} from '@utils/equal';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';
import {FormattedMessage as I18N} from 'react-intl';

import Icon from '@components/atoms/Icon';
import Button from '@components/atoms/Button';
import LobbyPromotionInfo from '@components/organisms/LobbyPromotionInfo';
import {formatCurrency} from '@utils/number';

type Props = {
    history: {},
    style?: React.CSSProperties,
    className?: string,
    isPromotionLock?: boolean,
    promotionTitle: string,
    currentRollingAmount: number,
    needRollingAmount: number,
    isPromotionUnlockApply: boolean,
    showRolling: boolean,
    lobbyName: string,
    lobbyCode: number,

    handleOnCancel?: Function,
    onStartLobby: Function,
    handleUnlockApply: Function,
    amount: number,
    lobbyName: string,
    onTransferAndStartLobby: Function,
    isMainWallet?: boolean,
    agentFinanceLivechatUrl: string
};
type State = {};

class StartGameBeforeModal extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        isPromotionLock: false,
        handleOnCancel: () => {},
        isMainWallet: false
    };

    handleCloseDialog = () => {
        const {handleOnCancel} = this.props;
        handleOnCancel();
    };


    render() {
        const {
            className,
            style,
            lobbyCode,
            lobbyName,
            onStartLobby,
            isPromotionLock,
            promotionTitle,
            currentRollingAmount,
            needRollingAmount,
            isPromotionUnlockApply,
            showRolling,
            handleUnlockApply,
            history,
            amount,
            onTransferAndStartLobby,
            isMainWallet,
            agentFinanceLivechatUrl
        } = this.props;

        // 是否為中心錢包

        const isTransfer = amount < 1;

        return (
            <Overlay>
                <StartGameBeforeModalRoot className={className} style={style}>

                    <ModalInner>
                        <ModalTitle>{lobbyName}</ModalTitle>

                        {!isPromotionLock ? (
                            <ModalContainer>

                                {/* 如果是 中心錢包 才有啟動遊戲並轉錢進館別功能按鈕 */}
                                {isMainWallet &&
                                    <TransferAndStartButton
                                        onClick={onTransferAndStartLobby}
                                        disabled={isTransfer}
                                    >
                                        <span>
                                            {isTransfer ? 'iMONEY' :
                                                (<I18N id="page.transferAndStartGameModal.transfer" defaultMessage="转进游戏馆并启动"/>)
                                            }
                                        </span>
                                        <Amount>${formatCurrency(amount)}</Amount>
                                    </TransferAndStartButton>
                                }

                                <DepositLink
                                    block
                                    onClick={isEmpty(agentFinanceLivechatUrl) ?
                                        () => {
                                            this.handleCloseDialog();
                                            if (isMainWallet) {
                                                history.push(`/deposit/lobby/${lobbyCode}/menu`);
                                            } else {
                                                history.push('/deposit/lobby/auto/menu');
                                            }
                                        }:
                                        () => {
                                            this.handleCloseDialog();
                                            window.open(agentFinanceLivechatUrl);
                                        }
                                    }
                                >
                                    <I18N id="page.startGameBeforeModal.deposit" defaultMessage="存款"/>
                                </DepositLink>

                                <SelfRebateLink
                                    onClick={() => {
                                        this.handleCloseDialog();
                                        history.push(`/lobby/${lobbyCode}/selfRebate`);
                                    }}
                                >
                                    <I18N id="page.selfRebate.title" defaultMessage="自助返水"/>
                                </SelfRebateLink>
                            </ModalContainer>)
                            :
                            (<PromotionInfoView>
                                <LobbyPromotionInfo
                                    promotionTitle={promotionTitle}
                                    currentRollingAmount={currentRollingAmount}
                                    needRollingAmount={needRollingAmount}
                                    isPromotionUnlockApply={isPromotionUnlockApply}
                                    handleUnlockApply={handleUnlockApply}
                                    handleCloseDialog={this.handleCloseDialog}
                                    showRolling={showRolling}
                                />
                            </PromotionInfoView>
                            )}

                    </ModalInner>


                    <StartButtonArea>
                        <StartButton onClick={onStartLobby}>
                            <TextPlay><I18N id="page.startGameBeforeModal.play" defaultMessage="启动游戏"/></TextPlay>
                        </StartButton>
                    </StartButtonArea>


                    <CloseButton onClick={this.handleCloseDialog}>
                        <Icon code="close" color={siteConfig.theme.primaryColor} size={16} />
                    </CloseButton>
                </StartGameBeforeModalRoot>
            </Overlay>
        );
    }
}

export default StartGameBeforeModal;

const CloseButton = styled(Button)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    background-color: rgba(0,0,0,0.2);
    padding: 0;
    position: absolute;
    width: ${px2vw(30)};
    height: ${px2vw(30)};
    right: ${px2vw(6)};
    top: ${px2vw(6)};

    i:before {
        color: #fff;
    };

    @media ${screen.lg} {
        width: 40px;
        height: 40px;
        margin-top: 0;
        top: 10px;
        right: 10px;
    };
`;

const PromotionInfoView = styled.div`
    width: 100%;

    @media ${screen.lg} {
        max-width: 240px;
        margin: 0 auto;
    }

`;

const ModalContainer = styled.div`
    width: 100%;
`;

const TextPlay = styled.span`
    font-size: ${px2vw(15)};
    font-weight: 900;
    flex: 1 0 auto;
    text-align: center;

    @media ${screen.lg} {
        font-size: 15px;
    }
`;

const StartGameBeforeModalRoot = styled.div`
    width: ${px2vw(250)};
    background-color: ${siteConfig.theme.bodyBackgroundColor};
    position: relative;
    border-radius: 4px;

    @media ${screen.lg} {
        max-width: 400px;
        border-radius: 10px;
    }
`;

const Overlay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
`;

const ModalInner = styled.div`
    width: 100%;
    padding: 0px ${px2vw(10)};
    text-align: center;

    @media ${screen.lg} {
        padding: 0 10px;
    }
`;

const ModalTitle = styled.div`
    font-size: ${px2vw(18)};
    font-weight: 900;
    line-height: 1.39;
    padding: 24px 0 30px;
    color: ${siteConfig.theme.primaryColor};

    @media ${screen.lg} {
        font-size: 18px;
    }
`;

const TransferAndStartButton = styled(Button)`
    margin: 0 auto ${px2vw(10)};
    font-size: ${px2vw(12)};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 50px;
    width: 100%;
    background-color: transparent;
    border: solid 1px #7ed321;
    color: #7ed321;
    font-weight: normal;
    box-sizing: border-box;
    border-radius: 2px;
    &:after {
        display: none;
    }
    &:disabled,
    &[disabled]{
      background-color: #fff;
      color: #979797;
      border: solid 1px #979797;
    };

    span {
        display: block;
        width: 100%;
    }

    @media ${screen.lg} {
        font-size: 12px;
        width: 100%;
        max-width: 235px;
        margin: 0 auto 10px;
    }
`;

const Amount = styled.div`
    font-size: ${px2vw(14)};
    width: 100%;
    font-weight: 900;
    box-sizing: border-box;
    padding-top: 4px;

    @media ${screen.lg} {
        font-size: 14px;
    }
`;

const DepositLink = styled(Button)`
    margin: 0 auto ${px2vw(10)};
    font-size: ${px2vw(16)};
    display: flex;
    justify-content: center;
    min-height: 50px;
    width: 100%;
    background-color: transparent;
    border: solid 1px ${siteConfig.theme.primaryColor};
    color: ${siteConfig.theme.primaryColor};
    border-radius: 2px;

    @media ${screen.lg} {
        font-size: 16px;
        width: 100%;
        max-width: 235px;
        margin: 0 auto 10px;
    }
`;

const SelfRebateLink = styled(Button)`
    margin: 0 auto ${px2vw(10)};
    font-size: ${px2vw(16)};
    display: flex;
    justify-content: center;
    min-height: 50px;
    width: 100%;
    background-color: transparent;
    border: solid 1px ${siteConfig.theme.primaryColor};;
    border-radius: 2px;
    color: ${siteConfig.theme.primaryColor};;
    font-weight: normal;

    @media ${screen.lg} {
        font-size: 16px;
        width: 100%;
        max-width: 235px;
        margin: 0 auto 30px;
    }
`;

const StartButton = styled(Button)`
    background-color: ${siteConfig.theme.primaryColor};
    color: #fff;
    width: 100%;
    border-radius: unset;
    padding: ${px2vw(15)} 0;
    font-size: ${px2vw(16)};
    font-weight: 900;
    border-radius: 0 0 4px 4px;

    @media ${screen.lg} {
        padding: 15px 0;
        font-size: 16px;
        border-radius: 0 0 10px 10px;
    }
`;

const StartButtonArea = styled.div`
    width: 100%;
`;

