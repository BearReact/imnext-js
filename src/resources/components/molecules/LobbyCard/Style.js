import styled, {css} from 'styled-components';
import {px2vw} from '@utils/format';
import {isEmpty} from '@utils/equal';
import screen from '@themes/Screen';

import Icon from '@components/atoms/Icon';
import Favorite from '@components/molecules/Favorite';



const Locked = styled(Icon)`
    position: absolute;
    bottom: ${px2vw(24)};
    right: ${px2vw(5)};
    
    @media ${screen.lg} {
        bottom: 35px;
        right: 10px;
        
        i {
            font-size: 25px;
        }
    };
`;


const MaintainModal = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    border: solid 1px ${props=>props.theme.lobbyBorderColor};
    
    ${props => props.isMaintain && css`
        border-color: #ff4b4b;
        background-color: rgba(255, 75, 75, 0.2);
    `};
 
`;

const MaintainText = styled.div`
    color: #ff4b4b;
    font-size: ${px2vw(12)};
    font-weight: 900;
    
    
    @media ${screen.lg} {
        font-size: 15px;
        margin-right: 5px;
    };
`;

const Wallet = styled.div`
    color: ${props => (props.amount > 0 ? props.theme.primaryColor : '#9b9b9b')};
    font-size: ${px2vw(12)};
    
     
    @media ${screen.lg} {
        font-size: 15px;
        margin-right: 5px;
    };
`;

const LobbyName = styled.div`
    color: ${props => (props.isMaintain ? '#ff4b4b' : props.theme.cardTitleColor)};
    font-size: ${px2vw(12)};
    font-weight: 400;
    
     
    @media ${screen.lg} {
        font-size: 15px;
        margin-left: 5px;
    };
`;


const ClickArea = styled.div`
    cursor: pointer;
    position: absolute;
    left: 0; // ie 11
    bottom: -1px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: ${px2vw(7)};
    width: 100%;
    height: 80%;
    
    ${props => props.theme.lobbyIsTitleMask && css`
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 65%, ${props => props.theme.lobbyTitleMaskColor});
    `};
    
     
    @media ${screen.lg} {
        padding: 7px;
    };
`;

const MyFavorite = styled(Favorite)`
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    
    
    @media ${screen.lg} {
       right: 0;
       top: 0;
    };
`;


const LobbyCardRoot = styled.div`
    color: #fff;
    min-height: ${px2vw(130)};
    width: 100%;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0% 0%;
    background-color: ${siteConfig.theme.lobbyBackgroundColor};

    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    padding-bottom: 70%;

    ${props => !isEmpty(props.src) && css`     
        background-image: url(${props.src});
    `};
    
      
    @media ${screen.lg} {
         min-height: 80px;
         padding-bottom: 84%;
    };
    
`;


export {
    LobbyCardRoot, MyFavorite, ClickArea, LobbyName, Wallet, MaintainText, MaintainModal,
    Locked
};

