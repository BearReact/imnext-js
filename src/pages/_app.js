import React from 'react';
import App  from 'next/app';
import { ThemeProvider } from 'styled-components'
import {compose} from 'redux';
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

import createStore from '@library/redux/configureStore'
import { appWithTranslation } from '@library/i18next/configureI18Next';

import '@assets/scss/dist/bootstrap.css';
import '@assets/scss/dist/app.scss';


const theme = {
    colors: {
        primary: '#0070f3'
    }
}

const Noop = ({ children }) => children;


class MyApp extends App {

    static async getInitialProps ({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            const customPageProps = await Component.getInitialProps({ ctx });
            pageProps = Object.assign(pageProps, customPageProps);
        }

        return { pageProps }
    }

    render() {
        const { Component, pageProps, store } = this.props;
        const Layout = Component.Layout || Noop;

        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </Provider>
        )
    }
}

export default compose(
    withRedux(createStore),
    withReduxSaga,
    appWithTranslation
)(MyApp);
