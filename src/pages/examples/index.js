import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import styled, {css} from 'styled-components';
import { i18n, withTranslation } from '@library/i18next/configureI18Next'
import screen from '@themes/Screen';


const Examples = ({t}) => {
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
        }
    };


    return (
        <div className="d-flex flex-column" style={{height: 'inherit'}}>
            <header className="col">
                <NavbarArea>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-24">
                                <Navbar className="navbar navbar-expand-lg">
                                    <Link href="/examples">
                                        <a className="navbar-brand">
                                            INNEXT.js
                                        </a>
                                    </Link>


                                    <button className="navbar-toggler" type="button" onClick={()=>setVisibleNavbar(!isVisibleNavbar)}>
                                        {t('examples:button.menu')}
                                    </button>

                                    <NavbarCollapse className="navbar-collapse sub-menu-bar collapse" isVisible={isVisibleNavbar}>
                                        <ul className="navbar-nav m-auto">
                                            <NavItem className="active">
                                                <Link href="/examples">
                                                    <a>{t('examples:menu.home')}</a>
                                                </Link>
                                            </NavItem>

                                            <NavItem>
                                                <Link href="/examples/contact">
                                                    <a>{t('examples:menu.contact')}</a>
                                                </Link>
                                            </NavItem>
                                        </ul>
                                    </NavbarCollapse>


                                    <div className="navbar-btn d-none d-flex">
                                        <MainBtn type="button" className="btn col-auto mr-2" onClick={changeLocale}>{t('examples:language')}</MainBtn>
                                        {/*<MainBtn target="_blank" href="https://github.com/imagine10255/nextjs9-start-kit">{t('examples:button.download')}</MainBtn>*/}
                                    </div>
                                </Navbar>
                            </div>
                        </div>
                    </div>
                </NavbarArea>


                <HeaderHero className="d-lg-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-14">
                                <HeaderHeroContent>
                                    <HeroTitle dangerouslySetInnerHTML={{__html: t('examples:pageHome.heroTitle')}}>
                                    </HeroTitle>
                                    <HeroText className="text">{t('examples:pageHome.heroText')}</HeroText>
                                    <HeroSignup>
                                        <input type="text" placeholder={t('examples:pageHome.email')}/>
                                        <HeroSignupMainBtn as="button">{t('examples:button.signUp')}</HeroSignupMainBtn>
                                    </HeroSignup>
                                </HeaderHeroContent>
                            </div>
                        </div>
                    </div>
                </HeaderHero>

            </header>


            <Footer className="col-auto">
                <div className="container">
                    <FooterCopyRight className="footer-copyright text-center">
                        <p className="text">© 2022 Crafted by <a href="https://uideck.com" rel="nofollow">UIdeck</a> All
                            Rights Reserved.</p>
                    </FooterCopyRight>
                </div>
            </Footer>


            {/*<Header className="header-hero bg_cover d-lg-flex align-items-center">*/}
            {/*    <h1>索引頁面</h1>*/}
            {/*    <ul>*/}
            {/*        <li>*/}
            {/*            <Link href='/examples/withFlowType'><a>with FlowType</a></Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link href='/examples/withReactI18Next'><a>with React I18Next</a></Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link href='/examples/withNextI18Next'><a>with Nextjs I18Next</a></Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link href='/examples/withBootstrap'><a>with Bootstrap</a></Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link href={{ pathname: '/examples/withServerHandle', query: { id: 'Zeit' } }}><a>With Server Handle</a></Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link href='/examples/withInjectSaga'><a>with Inject Saga</a></Link>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</Header>*/}

        </div>
    )
};


Examples.getInitialProps = async () => ({
    namespacesRequired: ['examples'],
});


export default withTranslation()(Examples)


const HeaderHero = styled.div`
    background-image: url("/static/images/examples/header-bg.jpg");
    position: relative;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    padding-top: 130px;
    
    @media ${screen.lg} {
        padding-top: 0;
    }
`;

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

    
    
    
      margin-left: 00;
      position: relative;
    
      :first-child {
        margin-left: 0;
      }
      
      &.active > a, :hover > a{
        color: #f14836;
      }
      
      a{
        font-size: 16px;
        font-weight: 900;
        color: #222;
        transition: all 0.3s ease-out 0s;
        
        position: relative;
        font-family: "Nunito", sans-serif;
        
        display: block;
        padding: 4px 0;
     }
     
     
     @media ${screen.md} {
        
        a{
          padding: 10px 0;
        }
    }
     
     @media ${screen.lg} {
        margin-left: 40px;
        
        a{
          padding: 4px 0;
        }
    }
    

`;


const MainBtn = styled.button`
    display: inline-block;
    font-weight: 700;
    font-family: "Nunito", sans-serif;
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
`


const HeaderHeroContent = styled.div`
`;

const HeroTitle = styled.h1`
    font-size: 28px;

    font-weight: 400;
    color: #000;
    
    b {
      font-weight: 700;
    }
    
    span {
        color: #f14836;
        display: contents;
    }
    
    @media ${screen.lg} {
        font-size: 60px;
    }
`;

const HeroText = styled.p`
    font-family: "Nunito", sans-serif;
    max-width: 490px;
    font-size: 16px;
    
    font-weight: 400;
    line-height: 24px;
    color: #798795;
    margin-bottom: 50px;
`;

const HeroSignup = styled.div`
    position: relative;
    z-index: 9;

    input{
      width: 100%;
      height: 56px;
      border: 0;
      border-radius: 50px;
      padding: 0 30px;
      background-color: #fff;
      box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.05);
      margin-bottom: 10px;
    }
    
    @media ${screen.lg} {
        
        input{
            height: 70px;
            font-size: 24px;
            
        }
    }
`;


const HeroSignupMainBtn = styled(MainBtn)`
    position: relative;
    top: 0;
    right: 0;
    width: 100%;
    height: 56px;
    line-height: 52px;
      
    
     @media ${screen.lg} {
        position: absolute;
        top: 3px;
        right: 3px;
        height: 64px;
        line-height: 60px;
        padding: 0 40px;
        text-transform: uppercase;
        letter-spacing: 1px;
        width: auto;
        height: auto;
     }

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
       
    ${props => !props.isVisible && css`
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
    background-image: url("/static/images/examples/footer-bg.jpg");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
`;


const FooterCopyRight = styled.div`
    padding: 25px;
    border-top: 1px solid #dedede4f;
`;


const LanguageButton = styled.button`
    line-height: 100%;
    padding: 0;
`;

