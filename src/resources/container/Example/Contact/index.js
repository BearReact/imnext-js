// @flow

import React from 'react';
import styled, {css} from 'styled-components';
import get from 'lodash/get';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {compose} from 'redux';
import injectReducerSaga from '@library/redux/utils/injectReducerSaga';
import LoaderContainer from '@components/atoms/Loader';
import ProgressBar from '@components/atoms/ProgressBar';
import pageAction, {reducer, saga} from './store';

type Props = {
    t: (localeKey: string) => string,
    isSubmitting?: boolean,
    onSubmit: Function,
    progress?: number,
};

const Contact = (props: Props) => {
    const {
        t, onSubmit, isSubmitting, progress,
    } = props;

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, t('common:errorForm.tooShortString', {name: t('example:pageContact.label.name'), length: 2}))
            .max(10, t('common:errorForm.tooShortLong', {name: t('example:pageContact.label.name'), length: 10}))
            .required(t('common:errorForm.require', {name: t('example:pageContact.label.name')})),
        email: Yup.string()
            .email(t('common:errorForm.invalid', {name: t('example:pageContact.label.email')}))
            .required(t('common:errorForm.require', {name: t('example:pageContact.label.email')})),
        message: Yup.string()
            .max(50, t('common:errorForm.tooLongString', {name: t('example:pageContact.label.message'), length: 50}))
            .required(t('common:errorForm.require', {name: t('example:pageContact.label.message')})),
    });

    return (
        <section>
            <LoaderContainer
                className="container"
                isLoading={isSubmitting}
                visibleMode="render"
                rolling={(
                    <CustomProgressBar
                        progress={progress}
                        isVisibleProgressText
                    />
                )}
            >

                {/* 標題 */}
                <div className="row justify-content-center mb-4">
                    <div className="col-lg-8">
                        <div className="text-center">
                            <PageSubTitle>{t('example:pageContact.subTitle')}</PageSubTitle>
                            <PageTitle dangerouslySetInnerHTML={{__html: t('example:pageContact.title')}}/>
                        </div>
                    </div>
                </div>

                <Formik
                    initialValues={{name: '', email: '', message: ''}}
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
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <Label>{t('example:pageContact.label.name')}</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder={t('example:pageContact.placeholder.name')}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                </div>
                                <div className="col-md-12 mb-4">
                                    <Label>{t('example:pageContact.label.email')}</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder={t('example:pageContact.placeholder.email')}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                </div>
                                <div className="col-md-24 mb-4">
                                    <Label>{t('example:pageContact.label.message')}</Label>
                                    <Textarea
                                        name="message"
                                        placeholder={t('example:pageContact.placeholder.message')}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.message}
                                    />
                                </div>
                                <p className="form-message"/>
                                <div className="col-md-24 mb-4">
                                    <MainBtn
                                        type="submit"
                                        onClick={() => {
                                            validateForm().then(validateErrors => {
                                                const field = get(Object.keys(validateErrors), 0, false);
                                                if (field) {
                                                    alert(validateErrors[field]);
                                                }
                                            });
                                        }}
                                    >
                                        {t('example:pageContact.sendNow')}
                                    </MainBtn>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </LoaderContainer>
        </section>
    );
};

Contact.defaultProps = {
    isSubmitting: false,
    progress: 0,
};

const mapDispatchToProps = {
    onSubmit: pageAction.submitForm,
};

const mapStateToProps = state => ({
    isSubmitting: state.contact.isSubmitting,
    progress: state.contact.progress,
});

export default compose(
    injectReducerSaga('contact', {reducer, saga}),
    connect(mapStateToProps, mapDispatchToProps)
)(Contact);

const CustomProgressBar = styled(ProgressBar)`
    width: 400px;
    height: 20px;
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

const Input = styled.input`
    width: 100%;
    border-radius: 7px;
    background-color: #fff;
    padding: 0 20px;
    height: 65px;
    border: 1px solid #dedede4f;
    color: #222;
    font-size: 16px;
`;

const Textarea = styled.textarea`
    padding: 10px 20px 0 20px;
    height: 270px;
    resize: none;
    width: 100%;
    border-radius: 7px;
    background-color: #fff;
    border: 1px solid #dedede4f;
    color: #222;
    font-size: 16px;
`;

const Label = styled.label`
    margin-bottom: 10px;
    display: block;
    font-size: 16px;
    color: #222;
    padding-left: 10px;
`;

const PageSubTitle = styled.h6`
    font-size: 18px;
    font-weight: 400;
    color: #f14836;
    text-transform: uppercase;
`;
const PageTitle = styled.h4`
    font-size: 32px;
    
    span{
        font-weight: 400;
        display: contents;  
    }
`;
