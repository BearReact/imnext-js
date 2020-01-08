// @flow
import React from 'react';
import styled from 'styled-components';
import screen from '@themes/Screen';
import {asset} from '@utils/uri';
import {Formik} from 'formik';
import * as Yup from 'yup';
import pageAction from '@library/redux/store/Login/Reducer';
import {compose} from 'redux';
import {connect} from 'react-redux';
import LoaderContainer from '@components/atoms/Loader';

type Props = {
    t: (localeKey: string) => string,
    onSubmit: Function,
    isSubmitting?: boolean,
};

const Home = (props: Props) => {
    const {t, onSubmit, isSubmitting} = props;

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('common:errorForm.invalid', {name: t('example:pageContact.label.email')}))
            .required(t('common:errorForm.require', {name: t('example:pageContact.label.email')})),
    });

    return (
        <HeaderHero className="d-lg-flex">
            <LoaderContainer className="container" isLoading={isSubmitting}>

                <div className="row">
                    <div className="col-lg-14">
                        <HeroTitle dangerouslySetInnerHTML={{__html: t('example:pageHome.heroTitle')}}/>
                        <HeroText className="text">{t('example:pageHome.heroText')}</HeroText>
                        <HeroSignUp>
                            <Formik
                                initialValues={{email: ''}}
                                validationSchema={validationSchema}
                                validateOnChange={false}
                                validateOnBlur={false}
                                onSubmit={(values, {setSubmitting, resetForm}) => {

                                    // 送出表單
                                    onSubmit(values, resetForm);

                                // setTimeout(() => {
                                //     alert(JSON.stringify(values, null, 2));
                                //     setSubmitting(false);
                                // }, 400);
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    validateForm,
                                /* and other goodies */
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            type="email"
                                            placeholder={t('example:pageHome.email')}
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Button as="button" className="btn btn-block">{t('example:button.signIn')}</Button>
                                    </form>
                                )}
                            </Formik>

                        </HeroSignUp>
                    </div>
                </div>
            </LoaderContainer>
        </HeaderHero>
    );
};

Home.defaultProps = {
    isSubmitting: false,
};

const mapDispatchToProps = {
    onSubmit: pageAction.submitLogin,
};

const mapStateToProps = state => ({
    isSubmitting: state.login.isSubmitting,
    progress: state.login.progress,
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Home);

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
