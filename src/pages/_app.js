import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import {ThemeProvider} from 'styled-components';
import {compose} from 'redux';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import {asset} from '@utils/uri';

import createStore from '@library/redux/configureStore';
import {appWithTranslation} from '@library/i18next/configureI18Next';

import '@assets/styles/dist/bootstrap.css';
import '@public/static/plugins/iconfont/iconfont.css';
import '@assets/styles/dist/app.scss';

const Noop = ({children}) => children;

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        let pageProps = {};

        if (Component.getInitialProps) {
            const customPageProps = await Component.getInitialProps({ctx});
            pageProps = Object.assign(pageProps, customPageProps);
        }

        return {pageProps};
    }

    render() {
        const {Component, pageProps, store} = this.props;
        const Layout = Component.Layout || Noop;

        // eslint-disable-next-line no-console
        // console.log('__global__', __global__);

        return (
            <>
                <Head>
                    <title>{__global__.meta.title}</title>
                    <meta name="description" content={__global__.meta.description}/>

                    {/* Make the page mobile compatible */}
                    <meta name="renderer" content="webkit"/>
                    <meta name="force-rendering" content="webkit"/>
                    <meta httpEquiv="X-UA-Compatible" content="IE=chrome,chrome=1"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>

                    {/* Google Seo Boot */}
                    {__global__.googleBot.noIndex
                        && <meta name="robots" content="noindex, nofollow"/>}

                    {/* iconfont */}
                    <script src={asset('plugins/iconfont/iconfont.js')}/>
                </Head>

                <Provider store={store}>
                    <ThemeProvider theme={__global__.theme}>
                        <Layout>
                            <Component {...pageProps}/>
                        </Layout>
                    </ThemeProvider>
                </Provider>
            </>
        );
    }
}

export default compose(
    withRedux(createStore),
    withReduxSaga,
    appWithTranslation
)(MyApp);
