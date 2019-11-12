// @flow
/**
 * LobbyCard
 */
import * as React from 'react';
import styled from 'styled-components';
import {FormattedMessage as I18N} from 'react-intl';
import GameLobby from '@themes/Images/GameLobby';
import screen from '@themes/Screen';
import {formatCurrency} from '@utils/number/index';
import {px2vw} from '@utils/format/index';

import Rolling from '@components/atoms/Loader/Rolling';
import {LobbyCardRoot, ClickArea, LobbyName, Wallet,
    MaintainText, MaintainModal, Locked} from './Style';

type Props = {
    style?: React.CSSProperties,
    className?: string,

    name: string,
    selectedColor?: string,
    selectedText?: string,
    code: number,
    amount: number,
    isMaintain: boolean,
    isLocked?: boolean,
    isSelected?: boolean,
    isRefreshing?: boolean,
    onClick?: Function
};
type State = {};

class LobbyCardSimple extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        isSelected: false,
        isLocked: false,
        isRefreshing: false,
        selectedColor: '#f1af3e',
        selectedText: '',
        onClick: ()=>{}
    };


    renderClickArea = (isMaintain) => {
        const {
            isLocked,
            amount,
            isRefreshing,
            name,
            code,
            onClick
        } = this.props;

        const isNotSelected = (isMaintain || isLocked);


        if(isMaintain){
            return (
                <ClickArea>
                    <LobbyName isMaintain={isMaintain}>{name}</LobbyName>
                    <MaintainText>
                        <I18N id='action.maintain' />
                    </MaintainText>
                    {isLocked && <Locked code="lock" size={20} color="#ff0000" />}
                </ClickArea>
            );
        }

        return (
            <ClickArea onClick={() => !isNotSelected ? onClick(code) : {}}>

                <LobbyName>{name}</LobbyName>

                <Wallet amount={amount || 0}>
                    {isRefreshing ? <Rolling />  : `$ ${formatCurrency(amount || 0)}`}
                </Wallet>
                {isLocked && <Locked code="lock" size={20} color="#ff0000" />}
            </ClickArea>
        );
    };


    render() {
        const {
            style,
            className,
            isSelected,
            isMaintain,
            code,
            selectedColor,
            selectedText
        } = this.props;

        return (
            <LobbyCardRoot
                className={className} style={style} src={GameLobby[code]} isSelected={isSelected}>
                <MaintainModal isMaintain={isMaintain}/>

                {this.renderClickArea(isMaintain)}

                { isSelected &&
                    <SelectedBorder isSelected={isSelected} color={selectedColor}>
                        {selectedText}
                    </SelectedBorder>
                }
            </LobbyCardRoot>
        );
    }
}

export default LobbyCardSimple;


const SelectedBorder = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    border: ${props => props.color} solid 1px;
    color: ${props => props.color};
    font-size: ${px2vw(12)};
    z-index: 1;
    top: 0;
    left: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.isSelected && 'rgba(0, 0, 0, 0.6)'};
    
    @media ${screen.lg} {
        font-size: 16px;
    }; 
`;
