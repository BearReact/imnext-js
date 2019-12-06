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
    const [isVisibleNavBar, setVisibleNavbar] = useState(false);

    const changeLocale = () => {
        switch (i18n.language) {
            case 'en-US':
                i18n.changeLanguage('zh-CN');
                break;
            case 'zh-CN':
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
            <Header>
                <div className="container pt-3 pb-3">
                    <div className="row align-items-center">
                        {/* LOGO */}
                        <div className="col col-md-2">
                            <Link href="/example">
                                <Logo>IMNEXT.js</Logo>
                            </Link>
                        </div>

                        {/* MENU */}
                        <NavCol className="col-md" isVisible={isVisibleNavBar}>
                            <nav className="navbar navbar-expand-md p-0">
                                <NavBarCollapse className="navbar-collapse sub-menu-bar collapse">
                                    <ul className="navbar-nav m-auto row">
                                        {menu.map(row => (
                                            <NavItem
                                                className={cx('col-auto', {active: pathname === row.href})}
                                                key={row.href}
                                            >
                                                <Link href={row.href}>
                                                    <a>{row.text}</a>
                                                </Link>
                                            </NavItem>
                                        ))}
                                    </ul>
                                </NavBarCollapse>
                            </nav>
                        </NavCol>

                        {/* Change Language */}
                        <div className="col-auto d-none d-md-flex">
                            <Button type="button" className="btn col-auto mr-2" onClick={changeLocale}>
                                {t('example:language')}
                            </Button>
                        </div>

                        {/* MENU TOGGLE */}
                        <div className="col-auto d-md-none">
                            <button
                                className="navbar-toggler"
                                type="button"
                                onClick={() => setVisibleNavbar(!isVisibleNavBar)}
                            >
                                {t('example:button.menu')}
                            </button>
                        </div>

                    </div>
                </div>
            </Header>

            <div className="col pt-3">
                {children}
            </div>

            <Footer className="col-auto">
                <div className="container">
                    <FooterCopyRight className="footer-copyright text-center">
                        <p className="text">
                            © 2020 Copyright by
                            {' '}
                            <a href="https://github.com/imagine10255/imnext" target="_blank" rel="noopener noreferrer">
                                Imagine
                            </a>
                            {' '}
                            All Rights Reserved.
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

const Footer = styled.footer`
    background-image: url('/static/images/example/footer-bg.jpg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
`;

const FooterCopyRight = styled.div`
    padding: 20px 0 10px 0;
    border-top: 1px solid #dedede4f;
    color: #798795;
    
    a{
        color: #f14836;
    }
`;

const NavItem = styled.li`
    position: relative;
    padding: 5px 0;

    a {
        font-size: 16px;
        font-weight: 900;
        color: #222;
        transition: color 0.3s ease-out 0s;
        position: relative;
    }
    
    &.active > a, :hover > a {
        color: #f14836;
    }
    
    
    @media ${screen.md} {
        padding: 0 10px;
    }
`;

const NavBarCollapse = styled.div`
    display: none;
   
    width: 100%;
    background-color: rgba(255,255,255,.9);
    z-index: 9;
    box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.1);
    padding: 5px 12px;

    @media ${screen.md} {
        position: static;
        top: auto;
        left: auto;
        box-shadow: none;
        background-color: transparent;
    }
`;

const NavCol = styled.div`
    position: absolute;
    top: 45px;

    ${props => props.isVisible && css`
        ${NavBarCollapse}{
            display: block;
        }
    `}
    
    @media ${screen.md} {
        position: static;
    }
`;

const Button = styled.button`
    font-weight: 700;
    border: 2px solid #f14836;
    border-radius: 50px;
    color: #fff;
    background-color: #f14836;
    font-size: 14px;
    padding: 10px 25px;
    
    :hover{
        color: #f14836;
        background-color: #e7e7e7;
    }
`;

const Logo = styled.a`
    font-size: 20px;
    font-weight: 700;
`;

const Header = styled.header`
    flex: 0 0 auto;
`;
