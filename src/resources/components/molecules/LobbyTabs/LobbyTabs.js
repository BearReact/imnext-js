// @flow
/**
 * LobbyTabs
 */
import * as React from 'react';
import styled, {css, convertPx2vw} from '@library/styled-components';
import Button from '@components/atoms/Button';
import {px2vw} from '@utils/format';
import Icon from '@components/atoms/Icon';
import screen from '@themes/Screen';


type Props = {
    style?: React.CSSProperties,
    history: {},
    className?: string,
    item?: Array<{
        name: string,
        code: string
    }>,
    activeItemCode?: string,
    onChange?: Function,
    isRefreshing?: boolean,
    onRefreshWallet?: Function
};
type State = {};

class LobbyTabs extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        item: [],
        activeItemCode: undefined,
        onChange: () => {},
        onRefreshWallet: () => {},
        isRefreshing: false
    };

    render() {
        const {history, className, style, item, activeItemCode, onChange, onRefreshWallet, isRefreshing} = this.props;

        return (
            <LobbyTabsRoot className={className} style={style}>
                {item.map((row) => (
                    <Tab key={row.code}>
                        <TabButton
                            block
                            code={row.code}
                            onClick={() => onChange(row.code)}
                            isActive={activeItemCode === row.code}
                        >
                            {row.name}
                        </TabButton>
                    </Tab>
                ))}
                <OtherContainer className="d-none d-lg-flex">
                    <ButtonGroup>
                        <Line/>
                        <MyButton onClick={()=>history.push('/myFavorite')}>
                            <Icon code="heart" color="#fff" size={25}/>
                        </MyButton>

                        {/* 中心錢包才顯示刷新館別按鈕 */}
                        {siteConfig.walletMode === 'main' && (
                            <MyButton onClick={onRefreshWallet} disabled={isRefreshing}>
                                <Icon code="update" color="#fff" size={25}/>
                            </MyButton>
                        )}
                    </ButtonGroup>
                </OtherContainer>
            </LobbyTabsRoot>
        );
    }
}

export default LobbyTabs;

const Line = styled.div`
    height: 20px;
    width: 1px;
    background-color: #4b4b4b;
`;

const MyButton = styled(Button)`
    padding: 0 10px;
    
    &:disabled,
    &[disabled]{
      border: none;
      background-color: transparent;
      
      .iconfont{
        color: ${props=>props.theme.buttonDisabledBorderColor};
      }
    };
`;

const ButtonGroup = styled.div`
    
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const OtherContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const TabButton = styled(Button)`
    ${convertPx2vw`
        color: #999;
        font-size: 12px;
        border: none;
        padding-bottom: 13px;
        padding-top: 13px;
        display: inline;
    
        ${props => props.isActive &&
            css`
                color: ${props.theme.primaryColor};
                &:after {
                    position: absolute;
                    background-color: ${props.theme.primaryColor};
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    content: '';
                }
            `};
        `};
    
    
    @media ${screen.lg} {
        font-size: 12px;
        padding: 10px 30px;
        
        
        ${props => props.isActive && css`
            
            &:after {
                height: 4px;
                bottom: -3px;
                border-radius: 4px;
                width: calc(100% - 20px);
                margin: auto;
            }
        `};
    };
`;

const Tab = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    max-width: 25%;
    width: 25%;
    flex: 1 1 25%;

    position: relative;
    color: #737b8c;
    
    @media ${screen.lg} {
        width: auto;   
        flex: 0 0 auto;  
    }
`;

const LobbyTabsRoot = styled.div`
    color: #fff;
    background-color: ${props => props.theme.headerBackgroundColor};
    display: flex;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    
    @media ${screen.lg} {
        background-color: ${props => props.theme.headerWebBackgroundColor};
    }
    
`;
