// @flow

import React from 'react';
import styled from 'styled-components';
import get from 'lodash/get';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {withTranslation} from '@library/i18next/configureI18Next';
import Layout from '@layouts/example';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(4, 'Too Long!')
        .required('Required'),
    message: Yup.string()
        .min(10, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email Required'),
});


type Props = {
    t: (localeKey: string) => string,
};

const Contact = (props: Props) => {
    const {t} = props;
    return (
        <section className="contact-area col">
            <div className="container">
                <Formik
                    initialValues={{name: '', email: '', message: ''}}
                    validationSchema={SignupSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        validateForm,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <Label>Enter Your Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                    <Message>{errors.name && touched.name && errors.name}</Message>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <Label>Enter Your Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    <Message>{errors.email && touched.email && errors.email}</Message>
                                </div>
                                <div className="col-md-24 mb-4">
                                    <Label>Your Message</Label>
                                    <Textarea
                                        name="message"
                                        placeholder="Enter your message..."
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.message}
                                    />
                                    <Message>{errors.message && touched.message && errors.message}</Message>
                                </div>
                                <p className="form-message"/>
                                <div className="col-md-24">
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
                                        Send Now
                                    </MainBtn>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </section>
    );
};

Contact.Layout = Layout;
Contact.getInitialProps = async () => ({
    namespacesRequired: ['example'],
});

export default withTranslation()(Contact);

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
    padding: 0 30px;
    height: 65px;
    border: 1px solid #dedede4f;
    color: #222;
    font-size: 18px;
`;

const Textarea = styled.textarea`
    padding: 0 30px;
    padding-top: 10px;
    height: 270px;
    resize: none;
    width: 100%;
    border-radius: 7px;
    background-color: #fff;
    border: 1px solid #dedede4f;
    color: #222;
    font-size: 18px;
`;

const Label = styled.label`
    margin-bottom: 10px;
    display: block;
    font-size: 18px;
    color: #222;
`;

const Message = styled.div`
    color: #f14836;
`;
