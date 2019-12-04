// @flow

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styled, {css} from 'styled-components';
import cx from 'classnames';
import {i18n, withTranslation} from '@library/i18next/configureI18Next';
import screen from '@themes/Screen';

type Props = {
    children?: React.Node,
    t: boolean,
};

const Layout = (props: Props) => {
    const {children, t} = props;
    const [isVisibleNavbar, setVisibleNavbar] = useState(false);

    const changeLocale = () => {
        switch (i18n.language) {
            case 'en-US':
                i18n.changeLanguage('zh-CN');
                break;
            case 'zh-CN':
                i18n.changeLanguage('vi-VN');
                break;
            case 'vi-VN':
                i18n.changeLanguage('th-TH');
                break;
            case 'th-TH':
                i18n.changeLanguage('en-US');
                break;
            default:
                i18n.changeLanguage('en-US');
        }
    };

    const {pathname} = useRouter();

    const menu = [
        {text: t('example:menu.home'), href: '/example'},
        {text: t('example:menu.news'), href: '/example/news'},
        {text: t('example:menu.contact'), href: '/example/contact'},
    ];

    return (
        <div className="d-flex flex-column" style={{height: 'inherit'}}>
            <header className="col-auto" style={{height: 120}}>
                <NavbarArea>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-24">
                                <Navbar className="navbar navbar-expand-lg">
                                    <Link href="/example">
                                        <a className="navbar-brand">IMNEXT.js</a>
                                    </Link>

                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        onClick={() => setVisibleNavbar(!isVisibleNavbar)}
                                    >
                                        {t('example:button.menu')}
                                    </button>

                                    <NavbarCollapse
                                        className="navbar-collapse sub-menu-bar collapse"
                                        isVisible={isVisibleNavbar}
                                    >

                                        <ul className="navbar-nav m-auto">
                                            {menu.map((row) => (
                                                <NavItem
                                                    className={cx({active: pathname === row.href})}
                                                    key={row.href}
                                                >
                                                    <Link href={row.href}>
                                                        <a>{row.text}</a>
                                                    </Link>
                                                </NavItem>
                                            ))}


                                        </ul>
                                    </NavbarCollapse>

                                    <div className="navbar-btn d-none d-flex">
                                        <MainBtn type="button" className="btn col-auto mr-2" onClick={changeLocale}>
                                            {t('example:language')}
                                        </MainBtn>
                                    </div>
                                </Navbar>
                            </div>
                        </div>
                    </div>
                </NavbarArea>
            </header>

            {children}

            <Footer className="col-auto">
                <div className="container">
                    <FooterCopyRight className="footer-copyright text-center">
                        <p className="text">
                            © 2020 Crafted by
                            <a href="https://github.com/imagine10255/imnext" target="_blank" rel="noopener noreferrer">
                                imagine
                            </a>
                            {' '}
                            All All Rights Reserved.
                        </p>
                    </FooterCopyRight>
                </div>
            </Footer>
        </div>
    );
};

Layout.defaultProps = {
    children: null,
};

Layout.getInitialProps = async () => ({
    namespacesRequired: ['example'],
});

export default withTranslation()(Layout);


const NavbarArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    transition: all 0.3s ease-out 0s;

    will-change: transform;
`;

const Navbar = styled.nav`
    padding: 25px 0;
    border-radius: 5px;
    position: relative;
    transition: all 0.3s ease-out 0s;
`;

const NavItem = styled.li`
    margin-left: 0;
    position: relative;

    :first-child {
        margin-left: 0;
    }

    a {
        font-size: 16px;
        font-weight: 900;
        color: #222;
        transition: all 0.3s ease-out 0s;

        position: relative;
        font-family: 'Nunito', sans-serif;

        display: block;
        padding: 4px 0;
    }
    
    &.active > a,
    :hover > a {
        color: #f14836;
    }

   

    @media ${screen.md} {
        a {
            padding: 10px 0;
        }
    }

    @media ${screen.lg} {
        margin-left: 40px;

        a {
            padding: 4px 0;
        }
    }
`;

const MainBtn = styled.button`
    display: inline-block;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;

    user-select: none;
    border: 2px solid #f14836;
    padding: 0 30px;
    font-size: 16px;
    height: 55px;
    line-height: 51px;
    border-radius: 50px;
    color: #fff;
    cursor: pointer;
    z-index: 5;
    transition: all 0.4s ease-out 0s;
    background-color: #f14836;
`;


const NavbarCollapse = styled.div`
    
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 9;
    box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.1);
    padding: 5px 12px;
       
    ${(props) => !props.isVisible
    && css`
            display: none;
        `}




    @media ${screen.lg} {
        flex-basis: 100%;
        flex-grow: 1;
        align-items: center;
        display: block;
        
        position: static;
        box-shadow: none;
        background-color: transparent;
        top: auto;
        left: auto;
    }
`;

const Footer = styled.footer`
    background-image: url('/static/images/example/footer-bg.jpg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
`;

const FooterCopyRight = styled.div`
    padding: 25px;
    border-top: 1px solid #dedede4f;
`;
