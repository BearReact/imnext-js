import styled, {css} from 'styled-components';
import {px2vw} from '@utils/format';
import {isEmpty} from '@utils/equal';
import screen from '@themes/Screen';
import {asset} from '@utils/uri';

const MaintainText = styled.div`
    color: #ff4b4b;
    font-size: ${px2vw(12)};
    font-weight: 900;
    padding-right: ${px2vw(5)};
    
    @media ${screen.lg} {
        font-size: 15px;
        margin-right: 5px;
    };
`;

const LobbyCardRoot = styled.div`
    color: #fff;
    min-height: ${px2vw(125)};
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
    padding-bottom: 57%;
    cursor: pointer;

    ${props => !isEmpty(props.src) && css`     
        background-image: url(${props => asset(props.src)});
    `};
    
    ${props => props.isMaintain && css`
        pointer-events: none;
    `};
      
    @media ${screen.lg} {
         min-height: 80px;
         padding-bottom: 57%;
    };
`;

const Card = styled.div`
    border: solid 1px #31373a;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const Info = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #31373a;
    width: 100%;
    min-height: ${px2vw(30)};
    z-index: 1;
    
    @media ${screen.lg} {
        min-height: 30px;  
    }
`;

const Name = styled.span`
    font-size: ${px2vw(16)};
    font-weight: 900;
    color: #fff;
    padding-left: ${px2vw(10)};
    
    @media ${screen.lg} {
        font-size: 16px;
        padding-left: 10px;
    }
`;

const Free = styled.span`
    font-size: ${px2vw(12)};
    color: ${siteConfig.theme.primaryColor};
    padding-left: ${px2vw(10)};
    flex: 1 1 auto;
    
    @media ${screen.lg} {
        font-size: 12px;
        padding-left: 10px;
 }
`;

const LearnButton = styled.button`
    margin-top: ${px2vw(5)};
    margin-bottom: ${px2vw(5)};
    margin-right: ${px2vw(5)};
    font-size: ${px2vw(10)};
    border-radius: 2px;
    border: solid 1px #fff;
    color: #fff;
    background-color: transparent;
    
    @media ${screen.lg} {
        font-size: 10px;
        margin: 0 10px 0 0;
        min-width: 90px;
    }
`;

export {
    LobbyCardRoot, MaintainText,
    Card, Info, Name, Free, LearnButton
};

