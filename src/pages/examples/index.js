// @flow
import React from 'react';
import styled from 'styled-components';
import {withTranslation} from '@library/i18next/configureI18Next';
import screen from '@themes/Screen';
import Layout from '../../layouts/main';


type Props = {
    t: (localeKey: string) => string,
};

const Examples = (props: Props) => {
    const {t} = props;
    return (
        <HeaderHero className="d-lg-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-14">
                        <HeaderHeroContent>
                            <HeroTitle dangerouslySetInnerHTML={{__html: t('examples:pageHome.heroTitle')}} />
                            <HeroText className="text">{t('examples:pageHome.heroText')}</HeroText>
                            <HeroSignup>
                                <input type="text" placeholder={t('examples:pageHome.email')} />
                                <HeroSignupMainBtn as="button">{t('examples:button.signUp')}</HeroSignupMainBtn>
                            </HeroSignup>
                        </HeaderHeroContent>
                    </div>
                </div>
            </div>
        </HeaderHero>
    );
};

Examples.Layout = Layout;
Examples.getInitialProps = async () => ({
    namespacesRequired: ['examples'],
});

export default withTranslation()(Examples);

const HeaderHero = styled.div`
    background-image: url('/static/images/examples/header-bg.jpg');
    position: relative;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    padding-top: 130px;
    margin-top: -120px;

    @media ${screen.lg} {
        padding-top: 0;
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

const HeaderHeroContent = styled.div``;

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
    font-family: 'Nunito', sans-serif;
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

    input {
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
        input {
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
