// @flow
import React from 'react';
import styled from 'styled-components';
import {withTranslation} from '@library/i18next/configureI18Next';
import screen from '@themes/Screen';
import Layout from '@layouts/example';
import {asset} from '@utils/uri';

type Props = {
    t: (localeKey: string) => string,
};

const Example = (props: Props) => {
    const {t} = props;
    return (
        <HeaderHero className="d-lg-flex">
            <div className="container">
                <div className="row">
                    <div className="col-lg-14">
                        <HeroTitle dangerouslySetInnerHTML={{__html: t('example:pageHome.heroTitle')}}/>
                        <HeroText className="text">{t('example:pageHome.heroText')}</HeroText>
                        <HeroSignUp>
                            <input type="text" placeholder={t('example:pageHome.email')}/>
                            <Button as="button" className="btn btn-block">{t('example:button.signUp')}</Button>
                        </HeroSignUp>
                    </div>
                </div>
            </div>
        </HeaderHero>
    );
};

Example.Layout = Layout;
Example.getInitialProps = async () => ({
    namespacesRequired: ['example'],
});

export default withTranslation()(Example);

const HeaderHero = styled.div`
    background-image: url(${asset('images/example/header-bg.jpg')});
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    padding-top: 50px;

    @media ${screen.lg} {
        padding-top: 150px;
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

const HeroSignUp = styled.div`
    position: relative;
    z-index: 9;

    input {
        width: 100%;
        height: 56px;
        border: 0;
        border-radius: 50px;
        padding: 0 30px;
        background-color: #fff;
        box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.05);
        margin-bottom: 10px;
    }

    @media ${screen.lg} {
        input {
            height: 70px;
            font-size: 24px;
        }
    }
`;
