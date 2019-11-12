// @flow
/**
 * Menu
 */
import * as React from 'react';
import styled, {css, convertPx2vw} from '@library/styled-components';
import {FormattedMessage as I18N} from 'react-intl';
import {HEXToRGB, px2vw} from '@utils/format';
import {asset} from '@utils/uri';
import {getVipUrl} from '@config/common';
import cx from 'classnames';
import screen from '@themes/Screen';
import get from 'lodash/get';

import Button from '@components/atoms/Button';
import MemberInfo from '@components/molecules/MemberInfo';
import MenuItem from '@components/molecules/MenuItem';
import MenuSelect from '@components/molecules/MenuSelect';
import Icon from '@components/atoms/Icon';
import A from '@components/atoms/A';
import {formatCurrency} from '@utils/number';
import RefreshButton from '@components/molecules/RefreshButton';
import {isEmpty} from '@utils/equal';

type Props = {
    history: any,
    style?: React.CSSProperties,
    intl: { formatMessage: Function},
    fetchNoticeMessage: Function,
    fetchRewardAmount: Function,
    onSubmitLogout?: Function,
    memberLevelCode?: string,
    memberLevelName?: string,
    account?: string,
    signUpDate?: string,
    isHasNotRead?: boolean,
    isAuth?: boolean,
    onClickMenu?: Function,
    appDownloadUrl?: string,
    isShowIPointRecord: boolean,
    paginateData?: {
        rows: Array<{
            id: string,
            iPointTitle: string,
            amountIn: integer,
            createdAt: string
        }>,
        pageTotal: 0,
        name: string,
        amountTotal: number
    },
    rewardAmount: 0,
    changeLocale: Function,
    locale: string,
    handleSetBlockAdvertisementModal: Function,
    fetchWalletData: Function,
    fetchWalletTransferData: Function,
    walletData: {},
    isFetching?: boolean,
    isRefresh?: boolean,
    isRefreshAuto?: boolean,
    blockAdvertisementData?: Array<{
        id: string,
        title: string,
        imgUrl: string,
        detailUrl: string
    }>,
    walletMode: string,
    iMoneyName: string,
    agentFinanceLivechatUrl: string,
};
type State = {};

const blackLang = siteConfig.blackLang;

class Menu extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: null,
        onSubmitLogout: undefined,
        memberLevelCode: 1,
        memberLevelName: '',
        account: '',
        signUpDate: '',
        isHasNotRead: false,
        isAuth: false,
        appDownloadUrl: 'javascript:;',
        onClickMenu: () => {},
        paginateData: {
            rows: [],
            pageTotal: 0,
            name: '',
            amountTotal: 0
        },
        isFetching: false,
        isRefresh: false,
        isRefreshAuto: false,
        blockAdvertisementData: []
    };

    componentDidMount() {
        const {fetchNoticeMessage, isAuth} = this.props;

        if(isAuth){
            fetchNoticeMessage({page: 1});
        }
    }

    /**
     * 切換語系
     * @param locale
     */
    handleLocale = (locale) => {
        const {changeLocale} = this.props;
        changeLocale(locale);
    };

    /**
     * 廣告區塊光箱
     */
    openAdvertModal = () => {
        const {handleSetBlockAdvertisementModal} = this.props;
        handleSetBlockAdvertisementModal(true);
    };


    render() {
        const {
            style,
            onSubmitLogout,
            account,
            memberLevelCode,
            memberLevelName,
            signUpDate,
            isHasNotRead,
            isAuth,
            history,
            onClickMenu,
            appDownloadUrl,
            isShowIPointRecord,
            paginateData,
            intl: {formatMessage: i18n},
            locale,
            walletData,
            isFetching,
            isRefresh,
            fetchWalletTransferData,
            fetchWalletData,
            isRefreshAuto,
            blockAdvertisementData,
            walletMode,
            iMoneyName,
            agentFinanceLivechatUrl
        } = this.props;

        // 存款連結
        let depositLink = '';
        if (!isEmpty(agentFinanceLivechatUrl)) {
            depositLink = agentFinanceLivechatUrl;
        } else {
            if (siteConfig.walletMode === 'main') {
                depositLink = '/deposit/lobbySelect';
            } else {
                depositLink = '/deposit/lobby/auto/menu';
            }
        }

        const languageOption = blackLang.map((row) => {
            return {
                value: row.toString(),
                text: i18n({id: `column.language.${row}`})
            };
        });


        const menuList = [
            {icon: 'star', name: <I18N id="menu.selfBonus"/>, href: '/selfDeposit/bonus', isAuth: true, isStar: true, className: siteConfig.walletMode === 'main' ? 'd-flex' : 'd-none'},
            {icon: 'hotjar', name: <I18N id="menu.hotPromotion"/>, as: 'div', isAuth: true, className: isEmpty(blockAdvertisementData) ? 'd-none' : 'd-none d-lg-flex'},
            {icon: 'coupon', name: <I18N id="menu.coupons"/>, href: '/wallet', isAuth: true, className: siteConfig.walletMode === 'main' ? 'd-flex' : 'd-none'},
            {icon: 'point', name: formatCurrency(get(paginateData, 'amountTotal', 0), false), desc: isAuth ? `${get(paginateData, 'name', 'iPoint')}${i18n({id: 'menu.iPoint'})}` : 'iPoint', href: '/history/ipoint', isAuth: true, className: isShowIPointRecord ? 'd-flex' : 'd-none'},
            {icon: 'user', name: <I18N id="menu.profile"/>, desc: isAuth ? <><I18N id="menu.memberSince"/> {signUpDate}</> : '', href: '/profile/info', isAuth: true},
            {icon: 'diamond', name: <I18N id="menu.vip"/>, href: getVipUrl(locale), as:'a', target: '_blank', isAuth: false, className: siteConfig.isHasVip ? 'd-flex' : 'd-none'}, // 先隱藏NEW的圖示, label: i18n({id: 'menu.new'})
            {icon: 'promotion', name: <I18N id="menu.promotion"/>, href: '/promotion', isAuth: false},
            {icon: 'notice', name: <I18N id="menu.notification"/>, href: '/notice', isAuth: true},
            {icon: 'daterange', name: <I18N id="menu.history"/>,desc: <I18N id="menu.historyExperience"/>, href: '/history', isAuth: true},
            {icon: 'download', name: <I18N id="menu.appDownload"/>, desc: <I18N id="menu.betterExperience"/>, href: appDownloadUrl, isAuth: false, as: 'a'}
        ];

        return (
            <MenuRoot style={style}>
                <LogoContainer className={cx('d-none d-lg-flex', (isAuth ? 'justify-content-lg-between': 'align-items-lg-center flex-lg-column '))}
                    isAuth={isAuth}>
                    <Logo src={asset(siteConfig.theme.homeHeaderLogo)} />
                    {isAuth && <GoHomeButton isActive={history.location.pathname === '/'} onClick={()=> history.push('/')}><Icon code="home" size={30}/></GoHomeButton>}
                    {!isAuth && (
                        <div className="text-center pt-2">
                            <WelComeText className="mb-3"><I18N id="page.login.welcome" /></WelComeText>

                            <div className="d-flex flex-row mb-2">
                                <LoginButton theme="primary" onClick={()=> history.push('/login')}><I18N id="action.login" /></LoginButton>
                                <SignUpButton theme="primary" onClick={()=> history.push('/signup')}><I18N id="page.login.signUp" /></SignUpButton>
                            </div>
                        </div>
                    )}
                </LogoContainer>


                <MenuHeader className={cx({'d-lg-none': !isAuth})}>
                    <MemberInfo
                        level={isAuth ? parseInt(memberLevelCode, 10) : ''}
                        account={isAuth ? account : 'Guest'}
                        memberLevelName={isAuth ? memberLevelName : ''}
                    />

                    <SettingButton className="d-none">
                        <Icon code="setting" size={18}/>
                    </SettingButton>

                    {isAuth && <SignOutButton theme="darkGray" size="normal" onClick={onSubmitLogout}>
                        <I18N id="menu.signOut" />
                    </SignOutButton>}
                </MenuHeader>

                <MenuItemList>
                    {!isAuth &&
                        <MenuItem
                            key="home"
                            icon="home"
                            isActive={history.location.pathname === '/'}
                            name={<I18N id="menu.home"/>}
                            onClick={()=>history.push('/')}
                        />
                    }


                    {/* 領取錢包 */}
                    {isAuth &&
                        <Wallet>
                            <WalletTitle>{iMoneyName}</WalletTitle>
                            <Amount>${formatCurrency(get(walletData, 'amount', 0))}</Amount>

                            {siteConfig.walletMode === 'main' && (
                                <OneClickTransferArea onClick={()=>fetchWalletTransferData(false)}>
                                    <OneClickTransferButton disabled={isFetching}>
                                        <Icon isInline code='sync' color="#fff" size={16} />
                                        <span>
                                            <I18N id='page.wallet.oneClickTransferCenterWallet'/>
                                        </span>
                                    </OneClickTransferButton>
                                </OneClickTransferArea>
                            )}

                            {siteConfig.walletMode === 'auto' && (
                                <CustomRefeshButton
                                    onClick={fetchWalletData}
                                    disabled={isRefresh || isRefreshAuto}
                                    isRefreshing={isRefresh}
                                    isDisableColor={isRefresh || isRefreshAuto}
                                />
                            )}
                        </Wallet>
                    }


                    {/* 存取款＆轉帳 */}
                    {isAuth &&
                        <AboutAmount>
                            <ButtonArea className={siteConfig.walletMode === 'main' ? 'col-8' : 'col-12'}>
                                <IconArea
                                    as={isEmpty(agentFinanceLivechatUrl) ? '' : 'a'}
                                    href={depositLink}
                                    onClick={onClickMenu}
                                    isActive={history.location.pathname.indexOf('/deposit') === 0}
                                    target={isEmpty(agentFinanceLivechatUrl) ? '' : '_blank'}
                                >
                                    <Icon isInline code='deposit' color="#9b9b9b" shapeType="default" shapeColor="#292c31"
                                        size={28}/>
                                    <Way>{i18n({id: 'menu.deposit'})}</Way>
                                </IconArea>
                            </ButtonArea>
                            <ButtonArea className={siteConfig.walletMode === 'main' ? 'col-8' : 'col-12'}>
                                <IconArea
                                    as={isEmpty(agentFinanceLivechatUrl) ? '' : 'a'}
                                    href={isEmpty(agentFinanceLivechatUrl) ? (`/withdrawal/lobby/${iMoneyCode}`) : (agentFinanceLivechatUrl)}
                                    onClick={onClickMenu}
                                    isActive={history.location.pathname.indexOf('/withdrawal') === 0}
                                    target={isEmpty(agentFinanceLivechatUrl) ? '' : '_blank'}
                                >
                                    <Icon isInline code='withdrawal' color="#9b9b9b" shapeType="default"
                                        shapeColor="#292c31" size={28}/>
                                    <Way>{i18n({id: 'page.startGameBeforeModal.withdrawal'})}</Way>
                                </IconArea>
                            </ButtonArea>
                            {
                                siteConfig.walletMode === 'main' &&
                                <ButtonArea className='col-8'>
                                    <IconArea as='' href='/transfer' onClick={onClickMenu}
                                        isActive={history.location.pathname.indexOf('/transfer') === 0}>
                                        <Icon isInline code='transfer' color="#9b9b9b" shapeType="default" shapeColor="#292c31"
                                            size={28}/>
                                        <Way>{i18n({id: 'menu.transfer'})}</Way>
                                    </IconArea>
                                </ButtonArea>
                            }
                        </AboutAmount>
                    }

                    {menuList
                        .filter(row => isAuth >= row.isAuth)
                        .map(menuConfig => (
                            <MenuItem {...menuConfig}
                                key={menuConfig.icon}
                                isHasNotRead={isHasNotRead}
                                isActive={history.location.pathname.indexOf(menuConfig.href) === 0}
                                onClick={menuConfig.icon === 'hotjar' ? ()=>this.openAdvertModal() : onClickMenu}
                                icon={menuConfig.icon}
                            />
                        ))
                    }

                    <MenuSelect
                        icon="public"
                        name={<I18N id="menu.language"/>}
                        options={languageOption}
                        onChange={this.handleLocale}
                        value={locale}
                    />

                    <Version>
                        ver {appVersion}
                    </Version>

                </MenuItemList>
            </MenuRoot>
        );
    }
}

export default Menu;

const bgRGB = HEXToRGB(siteConfig.theme.primaryColor).join(',');

const GoHomeButton = styled(Button)`
    padding: 0;
    min-height: auto;
    height: auto;

    ${props => props.isActive && css`
        .iconfont{
            color: ${props.theme.primaryColor};
        }
    `}

    &:hover .iconfont{
        color: ${props => props.theme.primaryColor};
    }
`;

const LoginButton = styled(Button)`
    border: none;
    border-radius: 2px;
    font-size: 12px;
    padding: 8px 25px;
    margin-left: 6px;
    margin-right: 6px;
    min-width: 100px;
    min-height: 30px;
    
    &::after {
        content: unset;
    }   
`;

const SignUpButton = styled(LoginButton)`
    border: solid 1px ${siteConfig.theme.primaryColor};
    background-color: rgba(${bgRGB}, 0.1);
`;


const WelComeText = styled.div`
    font-size: 14px;
    font-weight: 300;
    opacity: .6;
`;


const SettingButton = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    background-color: #292c31;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const Logo = styled.div`
    ${convertPx2vw`
        height: 30px;
        width: 100px;
        background: transparent no-repeat center center;
        background-size: 100%;
        background-image: url(${props => props.src});
    `};

    @media ${screen.lg} {
        height: 30px;
        width: 100px;
    };
`;

const LogoContainer = styled.div`
    min-height: ${px2vw(56)};
    ${convertPx2vw`
        background-color: #292c31;
        border-bottom: 1px solid rgba(151, 151, 151, 0.1);
        padding: 10px 20px 10px 0;
    `};

    ${props => !props.isAuth && css`
        ${Logo}{
            width: 133px;
            height: 40px;
        }
    `};

    @media ${screen.lg} {
        border-bottom: 1px solid rgba(151, 151, 151, 0.1);
        padding: 10px 20px 10px 10px;
        min-height: 56px;
        
        ${props => !props.isAuth && css`
            border-bottom: none;
        `}
    };

`;

const Version = styled.div`
    color: rgba(255, 255, 255, 0.43);
    text-align: center;
    width: 100%;
    padding-top: ${px2vw(10)};
    padding-bottom: 0;
    font-size: ${px2vw(14)};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex: 1 0 auto;
   
    @media ${screen.lg} {
        padding-top: 10px;
        padding-bottom: 0;
        font-size: 14px;
    };
`;

const SignOutButton = styled(Button)`
    margin-right: ${px2vw(15)};
    min-width: 70px;

    @media ${screen.lg} {
        font-size: 14px;
        margin-right: 15px;
    };
`;

const MenuItemList = styled.div`
    display: flex;
    flex-direction: column;

    ${convertPx2vw`
        padding-bottom: 5px;
    `};

    @media ${screen.lg} {
        padding-bottom: 10px;
        overflow: auto;
        flex: 1 1 auto;

        /* 设置滚动条的样式 */
        ::-webkit-scrollbar {
            width:5px;
        }
        /* 滚动槽 */
        ::-webkit-scrollbar-track {
            -webkit-box-shadow:rgba(0,0,0,0.3);
            border-radius: 5px;
        }
        /* 滚动条滑块 */
        ::-webkit-scrollbar-thumb {
            border-radius:5px;
            background:rgba(73, 81, 84, .5);
            -webkit-box-shadow:rgba(73, 81, 84, .5);
        }
        ::-webkit-scrollbar-thumb:window-inactive {
            background-color: rgba(73, 81, 84, .5);
        }
    };
`;

const MenuHeader = styled.div`
    ${convertPx2vw`
        background-color: #292c31;
        height: 90px;
        min-height: 90px
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: revert;
    `};

    @media ${screen.lg} {
        height: 100px;
        min-height: 100px;
        justify-content: space-between;
        padding: 20px 0;
    };
`;

const MenuRoot = styled.div`
    ${convertPx2vw`
        color: #fff;
        padding-bottom: 10px;
    `};

    @media ${screen.lg} {
        padding-bottom: 10px;
    };
`;

const Wallet = styled.div`
    align-items: center;
    position: relative;
    display: block;
    
    ${siteConfig.walletMode === 'main' && css`
        padding-top: ${px2vw(23)};
        
        @media ${screen.lg} {
            padding-top: 23px;
        }
    `}
    
    ${siteConfig.walletMode === 'auto' && css`
        padding-top: ${px2vw(33)};
        
        @media ${screen.lg} {
            padding-top: 33px;
        }
    `}
`;

const Amount = styled.span`
    font-size: ${px2vw(20)};
    padding-top: ${px2vw(10)};
    padding-bottom: ${px2vw(18)};
    font-weight: 900;
    text-align: center;
    color: #fdb913;
    display: inline-block;
    width: 100%;
    
    @media ${screen.lg} {
        font-size: 20px;
        padding-top: 10px;
        padding-bottom: 18px;
    }
`;

const AboutAmount = styled.div`
    padding-bottom: ${px2vw(10)};
    padding-left: ${px2vw(5)};
    padding-right: ${px2vw(5)};
    border-bottom: 1px solid rgba(41,44,49,.7);
    padding-top: ${px2vw(10)};
    border-top: 1px solid rgba(41,44,49,.7);
    
    @media ${screen.lg} {
        padding: 10px 5px;
    }
`;

const ButtonArea = styled.div`
    padding-left: ${px2vw(5)};
    padding-right: ${px2vw(5)};
    display: inline-flex;
    
    @media ${screen.lg} {
        padding-left: 5px;
        padding-right: 5px;
    }
`;

const IconArea = styled(A)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: ${px2vw(55)};
    border-radius: 4px;
    border: solid 1px rgba(151, 151, 151, 0.1);
    background-color: #292c31;
    
    :hover {
        color: #9b9b9b;
    }
    
    ${props => props.isActive && css`
        span {
            color: ${props => props.theme.primaryColor};
        } 
        
        .iconfont{
            color: ${props => props.theme.primaryColor};
        }
    `};
    
    @media ${screen.lg} {
        height: 55px;
        
        :hover {
            span {
                color: ${props => props.theme.primaryColor};
            }
            
            .iconfont{
                color: ${props => props.theme.primaryColor};
            }
        }
    }
`;

const Way = styled.span`
    font-size: ${px2vw(12)};
    font-weight: 900;
    color: #9b9b9b;
    
    @media ${screen.lg} {
        font-size: 12px;
    }
`;

const OneClickTransferArea = styled.div`
    width: 100%;
    padding: 0 ${px2vw(11)} 0;
    margin: 0 0 8px;
    @media ${screen.lg} {
        padding: 0 11px 8px;
    }
`;

const OneClickTransferButton = styled(Button)`
    background-color: #292c31;
    color: #fff;
    width: 100%;
    height: ${px2vw(40)};
    font-size: ${px2vw(12)};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    
    > span {
        padding-left: 5px;    
    } 
    @media ${screen.lg} {
        height: 40px;
        font-size: 12px;
    }
`;

const CustomRefeshButton = styled(RefreshButton)`
    position: absolute;
    right: ${px2vw(10)};
    top: ${px2vw(10)};
    padding: 0;
    
    @media ${screen.lg} {
        right: 10px;
        top: 10px;
    }
`;

const WalletTitle = styled.div`
    font-size: ${px2vw(12)};
    font-weight: 900;
    text-align: center;
    color: #8d8d8d;
    
    @media ${screen.lg} {
        font-size: 12px;
    }
`;
