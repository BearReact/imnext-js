// @flow
/**
 * Footer Icon TabBar
 */
import * as React from 'react';
import styled from 'styled-components';
import Icon from '@components/atoms/Icon';
import cx from 'classnames';
import {FormattedMessage as I18N} from 'react-intl';
import {px2vw} from '@utils/format';
import {isEmpty} from '@utils/equal';

type Props = {
    style?: React.CSSProperties,
    activeCode: string,
    onActiveTab: Function,
    liveChatUrl?: string,
    agentFinanceLivechatUrl: string
};
type State = {};

class TabBar extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: null,
        liveChatUrl: ''
    };

    render() {
        const {style, activeCode, onActiveTab, liveChatUrl, agentFinanceLivechatUrl} = this.props;
        return (
            <Footer className="d-flex d-lg-none">
                <TabBarRoot>
                    <TabBarContainer style={style}>
                        <div className="container-fluid">
                            <div className="row">
                                <TabLink
                                    className={cx('col text-center', {active: activeCode === ''})}
                                    onClick={() => onActiveTab('')}
                                >
                                    <TabIcon code="home" size={24} />
                                    <TabName>
                                        <I18N id="menu.home" />
                                    </TabName>
                                </TabLink>
                                {
                                    siteConfig.walletMode === 'main' ?
                                        <TabLink
                                            className={cx('col text-center', {active: activeCode === 'wallet'})}
                                            onClick={() => onActiveTab('wallet')}
                                        >
                                            <TabIcon code="coupon" size={24} />
                                            <TabName>
                                                <I18N id="menu.coupons" />
                                            </TabName>
                                        </TabLink>
                                        :
                                        <TabLink
                                            className={cx('col text-center', {active: activeCode === 'promotion'})}
                                            onClick={() => onActiveTab('promotion')}
                                        >
                                            <TabIcon code="promotion" size={24} />
                                            <TabName>
                                                <I18N id="menu.promotion" />
                                            </TabName>
                                        </TabLink>
                                }
                                <TabLink
                                    className="col text-center d-flex justify-content-center"
                                    onClick={isEmpty(agentFinanceLivechatUrl) ?
                                        () => {
                                            if (siteConfig.walletMode === 'main') {
                                                onActiveTab('deposit/lobbySelect');
                                            } else {
                                                onActiveTab('deposit/lobby/auto/menu');
                                            }
                                        }:
                                        () => {
                                            window.open(agentFinanceLivechatUrl);
                                        }
                                    }
                                >
                                    <StartBox>
                                        <StartButton>
                                            <Icon code="deposit" color="#fff" size={30} />
                                            <TabName>
                                                <I18N id="menu.deposit" />
                                            </TabName>
                                        </StartButton>
                                    </StartBox>

                                </TabLink>
                                {
                                    siteConfig.walletMode === 'main' ?
                                        <TabLink
                                            className={cx('col text-center', {active: activeCode === 'transfer'})}
                                            onClick={() => onActiveTab('transfer')}
                                        >
                                            <TabIcon code="transfer" size={24} />
                                            <TabName>
                                                <I18N id="menu.transfer" />
                                            </TabName>
                                        </TabLink>
                                        :
                                        <TabLink
                                            className={cx('col text-center', {active: activeCode === 'myFavorite'})}
                                            onClick={() => onActiveTab('myFavorite')}
                                        >
                                            <TabIcon code="heart" size={24} />
                                            <TabName>
                                                <I18N id="page.home.favourite" />
                                            </TabName>
                                        </TabLink>
                                }
                                {
                                    siteConfig.walletMode === 'main' ?
                                        <TabLink
                                            className={cx('col text-center', {active: activeCode === 'promotion'})}
                                            onClick={() => onActiveTab('promotion')}
                                        >
                                            <TabIcon code="promotion" size={24} />
                                            <TabName>
                                                <I18N id="menu.promotion" />
                                            </TabName>
                                        </TabLink>
                                        :
                                        <TabLink
                                            className={cx('col text-center', {active: activeCode === 'liveChat'})}
                                            onClick={()=>window.open(liveChatUrl)}
                                        >
                                            <TabIcon code="support" size={24} />
                                            <TabName>
                                                <I18N id="page.login.liveChat" />
                                            </TabName>
                                        </TabLink>
                                }
                            </div>
                        </div>
                    </TabBarContainer>
                </TabBarRoot>
            </Footer>
        );
    }
}

export default TabBar;

const TabIcon = styled(Icon)`
    i {
        color: #6c6c6c;
    }
`;


const StartButton = styled.div`
    position: absolute;
    padding-top: ${px2vw(3)};
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
`;


const StartBox = styled.div`
    position: absolute;
    top: ${px2vw(-10)};
    background: ${props => `linear-gradient(${props.theme.primaryColor}, ${props.theme.primaryGradientColor})`};
    border-radius: ${px2vw(65)};
    width: ${px2vw(57)};
    height: ${px2vw(57)};
    padding: ${px2vw(10)};
    color: #fff;
    right: auto;
    left: auto;
`;

const TabName = styled.div`
    font-size: ${px2vw(10)};
    font-weight: 900;
`;

const TabLink = styled.button`
    background: none;
    padding: 0;
    border: none;

    color: #6a6b6c;
    &:hover {
        color: #fff;
    }

    &.active {
        ${TabIcon} i {
            color: #fff;
        }
        color: #fff;
    }
`;

const TabBarContainer = styled.div`
    color: #fff;

    background-color: ${props => props.theme.headerBackgroundColor};
    height: ${px2vw(44)};
    box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.3);
    align-items: center;
    display: flex;
    margin-top: ${px2vw(10)};
`;

const TabBarRoot = styled.div`
    height: ${px2vw(54)};
    overflow: hidden;
    position: fixed;
    z-index: 15;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
`;

const Footer = styled.footer`
`;
