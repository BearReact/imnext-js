// @flow
/**
 * LobbyCard
 */
import * as React from 'react';
import {FormattedMessage as I18N} from 'react-intl';
import styled, {screen, css} from '@library/styled-components';
import {px2vw} from '@utils/format';
import get from 'lodash/get';
import {formatCurrency} from '@utils/number';
import GameLobby from '@themes/Images/GameLobby';

import Rolling from '@components/atoms/Loader/Rolling';
import {LobbyCardRoot, MyFavorite, ClickArea, LobbyName, Wallet,
    MaintainText, MaintainModal, Locked} from './Style';

type Props = {
    style?: React.CSSProperties,
    className?: string,

    name: string,
    code: number,
    amount: number,
    isMaintain: boolean,
    isRefreshing?: boolean,
    isLocked?: boolean,
    isFavourite?: boolean,
    onPlay: Function,
    onSetFavourite: Function,
    isGuest?: boolean,
};
type State = {};

class LobbyCard extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        isRefreshing: false,
        isLocked: false,
        isFavourite: false,
        isGuest: false
    };


    renderClickArea = (isMaintain) => {

        const {
            isGuest,
            isLocked,
            onPlay,
            code,
            amount,
            isRefreshing,
            name
        } = this.props;

        if(isMaintain){
            return (
                <CustomClickArea>
                    <LobbyName isMaintain={isMaintain}>{name}</LobbyName>
                    <CustomMaintainText>
                        <I18N id='action.maintain' />
                    </CustomMaintainText>
                    {!isGuest && isLocked && <CustomLocked code="lock" size={20} color="#ff0000" />}
                </CustomClickArea>
            );
        }

        return (
            <CustomClickArea
                onClick={() => {
                    onPlay(code);
                }}
            >
                <LobbyName>{name}</LobbyName>

                {
                    (siteConfig.walletMode === 'main' && !isGuest) &&
                    <Wallet amount={amount || 0}>
                        {isRefreshing ? <Rolling />  : `$ ${formatCurrency(amount || 0)}`}
                    </Wallet>
                }

                {
                    !isGuest && isLocked && <CustomLocked code="lock" size={20} color="#ff0000" />
                }

            </CustomClickArea>
        );
    };

    render() {
        const {
            style,
            className,
            onSetFavourite,
            isFavourite,
            isMaintain,
            code,
            isGuest
        } = this.props;

        return (
            <CustomLobbyCardRoot className={className} style={style} src={get(GameLobby, code, '')}>
                <MaintainModal isMaintain={isMaintain}/>

                {!isGuest && <CustomMyFavorite isFavourite={isFavourite} onClick={() => onSetFavourite(code, !isFavourite)}/>}

                {this.renderClickArea(isMaintain)}
            </CustomLobbyCardRoot>
        );
    }
}

export default LobbyCard;

const CustomClickArea = styled(ClickArea)`    
    ${props => props.theme.lobbyIsTitleMask && css`
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 65%, ${props => props.theme.lobbyTitleMaskColor} 80%, ${props => props.theme.lobbyTitleMaskColor} 80%)
    `};
`;

const CustomMaintainText = styled(MaintainText)`
    ${siteConfig.walletMode !== 'main' && css`
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
    `}
`;

const CustomLocked = styled(Locked)`
    ${siteConfig.walletMode !== 'main' && css`
        left: px2vw(5);
        right: auto;
        
        @media ${screen.lg} {
            left: 7px;
            justify-content: flex-start;
        }
    `}
`;

const CustomMyFavorite= styled(MyFavorite)`
    ${siteConfig.walletMode !== 'main' && css`
        top: auto;
        bottom: 0;
        z-index: 1;
        
        @media ${screen.lg} {
            top: auto;
        }
    `}
`;

const CustomLobbyCardRoot = styled(LobbyCardRoot)`
    ${siteConfig.walletMode !== 'main' && css`
        min-height: calc(${px2vw(130)} + ${px2vw(30)});
        background-size: 100%;
    
        @media ${screen.lg} {
            min-height: auto;
            padding-bottom: calc(84% + 30px); 
        }
    `}
`;
