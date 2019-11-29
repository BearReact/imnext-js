import React, {useState} from 'react'
import Link from 'next/link'
import styled, {css} from 'styled-components';


const Examples = () => {
    const [isVisibleNavbar, setVisibleNavbar] = useState(false);

    return (
        <>
            <header className="header-area">
                <NavbarArea>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-24">
                                <Navbar className="navbar navbar-expand-lg">
                                    <a className="navbar-brand" href="index.html">
                                        <img src="/static/images/examples/logo.png" alt="Logo"/>
                                    </a>
                                    <button className="navbar-toggler" type="button" onClick={()=>setVisibleNavbar(!isVisibleNavbar)}>
                                        MENU
                                    </button>

                                    <NavbarCollapse className="navbar-collapse sub-menu-bar collapse" isVisible={isVisibleNavbar}>
                                        <ul id="nav" className="navbar-nav m-auto">
                                            <NavItem className="active">
                                                <a href="#home">Home</a>
                                            </NavItem>
                                            <NavItem>
                                                <a href="#about">About </a>
                                            </NavItem>
                                            <NavItem>
                                                <a href="#services">Services</a>
                                            </NavItem>
                                            <NavItem>
                                                <a href="#portfolio">Portfolio</a>
                                            </NavItem>
                                            <NavItem>
                                                <a href="#blog">Blog</a>
                                            </NavItem>
                                            <NavItem>
                                                <a href="#contact">Contact</a>
                                            </NavItem>
                                        </ul>
                                    </NavbarCollapse>

                                    <div className="navbar-btn d-none d-sm-inline-block">
                                        <MainBtn data-scroll-nav="0" href="#pricing">Download</MainBtn>
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
                                    <HeroTitle className="fadeInUp">
                                        <b>Your</b> <span>Consultancy</span> Partner for <b>Growth.</b></HeroTitle>
                                    <HeroText className="text fadeInUp">Phasellus
                                        vel elit efficitur, gravida libero sit amet, scelerisque tortor arcu, commodo sit
                                        amet nulla sed.</HeroText>
                                    <HeroSignup className="header-singup fadeInUp">
                                        <input type="text" placeholder="username@yourdomain.com"/>
                                        <HeroSignupMainBtn as="button">Sign Up</HeroSignupMainBtn>
                                    </HeroSignup>
                                </HeaderHeroContent>
                            </div>
                        </div>
                    </div>
                    <HeaderHeroImage className="header-hero-image d-flex align-items-center fadeInRightBig">
                        <div className="image">
                            <img src="/static/images/examples/hero-image.png" alt="Hero Image"/>
                        </div>
                    </HeaderHeroImage>
                </HeaderHero>

            </header>


            <Footer>
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

        </>
    )
};

export default Examples;


const HeaderHero = styled.div`
    background-image: url("/static/images/examples/header-bg.jpg");
    position: relative;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 800px;
    
    @media only screen and (min-width: 1400px){
      height: 990px;
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
      margin-left: 40px;
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
        padding: 10px 0;
        position: relative;
        font-family: "Nunito", sans-serif;
        
       
     }
     
     
     
      @media (max-width: 767px){
          margin: 0;
          
          a{
            display: block;
            padding: 4px 0;
          }
    }
    
    @media only screen and (max-width: 991px) and (min-width: 768px){
        margin: 0;
        
        a{
            display: block;
            padding: 4px 0;
          }
    }
`;


const MainBtn = styled.a`
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


const HeaderHeroImage = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 47%;
    height: 100%;
`;

const HeaderHeroContent = styled.div`
  @media (max-width: 767px){
    padding-top: 150px;
  }
  
  @media only screen and (max-width: 991px) and (min-width: 768px){
    padding-top: 150px;
 }

`;

const HeroTitle = styled.h1`
    font-size: 60px;
    font-weight: 400;
    color: #000;
    
    b {
      font-weight: 700;
    }
    f
    span {
        color: #f14836;
        display: contents;
    }
    
    @media (max-width: 767px){
        font-size: 28px;
    }
`;

const HeroText = styled.p`
    max-width: 490px;
    font-size: 16px;
    padding-top: 40px;
    
    font-weight: 400;
    line-height: 24px;
    color: #798795;
    margin: 0px;
    font-family: "Nunito", sans-serif;
`;

const HeroSignup = styled.div`
    position: relative;
    margin-top: 120px;
    z-index: 9;
    
    input{
        width: 100%;
        height: 70px;
        font-size: 24px;
        border: 0;
        border-radius: 50px;
        padding: 0 30px;
        background-color: #fff;
        box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.05);
    }
    
    @media (max-width: 767px){
        margin-top: 60px;
        
        input{
          height: 56px;
        }
    }
`;


const HeroSignupMainBtn = styled(MainBtn)`
    position: absolute;
    top: 3px;
    right: 3px;
    height: 64px;
    line-height: 60px;
    padding: 0 40px;
    text-transform: uppercase;
    letter-spacing: 1px;
    
    @media (max-width: 767px){
        position: relative;
        top: 0;
        right: 0;
        width: 100%;
        height: 56px;
        line-height: 52px;
        margin-top: 10px;
    }

`;


const NavbarCollapse = styled.div`
    flex-basis: 100%;
    flex-grow: 1;
    align-items: center;
    
    
        
    @media only screen and (max-width: 991px) and (min-width: 768px){
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
    
    }
    @media (max-width: 767px){
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
    }
`;


const Footer = styled.footer`
    background-image: url("/static/images/examples/footer-bg.jpg");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;

`;


const FooterCopyRight = styled.div`
    padding: 25px;
    border-top: 1px solid #dedede4f;
`;

